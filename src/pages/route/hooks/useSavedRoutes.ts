import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";

import {
  createSavedRoute,
  deleteSavedRoute,
  getSavedRoutes,
  updateSavedRouteCompletion,
} from "../api/savedRouteApi";
import type {
  SavedRouteDetail,
  SavedRouteListResponse,
} from "../api/types/savedRoute";
import {
  USE_MOCK_DATA,
  getMockSavedRouteList,
  mockCreateSavedRoute,
  mockDeleteSavedRoute,
  mockUpdateSavedRouteCompleted,
} from "../mocks/routeMocks";

const savedRouteListKey = queryKeys.savedRoutes.list();

export const useSavedRoutes = () => {
  return useQuery({
    queryKey: savedRouteListKey,
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

/** 절약액은 음수로 저장되어 있어 합산 시 절댓값을 씁니다. */
const sumSavingAmount = (routes: SavedRouteListResponse["routes"]) =>
  routes.reduce((total, route) => total + Math.abs(route.savingAmount ?? 0), 0);

/**
 * 낙관적 업데이트 공통 절차.
 *
 * 진행 중인 refetch 를 멈추지 않으면 그 응답이 늦게 도착해 방금 바꾼 화면을
 * 되돌려 버립니다. 실패 시 되돌릴 수 있도록 이전 값을 함께 반환합니다.
 */
const useOptimisticSavedRouteList = () => {
  const queryClient = useQueryClient();

  const apply = async (
    update: (current: SavedRouteListResponse) => SavedRouteListResponse,
  ) => {
    await queryClient.cancelQueries({ queryKey: savedRouteListKey });

    const previous =
      queryClient.getQueryData<SavedRouteListResponse>(savedRouteListKey);

    if (previous) {
      queryClient.setQueryData<SavedRouteListResponse>(
        savedRouteListKey,
        update(previous),
      );
    }

    return { previous };
  };

  const rollback = (context?: { previous?: SavedRouteListResponse }) => {
    if (context?.previous) {
      queryClient.setQueryData(savedRouteListKey, context.previous);
    }
  };

  return { apply, rollback };
};

export const useCreateSavedRoute = () => {
  const queryClient = useQueryClient();
  const invalidateSavedRoutes = useInvalidateSavedRoutes();

  return useMutation({
    mutationFn: async (routeId: string) => {
      if (USE_MOCK_DATA) return mockCreateSavedRoute(routeId);

      return createSavedRoute(routeId);
    },

    // 저장은 목록에 없던 항목이 새로 생기는 것이라, 서버 응답 없이는 카드에
    // 채울 값을 알 수 없습니다. 낙관적 반영 없이 목록을 다시 받습니다.
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
  const queryClient = useQueryClient();
  const { apply, rollback } = useOptimisticSavedRouteList();

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

    /**
     * 목록과 상세를 함께 미리 반영합니다. 지도 상세 화면은 상세 캐시를 읽는데,
     * 목록만 바꾸면 재조회가 끝날 때까지 토글이 그대로 있어 눌리지 않은 것처럼
     * 보입니다.
     */
    onMutate: async ({ routeId, isCompleted }) => {
      const detailKey = queryKeys.savedRoutes.detail(routeId);
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previousDetail =
        queryClient.getQueryData<SavedRouteDetail>(detailKey);

      if (previousDetail) {
        queryClient.setQueryData<SavedRouteDetail>(detailKey, {
          ...previousDetail,
          isCompleted,
        });
      }

      const listContext = await apply((current) => ({
        ...current,
        routes: current.routes.map((route) =>
          route.id === routeId ? { ...route, isCompleted } : route,
        ),
      }));

      return { ...listContext, previousDetail };
    },

    onError: (_error, { routeId }, context) => {
      rollback(context);

      if (context?.previousDetail) {
        queryClient.setQueryData(
          queryKeys.savedRoutes.detail(routeId),
          context.previousDetail,
        );
      }
    },

    /**
     * 서버가 변경된 상태를 응답으로 돌려주므로 그 값으로 캐시를 맞춥니다.
     * 목록을 다시 받을 필요가 없습니다. 완료 여부는 홈 요약에 노출되지 않아
     * 홈은 건드리지 않습니다.
     */
    onSuccess: (result, { routeId }) => {
      if (result) {
        queryClient.setQueryData<SavedRouteListResponse>(
          savedRouteListKey,
          (current) =>
            current
              ? {
                  ...current,
                  routes: current.routes.map((route) =>
                    route.id === routeId
                      ? { ...route, isCompleted: result.isCompleted }
                      : route,
                  ),
                }
              : current,
        );
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.savedRoutes.detail(routeId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.savings,
      });
    },
  });
};

export const useDeleteSavedRoute = () => {
  const queryClient = useQueryClient();
  const invalidateSavedRoutes = useInvalidateSavedRoutes();
  const { apply, rollback } = useOptimisticSavedRouteList();

  return useMutation({
    mutationFn: async (routeId: string) => {
      if (USE_MOCK_DATA) return mockDeleteSavedRoute(routeId);

      return deleteSavedRoute(routeId);
    },

    onMutate: (routeId) =>
      apply((current) => {
        const routes = current.routes.filter((route) => route.id !== routeId);

        // 카드만 지우면 상단 누적 절약액이 잠시 어긋나 보이므로 함께 맞춥니다.
        return { totalSavingAmount: sumSavingAmount(routes), routes };
      }),

    onError: (_error, _routeId, context) => rollback(context),

    /**
     * 서버가 계산한 누적 절약액으로 맞추고 홈·대시보드도 갱신합니다.
     *
     * 대시보드는 완료한 여행의 절약 기록을 보여 주는데, 삭제해도 무효화하지
     * 않아 지운 루트의 금액이 남아 있었습니다.
     */
    onSettled: () => {
      invalidateSavedRoutes();
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.savings });
    },
  });
};
