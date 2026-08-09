export const routeQueryKeys = {
  recommendedRoutes: () => ["recommendedRoutes"] as const,
  recommendedRouteDetail: (routeId: string) =>
    ["recommendedRoutes", routeId] as const,

  savedRoutes: () => ["savedRoutes"] as const,
  savedRouteDetail: (routeId: string) => ["savedRoutes", routeId] as const,
};
