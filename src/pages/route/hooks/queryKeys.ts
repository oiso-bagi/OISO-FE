import type { RecommendationConditions } from "@/shared/lib/recommendationConditions";

export const routeQueryKeys = {
  /** 조건이 바뀌면 다른 결과이므로 key 에 포함합니다. */
  recommendedRoutes: (conditions: RecommendationConditions | null = null) =>
    ["recommendedRoutes", conditions] as const,
  recommendedRouteDetail: (routeId: string) =>
    ["recommendedRoutes", routeId] as const,

  savedRoutes: () => ["savedRoutes"] as const,
  savedRouteDetail: (routeId: string) => ["savedRoutes", routeId] as const,
};
