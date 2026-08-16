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
export const ROUTE_THEMES = [
  { value: "local-food", label: "부산 로컬 맛집" },
  { value: "nature-walk", label: "바다·자연 산책" },
  { value: "culture-art", label: "문화·예술" },
  { value: "market-tour", label: "전통시장 투어" },
  { value: "night-view", label: "야경 명소" },
  { value: "cafe-hopping", label: "카페 호핑" },
];
