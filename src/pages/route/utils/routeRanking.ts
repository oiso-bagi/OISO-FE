import type { RecommendedRouteListItem } from "../api/types/recommendedRoute";

/**
 * 추천 목록을 점수 높은 순으로 정렬하고, 맨 위 한 개에만 추천 뱃지를 답니다.
 *
 * 서버의 `isRecommended` 는 점수가 아니라 루트 종류(`routeType === RECOMMENDED`)를
 * 뜻해서 추천 목록에서는 항상 참입니다. 그대로 쓰면 모든 카드에 뱃지가 붙으므로,
 * "가장 추천도 높은 하나" 라는 기획에 맞게 여기서 다시 계산합니다.
 *
 * 예전에는 동점이면 모두에 달았는데, 점수 척도가 0~100 으로 바뀌면서 세 개가
 * 99·99·99 처럼 같은 값으로 오는 일이 흔해졌습니다. 그러면 뱃지가 세 개 다
 * 붙어 "가장 추천" 이라는 뜻이 사라집니다. 정렬된 첫 번째에만 답니다.
 */
export const rankRecommendedRoutes = (
  routes: RecommendedRouteListItem[],
): RecommendedRouteListItem[] => {
  if (routes.length === 0) return routes;

  return [...routes]
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .map((route, index) => ({ ...route, isRecommended: index === 0 }));
};
