import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createSavedRoute,
  deleteSavedRoute,
  getSavedRoutes,
  updateSavedRouteCompleted,
} from "../api/savedRouteApi";
import { routeQueryKeys } from "./queryKeys";

export const useSavedRoutes = () => {
  return useQuery({
    queryKey: routeQueryKeys.savedRoutes(),
    queryFn: getSavedRoutes,
  });
};

export const useCreateSavedRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (routeId: number) => createSavedRoute(routeId),

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
    mutationFn: ({
      routeId,
      isCompleted,
    }: {
      routeId: number;
      isCompleted: boolean;
    }) => updateSavedRouteCompleted(routeId, { isCompleted }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.savedRoutes() });
    },
  });
};

export const useDeleteSavedRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (routeId: number) => deleteSavedRoute(routeId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.savedRoutes() });
    },
  });
};
