/**
 * 관리자 화면 상수.
 *
 * 목 데이터가 아니라 화면이 그대로 쓰는 값입니다. 목 파일은 연동이 끝나면
 * 지울 임시 fixture 라, 필터 셀렉트 옵션처럼 계속 남을 값을 거기 두면
 * 파일을 지울 때 UI 도 함께 깨집니다.
 */

/**
 * 마스터 추천 코스 테마.
 *
 * 서버의 `GET /recommended-routes/recommend/options` 가 내려주는
 * `travelStyles[]` 의 `slug` / `label` 과 같은 값입니다. 연동 후에는 이 상수
 * 대신 그 응답을 쓰면 됩니다.
 */
/**
 * 경유지 `sequence` 의 시작값.
 *
 * 백엔드에 전달한 스펙 문서에는 "0부터" 로 적었지만, 서비스가 이미 쓰고 있는
 * 경유지 데이터는 **1부터 시작하고 일차가 넘어가도 이어집니다**
 * (2일차가 3·4, 3일차가 5·6). `RouteStopLocationDto` 등 생성 타입 3곳의
 * `@example` 도 모두 1 입니다.
 *
 * 그래서 기존 데이터 쪽에 맞췄습니다. 서버가 0부터로 확정되면 이 값만
 * 0 으로 바꾸면 됩니다.
 */
export const SEQUENCE_BASE = 1;

/** 이동 수단 선택지. 기존 루트 API 의 `transitTypes` 와 같은 값입니다. */
export const TRANSPORT_OPTIONS = [
  { value: "WALKING", label: "도보" },
  { value: "BUS", label: "버스" },
  { value: "SUBWAY", label: "지하철" },
  { value: "DRIVING", label: "자차" },
  { value: "TAXI", label: "택시" },
  { value: "BIKING", label: "자전거" },
];

/** 코스에 담을 수 있는 최대 일차 */
export const MAX_DAY_NUMBER = 5;

export const ROUTE_THEMES = [
  { value: "local-food", label: "부산 로컬 맛집" },
  { value: "nature-walk", label: "바다·자연 산책" },
  { value: "culture-art", label: "문화·예술" },
  { value: "market-tour", label: "전통시장 투어" },
  { value: "night-view", label: "야경 명소" },
  { value: "cafe-hopping", label: "카페 호핑" },
];
