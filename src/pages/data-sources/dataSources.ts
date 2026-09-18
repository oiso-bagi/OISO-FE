export interface DataSource {
  provider: string;
  name: string;
  description: string;
  usages: string[];
  /** 출처 표기와 이용 조건. 제공처가 요구하는 문구를 그대로 둡니다. */
  license: string;
}

/**
 * 화면에 보이는 데이터를 만드는 출처. 공모전 출처 표기 대상입니다.
 *
 * 공모전 기능설명서의 "데이터 활용" 목록과 같은 내용이어야 합니다. API 를
 * 추가하거나 빼면 기능설명서와 하단 출처 문구(`DATA_ATTRIBUTION_TEXT`)도
 * 함께 확인합니다.
 */
export const DATA_SOURCES: DataSource[] = [
  {
    provider: "한국관광공사",
    name: "국문 관광정보 서비스 (TourAPI 4.0)",
    description:
      "부산 16개 구·군의 관광지, 음식점, 문화시설 약 1,000곳의 위치와 주소, 운영시간을 받아 추천에 쓰는 장소 데이터를 만듭니다.",
    usages: ["추천 코스 경유지의 이름과 위치", "경유지 운영시간"],
    license: "출처: ⓒ한국관광공사 · 공공데이터포털 이용허락범위 제한 없음",
  },
  {
    provider: "한국관광공사",
    name: "관광빅데이터 정보서비스 (연관 관광지)",
    description:
      "관광 빅데이터에서 함께 방문하는 비율이 높은 관광지를 찾아 하루 단위 추천 코스를 구성합니다.",
    usages: ["추천 코스의 경유지 구성"],
    license: "출처: ⓒ한국관광공사 · 공공데이터포털 이용허락범위 제한 없음",
  },
  {
    provider: "한국관광공사",
    name: "관광지 집중률 정보서비스",
    description:
      "매일 부산 주요 관광지의 집중률 예측값을 받아 혼잡도로 바꾸고, 붐빌 것으로 예상되는 장소를 피하도록 추천에 반영합니다.",
    usages: ["추천 코스의 예상 혼잡도"],
    license: "출처: ⓒ한국관광공사 · 공공데이터포털",
  },
  {
    provider: "Open-Elevation",
    name: "Open-Elevation API (CGIAR-CSI SRTM)",
    description:
      "장소별 해발 고도를 받아 코스를 이동할 때 오르막이 얼마나 되는지 계산하고, 걸어서 다니기 부담이 적은 동선을 추천하는 데 씁니다.",
    usages: ["추천 코스의 동선 순서"],
    /**
     * Open-Elevation 이 쓰는 CGIAR-CSI SRTM 은 CIAT 를 출처로 밝히고 이 인용
     * 형식을 쓰도록 요구합니다. 상업적 이용·재배포는 CIAT 의 서면 허가가
     * 필요합니다.
     */
    license:
      "Open-Elevation (GPL-2.0) · 표고 데이터: Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Hole-filled seamless SRTM data V4, International Centre for Tropical Agriculture (CIAT), https://srtm.csi.cgiar.org",
  },
  {
    provider: "카카오모빌리티",
    name: "길찾기 API",
    description:
      "경유지 사이의 실제 도로 경로와 이동 시간, 거리를 받아 지도에 경로선으로 그립니다.",
    usages: ["지도의 이동 경로선", "구간별 이동 시간과 거리"],
    license: "ⓒ Kakao Mobility Corp.",
  },
  {
    provider: "카카오",
    name: "카카오맵 API",
    description: "추천 코스의 경유지와 이동 경로를 지도 위에 보여 줍니다.",
    usages: ["추천 코스와 저장한 코스의 지도"],
    license: "ⓒ Kakao Corp.",
  },
];

/** 화면 데이터를 만들지는 않지만 서비스 운영에 쓰는 외부 서비스 */
export const OTHER_SERVICES = [
  "카카오·Google 소셜 로그인",
  "Google Analytics 4 (이용 통계)",
];
