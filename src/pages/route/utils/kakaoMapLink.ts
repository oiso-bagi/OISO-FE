/**
 * 카카오맵 링크.
 *
 * PC 용 `map.kakao.com/link/*` 는 모바일 브라우저에서 앱 설치 브리지
 * (`applink.map.kakao.com`) 로 넘어갑니다. 브리지는 `kakaomap://` 스킴을 띄우고
 * 0.8 초 안에 앱이 안 뜨면 스토어로 보내는데, 새 탭에서 열린 경우 스토어에서
 * 빠져나오면 원래 탭으로 돌아와 아무 일도 없던 것처럼 보입니다. 브리지의
 * "설치없이 지도보기" 도 장소·좌표를 버리고 지도 홈으로 갑니다.
 *
 * 그래서 모바일에서는 브리지를 타지 않는 모바일 웹 주소를 쓰고, PC 에서는
 * 화면이 넓은 기존 PC 지도를 그대로 씁니다.
 */
const KAKAO_MAP_PC = "https://map.kakao.com/link";
const KAKAO_MAP_MOBILE = "https://m.map.kakao.com/actions";

/**
 * 브리지 여부를 가르는 건 카카오 쪽 User-Agent 판정이라, 우리도 같은 값을 봅니다.
 *
 * 애매하면 모바일로 봅니다. 모바일 주소는 PC 브라우저에서도 리다이렉트 없이
 * 열려 손해가 지도 폭이 좁아지는 정도지만, 반대로 틀리면 브리지로 빠져 링크가
 * 아예 동작하지 않습니다. iPadOS 는 13 부터 UA 를 Mac 으로 보내 터치로 가릅니다.
 */
const isMobileBrowser = () => {
  const userAgent = navigator.userAgent;

  if (
    /Android|iPhone|iPod|iPad|Mobile|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    )
  ) {
    return true;
  }

  return /Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1;
};

/**
 * 장소 검색 결과로 엽니다. 서비스 지역이 부산뿐이라, 같은 이름의 다른 지역
 * 장소가 먼저 나오지 않게 지역명을 붙입니다.
 */
export const toKakaoMapSearchUrl = (placeName: string) => {
  const keyword = placeName.startsWith("부산")
    ? placeName
    : `부산 ${placeName}`;

  return isMobileBrowser()
    ? `${KAKAO_MAP_MOBILE}/searchView?q=${encodeURIComponent(keyword)}`
    : `${KAKAO_MAP_PC}/search/${encodeURIComponent(keyword)}`;
};

/**
 * PC 링크 형식이 `이름,위도,경도` 라 이름에 쉼표가 있으면 좌표로 잘못 읽힙니다.
 */
const toLinkName = (placeName: string) => placeName.replaceAll(",", " ");

/**
 * 모바일 길찾기 화면은 도착지 좌표를 위경도가 아니라 카카오 내부 좌표계
 * (WCONGNAMUL) 로 받습니다. 위경도를 그대로 넣으면 그 숫자가 좌표로 인코딩돼
 * 엉뚱한 곳을 가리킵니다.
 *
 * WCONGNAMUL 은 WGS84 타원체 위의 횡축 메르카토르 투영값(m)에 2.5 를 곱한
 * 값입니다. 데이텀 변환은 없습니다.
 */
const WCONGNAMUL_SCALE = 2.5;
const ORIGIN_LATITUDE = 38;
const ORIGIN_LONGITUDE = 127;
const FALSE_EASTING = 200_000;
const FALSE_NORTHING = 500_000;

const SEMI_MAJOR_AXIS = 6_378_137;
const FLATTENING = 1 / 298.257223563;
const ECCENTRICITY_SQ = FLATTENING * (2 - FLATTENING);

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/** 적도에서 위도 phi 까지의 자오선 호 길이(m). */
const meridianArc = (phi: number) => {
  const e2 = ECCENTRICITY_SQ;
  const c0 = 1 - e2 / 4 - (3 * e2 ** 2) / 64 - (5 * e2 ** 3) / 256;
  const c1 = (3 * e2) / 8 + (3 * e2 ** 2) / 32 + (45 * e2 ** 3) / 1024;
  const c2 = (15 * e2 ** 2) / 256 + (45 * e2 ** 3) / 1024;
  const c3 = (35 * e2 ** 3) / 3072;

  return (
    SEMI_MAJOR_AXIS *
    (c0 * phi -
      c1 * Math.sin(2 * phi) +
      c2 * Math.sin(4 * phi) -
      c3 * Math.sin(6 * phi))
  );
};

const toWcongnamul = (latitude: number, longitude: number) => {
  const e2 = ECCENTRICITY_SQ;
  const ep2 = e2 / (1 - e2);

  const phi = toRadians(latitude);
  const n = SEMI_MAJOR_AXIS / Math.sqrt(1 - e2 * Math.sin(phi) ** 2);
  const t = Math.tan(phi) ** 2;
  const c = ep2 * Math.cos(phi) ** 2;
  const a = toRadians(longitude - ORIGIN_LONGITUDE) * Math.cos(phi);

  const easting =
    FALSE_EASTING +
    n *
      (a +
        ((1 - t + c) * a ** 3) / 6 +
        ((5 - 18 * t + t ** 2 + 72 * c - 58 * ep2) * a ** 5) / 120);

  const northing =
    FALSE_NORTHING +
    meridianArc(phi) -
    meridianArc(toRadians(ORIGIN_LATITUDE)) +
    n *
      Math.tan(phi) *
      (a ** 2 / 2 +
        ((5 - t + 9 * c + 4 * c ** 2) * a ** 4) / 24 +
        ((61 - 58 * t + t ** 2 + 600 * c - 330 * ep2) * a ** 6) / 720);

  return {
    x: Math.round(easting * WCONGNAMUL_SCALE),
    y: Math.round(northing * WCONGNAMUL_SCALE),
  };
};

/** 현재 위치에서 이 장소까지 길찾기를 엽니다. */
export const toKakaoMapDirectionsUrl = (
  placeName: string,
  latitude: number,
  longitude: number,
) => {
  if (!isMobileBrowser()) {
    return `${KAKAO_MAP_PC}/to/${encodeURIComponent(toLinkName(placeName))},${latitude},${longitude}`;
  }

  const { x, y } = toWcongnamul(latitude, longitude);

  return `${KAKAO_MAP_MOBILE}/routeView?endLoc=${encodeURIComponent(placeName)}&ex=${x}&ey=${y}`;
};
