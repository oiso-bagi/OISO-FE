import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";

import { getSavedRouteDetail } from "../api/savedRouteApi";
import { USE_MOCK_DATA, getMockSavedRouteDetail } from "../mocks/routeMocks";

/**
 * 저장한 루트 카드가 펼쳐졌을 때만 상세를 조회합니다.
 * routeId 가 null 이면 요청하지 않습니다.
 */
export const useSavedRouteDetail = (routeId: string | null) => {
  return useQuery({
    queryKey: queryKeys.savedRoutes.detail(routeId ?? ""),
    queryFn: () =>
      USE_MOCK_DATA
        ? getMockSavedRouteDetail(routeId as string)
        : getSavedRouteDetail(routeId as string),
    enabled: routeId !== null,
  });
};
