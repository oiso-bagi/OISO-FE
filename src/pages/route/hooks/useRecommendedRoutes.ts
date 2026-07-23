import { useQuery } from "@tanstack/react-query";

import { getRecommendedRoutes } from "../api/recommendedRouteApi";
import { routeQueryKeys } from "./queryKeys";

export const useRecommendedRoutes = () => {
  return useQuery({
    queryKey: routeQueryKeys.recommendedRoutes(),
    queryFn: getRecommendedRoutes,
    select: (data) => data.routes,
  });
};
