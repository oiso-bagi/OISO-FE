import { useQuery } from "@tanstack/react-query";

import { getRecommendedRouteDetail } from "../api/recommendedRouteApi";
import {
  USE_MOCK_DATA,
  getMockRecommendedRouteDetail,
} from "../mocks/routeMocks";
import { routeQueryKeys } from "./queryKeys";

/**
 * 루트 카드가 펼쳐졌을 때만 상세를 조회합니다.
 * routeId 가 null 이면 요청하지 않습니다.
 */
export const useRecommendedRouteDetail = (routeId: number | null) => {
  return useQuery({
    queryKey: routeQueryKeys.recommendedRouteDetail(routeId ?? -1),
    queryFn: () =>
      USE_MOCK_DATA
        ? getMockRecommendedRouteDetail(routeId as number)
        : getRecommendedRouteDetail(routeId as number),
    select: (data) => data.route,
    enabled: routeId !== null,
  });
};
