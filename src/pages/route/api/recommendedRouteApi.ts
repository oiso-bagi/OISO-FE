import { http } from "@/shared/api/http";

import {
  toRecommendedRouteDetail,
  toRecommendedRouteListItem,
} from "./mappers/recommendedRoute";
import type {
  ServerRecommendedRouteDetail,
  ServerRecommendedRouteListItem,
} from "./types/server/recommendedRoute";

/** 서버는 배열을 그대로 내려줍니다(래핑 없음). */
export const getRecommendedRoutes = async () => {
  const routes = await http.get<ServerRecommendedRouteListItem[]>(
    "/recommended-routes",
  );

  return routes.map(toRecommendedRouteListItem);
};

export const getRecommendedRouteDetail = async (routeId: string) => {
  const route = await http.get<ServerRecommendedRouteDetail>(
    `/recommended-routes/${routeId}`,
  );

  return toRecommendedRouteDetail(route);
};
