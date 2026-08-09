/** 홈 요약 API 의 서버 응답 원형입니다. */

/**
 * 홈에 노출되는 저장 루트 요약.
 *
 * `id` 는 저장 레코드 식별자(`"user-1_route-101"`), `routeId` 는 루트
 * 식별자(`"route-101"`)로 서로 다릅니다. 상세 조회가
 * `GET /saved-routes/{routeId}` 이므로 화면 이동에는 `routeId` 를 씁니다.
 */
export interface ServerHomeSavedRouteItem {
  id: string;
  routeId: string;
  name: string;
  /** ISO 8601 datetime */
  savedAt: string;
  savingsWon: number;
  totalDistanceKm: number;
}

/** GET /home */
export interface ServerHomeSummary {
  totalSavedSavingsWon: number;
  totalSavedCount: number;
  savedRoutes: ServerHomeSavedRouteItem[];
}
