/**
 * 관리자 화면 상수.
 *
 * 목 데이터가 아니라 화면이 그대로 쓰는 값입니다. 목 파일은 연동이 끝나면
 * 지울 임시 fixture 라, 필터 셀렉트 옵션처럼 계속 남을 값을 거기 두면
 * 파일을 지울 때 UI 도 함께 깨집니다.
 */

/**
 * 경유지 `sequence` 의 시작값.
 *
 * **1부터 시작하고 일차가 넘어가도 통산합니다** (2일차가 3·4, 3일차가 5·6).
 * 백엔드의 기존 `orderIndex` 매핑 기준과 동일하다는 확답을 받았습니다.
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

/**
 * 마스터 추천 코스 테마.
 *
 * 백엔드 추천 엔진에 적재·운영 중인 6종으로 확정된 값입니다.
 * `GET /recommended-routes/recommend/options` 의 `travelStyles[]` 이 내려주는
 * `slug` / `label` 과 같습니다. 연동 후에는 이 상수 대신 그 응답을 쓰면 됩니다.
 */
export const ROUTE_THEMES = [
  { value: "local-food", label: "부산 로컬 맛집" },
  { value: "emotion-cafe", label: "감성 카페" },
  { value: "beach-tour", label: "바다 관광" },
  { value: "photo-spot", label: "포토 스팟" },
  { value: "traditional-market", label: "전통시장" },
  { value: "nature-walk", label: "자연 / 산책" },
];
