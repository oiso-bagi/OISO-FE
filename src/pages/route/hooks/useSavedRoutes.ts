import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createSavedRoute,
  deleteSavedRoute,
  getSavedRoutes,
  updateSavedRouteCompleted,
} from "../api/savedRouteApi";
import {
  USE_MOCK_DATA,
  getMockSavedRouteList,
  mockCreateSavedRoute,
  mockDeleteSavedRoute,
  mockUpdateSavedRouteCompleted,
} from "../mocks/routeMocks";
import { routeQueryKeys } from "./queryKeys";

export const useSavedRoutes = () => {
  return useQuery({
    queryKey: routeQueryKeys.savedRoutes(),
    queryFn: USE_MOCK_DATA
      ? async () => getMockSavedRouteList()
      : getSavedRoutes,
  });
};

export const useCreateSavedRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (routeId: number) => {
      if (USE_MOCK_DATA) return mockCreateSavedRoute(routeId);

      return createSavedRoute(routeId);
    },

    onSuccess: (_, routeId) => {
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.savedRoutes() });
      queryClient.invalidateQueries({
        queryKey: routeQueryKeys.recommendedRouteDetail(routeId),
      });
    },
  });
};

export const useUpdateSavedRouteCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      routeId,
      isCompleted,
    }: {
      routeId: number;
      isCompleted: boolean;
    }) => {
      if (USE_MOCK_DATA) {
        return mockUpdateSavedRouteCompleted(routeId, isCompleted);
      }

      return updateSavedRouteCompleted(routeId, { isCompleted });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.savedRoutes() });
    },
  });
};

export const useDeleteSavedRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (routeId: number) => {
      if (USE_MOCK_DATA) return mockDeleteSavedRoute(routeId);

      return deleteSavedRoute(routeId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.savedRoutes() });
    },
  });
};
