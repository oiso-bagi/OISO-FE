import { http } from "@/shared/api/http";
import type { RecommendationConditions } from "@/shared/lib/recommendationConditions";

import {
  toRecommendedRouteDetail,
  toRecommendedRouteListItem,
} from "./mappers/recommendedRoute";
import type {
  ServerRecommendRouteRequest,
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

/**
 * 설문 조건에 맞춘 추천 목록. 응답 형태는 전체 목록과 동일합니다.
 * `ratios` 는 선택값이라 보내지 않고 서버 기본 배분을 씁니다.
 */
export const postRecommendedRoutes = async (
  conditions: RecommendationConditions,
) => {
  const body: ServerRecommendRouteRequest = {
    travelStyleSlugs: conditions.travelStyleSlugs,
    durationDays: conditions.durationDays,
    dailyBudgetWon: conditions.dailyBudgetWon,
  };

  const routes = await http.post<ServerRecommendedRouteListItem[]>(
    "/recommended-routes/recommend",
    body,
  );

  return routes.map(toRecommendedRouteListItem);
};

export const getRecommendedRouteDetail = async (routeId: string) => {
  const route = await http.get<ServerRecommendedRouteDetail>(
    `/recommended-routes/${routeId}`,
  );

  return toRecommendedRouteDetail(route);
};
