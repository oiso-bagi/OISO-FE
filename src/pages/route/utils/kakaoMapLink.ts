/**
 * 카카오맵 웹 링크.
 *
 * 앱이 설치돼 있으면 모바일 브라우저가 카카오맵 앱으로 넘겨 줍니다. 장소의
 * 주소·사진·리뷰는 아직 서버가 내려주지 않아 카카오맵 장소 페이지로 안내합니다.
 */
const KAKAO_MAP_LINK = "https://map.kakao.com/link";

/**
 * 링크 형식이 `이름,위도,경도` 라 이름에 쉼표가 있으면 좌표로 잘못 읽힙니다.
 */
const toLinkName = (placeName: string) => placeName.replaceAll(",", " ");

/**
 * 장소 검색 결과로 엽니다. 서비스 지역이 부산뿐이라, 같은 이름의 다른 지역
 * 장소가 먼저 나오지 않게 지역명을 붙입니다.
 */
export const toKakaoMapSearchUrl = (placeName: string) => {
  const keyword = placeName.startsWith("부산")
    ? placeName
    : `부산 ${placeName}`;

  return `${KAKAO_MAP_LINK}/search/${encodeURIComponent(keyword)}`;
};

/** 현재 위치에서 이 장소까지 길찾기를 엽니다. */
export const toKakaoMapDirectionsUrl = (
  placeName: string,
  latitude: number,
  longitude: number,
) =>
  `${KAKAO_MAP_LINK}/to/${encodeURIComponent(toLinkName(placeName))},${latitude},${longitude}`;
