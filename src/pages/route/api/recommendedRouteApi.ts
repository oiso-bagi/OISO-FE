import { http } from "@/shared/api/http";
import type { RecommendationConditions } from "@/shared/lib/recommendationConditions";
import type {
  RecommendRouteRequestDto,
  RecommendedRouteDetailResponseDto,
  RecommendedRouteListResponseDto,
} from "@/shared/api/generated/types";

import {
  toRecommendedRouteDetail,
  toRecommendedRouteListItem,
} from "./mappers/recommendedRoute";

/**
 * 전체 마스터 코스 목록. 현재 화면에서는 쓰지 않습니다.
 *
 * 설문 조건이 없을 때 이 API 로 폴백하던 시절이 있었는데, 일수·예산과
 * 무관한 마스터 코스가 통째로(100여 개) 내려와 추천 화면이 top 3 대신
 * 전부를 그리는 문제가 있었습니다. 지금은 조건이 없으면 `AppLayout` 가드가
 * 설문으로 되돌리므로 폴백 자체가 필요 없습니다.
 *
 * 관리자 화면이나 전체 목록이 필요한 기능이 생기면 그때 되살립니다.
 */
// export const getRecommendedRoutes = async () => {
//   const routes = await http.get<RecommendedRouteListResponseDto[]>(
//     "/recommended-routes",
//   );
//
//   return routes.map(toRecommendedRouteListItem);
// };

/**
 * 설문 조건에 맞춘 추천 목록. 응답 형태는 전체 목록과 동일합니다.
 * `ratios` 는 선택값이라 보내지 않고 서버 기본 배분을 씁니다.
 */
export const postRecommendedRoutes = async (
  conditions: RecommendationConditions,
) => {
  const body: RecommendRouteRequestDto = {
    travelStyleSlugs: conditions.travelStyleSlugs,
    durationDays: conditions.durationDays,
    dailyBudgetWon: conditions.dailyBudgetWon,
  };

  const routes = await http.post<RecommendedRouteListResponseDto[]>(
    "/recommended-routes/recommend",
    body,
  );

  return routes.map(toRecommendedRouteListItem);
};

export const getRecommendedRouteDetail = async (routeId: string) => {
  const route = await http.get<RecommendedRouteDetailResponseDto>(
    `/recommended-routes/${routeId}`,
  );

  return toRecommendedRouteDetail(route);
};
