import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";

import {
  createSavedRoute,
  deleteSavedRoute,
  getSavedRoutes,
  updateSavedRouteCompletion,
} from "../api/savedRouteApi";
import {
  USE_MOCK_DATA,
  getMockSavedRouteList,
  mockCreateSavedRoute,
  mockDeleteSavedRoute,
  mockUpdateSavedRouteCompleted,
} from "../mocks/routeMocks";

export const useSavedRoutes = () => {
  return useQuery({
    queryKey: queryKeys.savedRoutes.list(),
    queryFn: USE_MOCK_DATA
      ? async () => getMockSavedRouteList()
      : getSavedRoutes,
  });
};

/**
 * 저장 목록이 바뀌면 홈 요약(누적 절약액·저장 개수·카드 목록)도 함께
 * 달라지므로 두 도메인을 같이 무효화합니다.
 */
const useInvalidateSavedRoutes = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.savedRoutes.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.home.all });
  };
};

export const useCreateSavedRoute = () => {
  const queryClient = useQueryClient();
  const invalidateSavedRoutes = useInvalidateSavedRoutes();

  return useMutation({
    mutationFn: async (routeId: string) => {
      if (USE_MOCK_DATA) return mockCreateSavedRoute(routeId);

      return createSavedRoute(routeId);
    },

    onSuccess: (_, routeId) => {
      invalidateSavedRoutes();
      // 추천 상세의 isSaved 가 바뀌므로 해당 항목만 다시 받습니다.
      queryClient.invalidateQueries({
        queryKey: queryKeys.recommendedRoutes.detail(routeId),
      });
    },
  });
};

export const useUpdateSavedRouteCompleted = () => {
  const invalidateSavedRoutes = useInvalidateSavedRoutes();

  return useMutation({
    mutationFn: async ({
      routeId,
      isCompleted,
    }: {
      routeId: string;
      isCompleted: boolean;
    }) => {
      if (USE_MOCK_DATA) {
        return mockUpdateSavedRouteCompleted(routeId, isCompleted);
      }

      return updateSavedRouteCompletion(routeId, { isCompleted });
    },

    onSuccess: invalidateSavedRoutes,
  });
};

export const useDeleteSavedRoute = () => {
  const invalidateSavedRoutes = useInvalidateSavedRoutes();

  return useMutation({
    mutationFn: async (routeId: string) => {
      if (USE_MOCK_DATA) return mockDeleteSavedRoute(routeId);

      return deleteSavedRoute(routeId);
    },

    onSuccess: invalidateSavedRoutes,
  });
};
