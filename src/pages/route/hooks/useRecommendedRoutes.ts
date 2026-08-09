import { useQuery } from "@tanstack/react-query";

import { readRecommendationConditions } from "@/shared/lib/recommendationConditions";

import {
  getRecommendedRoutes,
  postRecommendedRoutes,
} from "../api/recommendedRouteApi";
import { USE_MOCK_DATA, mockRecommendedRouteList } from "../mocks/routeMocks";
import { routeQueryKeys } from "./queryKeys";

/**
 * 설문을 마친 사용자는 조건 기반 추천을, 조건이 없으면 전체 추천 목록을
 * 보여줍니다. 조건은 설문 화면이 저장하고 여기서 읽습니다.
 */
export const useRecommendedRoutes = () => {
  const conditions = readRecommendationConditions();

  return useQuery({
    queryKey: routeQueryKeys.recommendedRoutes(conditions),
    queryFn: () => {
      if (USE_MOCK_DATA) return Promise.resolve(mockRecommendedRouteList);

      return conditions
        ? postRecommendedRoutes(conditions)
        : getRecommendedRoutes();
    },
  });
};
