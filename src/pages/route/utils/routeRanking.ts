import type { RecommendedRouteListItem } from "../api/types/recommendedRoute";

/**
 * 추천 목록을 점수 높은 순으로 정렬하고, 최고점 루트에만 추천 뱃지를 답니다.
 *
 * 서버의 `isRecommended` 는 점수가 아니라 루트 종류(`routeType === RECOMMENDED`)를
 * 뜻해서 추천 목록에서는 항상 참입니다. 그대로 쓰면 모든 카드에 뱃지가 붙으므로,
 * "가장 추천도 높은 하나" 라는 기획에 맞게 여기서 다시 계산합니다.
 *
 * 동점이면 해당 루트 모두에 답니다.
 */
export const rankRecommendedRoutes = (
  routes: RecommendedRouteListItem[],
): RecommendedRouteListItem[] => {
  if (routes.length === 0) return routes;

  const topScore = Math.max(
    ...routes.map((route) => route.recommendationScore),
  );

  return [...routes]
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .map((route) => ({
      ...route,
      isRecommended: route.recommendationScore === topScore,
    }));
};
