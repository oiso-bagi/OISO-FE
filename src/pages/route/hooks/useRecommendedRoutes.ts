import { useQuery } from "@tanstack/react-query";

import { getRecommendedRoutes } from "../api/recommendedRouteApi";
import { USE_MOCK_DATA, mockRecommendedRouteList } from "../mocks/routeMocks";
import { routeQueryKeys } from "./queryKeys";

export const useRecommendedRoutes = () => {
  return useQuery({
    queryKey: routeQueryKeys.recommendedRoutes(),
    queryFn: USE_MOCK_DATA
      ? async () => mockRecommendedRouteList
      : getRecommendedRoutes,
    select: (data) => data.routes,
  });
};
