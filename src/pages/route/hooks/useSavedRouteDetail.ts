import { useQuery } from "@tanstack/react-query";

import { getSavedRouteDetail } from "../api/savedRouteApi";
import { USE_MOCK_DATA, getMockSavedRouteDetail } from "../mocks/routeMocks";
import { routeQueryKeys } from "./queryKeys";

/**
 * 저장한 루트 카드가 펼쳐졌을 때만 상세를 조회합니다.
 * routeId 가 null 이면 요청하지 않습니다.
 */
export const useSavedRouteDetail = (routeId: number | null) => {
  return useQuery({
    queryKey: routeQueryKeys.savedRouteDetail(routeId ?? -1),
    queryFn: () =>
      USE_MOCK_DATA
        ? getMockSavedRouteDetail(routeId as number)
        : getSavedRouteDetail(routeId as number),
    select: (data) => data.route,
    enabled: routeId !== null,
  });
};
