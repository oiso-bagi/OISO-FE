import { http } from "@/shared/api/http";

import type {
  RecommendedRouteDetailResponse,
  RecommendedRouteListResponse,
} from "./types/recommendedRoute";

export const getRecommendedRoutes = async () => {
  return http.get<RecommendedRouteListResponse>("/recommended-routes");
};

export const getRecommendedRouteDetail = async (routeId: number) => {
  return http.get<RecommendedRouteDetailResponse>(
    `/recommended-routes/${routeId}`,
  );
};
