export const routeQueryKeys = {
  recommendedRoutes: () => ["recommendedRoutes"] as const,
  recommendedRouteDetail: (routeId: number) =>
    ["recommendedRoutes", routeId] as const,

  savedRoutes: () => ["savedRoutes"] as const,
  savedRouteDetail: (routeId: number) => ["savedRoutes", routeId] as const,
};
