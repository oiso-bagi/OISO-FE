import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";

import { getRecommendedRouteDetail } from "../api/recommendedRouteApi";
import {
  USE_MOCK_DATA,
  getMockRecommendedRouteDetail,
} from "../mocks/routeMocks";

/**
 * 루트 카드가 펼쳐졌을 때만 상세를 조회합니다.
 * routeId 가 null 이면 요청하지 않습니다.
 */
export const useRecommendedRouteDetail = (routeId: string | null) => {
  return useQuery({
    queryKey: queryKeys.recommendedRoutes.detail(routeId ?? ""),
    queryFn: () =>
      USE_MOCK_DATA
        ? getMockRecommendedRouteDetail(routeId as string)
        : getRecommendedRouteDetail(routeId as string),
    enabled: routeId !== null,
  });
};
