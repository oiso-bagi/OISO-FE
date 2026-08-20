/**
 * 관리자 화면 상수.
 *
 * 목 데이터가 아니라 화면이 그대로 쓰는 값입니다. 목 파일은 연동이 끝나면
 * 지울 임시 fixture 라, 필터 셀렉트 옵션처럼 계속 남을 값을 거기 두면
 * 파일을 지울 때 UI 도 함께 깨집니다.
 */

/**
 * 서버에 보내는 경유지 `sequence` 의 시작값.
 *
 * 읽기 API(`GET /recommended-routes`)와 관리자 API(`POST/PUT /admin/routes`)
 * 모두 **0부터** 로 통일됐습니다. 일차가 넘어가도 초기화되지 않고 전체를
 * 통산합니다 — 1일차 0·1·2, 2일차 3·4·5, 3일차 6·7·8.
 *
 * 화면에는 이 값을 그대로 보여주지 않고 1부터로 바꿔 표기합니다.
 * 서비스 쪽 `toDisplaySequence` 와 같은 기준입니다.
 */
export const SEQUENCE_BASE = 0;

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
