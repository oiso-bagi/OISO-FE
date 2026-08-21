import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";
import { USE_MOCK } from "@/shared/config/env";

import {
  createAdminRoute,
  getAdminPlaces,
  getAdminRouteDetail,
  getAdminRoutes,
  patchAdminPlaceActive,
  patchAdminRoutePublished,
  updateAdminRoute,
} from "../api/adminContentsApi";
import { replaceItemInLists } from "../lib/adminCache";
import type {
  AdminPlace,
  AdminPlacesQuery,
  AdminRoute,
  AdminRoutePayload,
  AdminRoutesQuery,
} from "../types";

/* 장소 */

export const useAdminPlaces = (query: AdminPlacesQuery) =>
  useQuery({
    queryKey: queryKeys.admin.places.list(query),
    queryFn: () => getAdminPlaces(query),
    placeholderData: keepPreviousData,
  });

interface TogglePlaceActiveVariables {
  placeId: string;
  isActive: boolean;
}

/** 장소 노출 중지 / 재노출 (Soft Delete) */
export const useTogglePlaceActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId, isActive }: TogglePlaceActiveVariables) =>
      patchAdminPlaceActive(placeId, isActive),
    onSuccess: (updated: AdminPlace) =>
      replaceItemInLists(queryClient, queryKeys.admin.places.all, updated),
  });
};

/* 마스터 추천 코스 */

export const useAdminRoutes = (query: AdminRoutesQuery) =>
  useQuery({
    queryKey: queryKeys.admin.routes.list(query),
    queryFn: () => getAdminRoutes(query),
    placeholderData: keepPreviousData,
  });

interface ToggleRoutePublishedVariables {
  routeId: string;
  isPublished: boolean;
}

/** 코스 게시 / 비게시 */
export const useToggleRoutePublished = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ routeId, isPublished }: ToggleRoutePublishedVariables) =>
      patchAdminRoutePublished(routeId, isPublished),
    onSuccess: (updated: AdminRoute) =>
      replaceItemInLists(queryClient, queryKeys.admin.routes.all, updated),
  });
};

/* 코스 빌더 */

/** 수정 화면에서 폼을 채우기 위한 코스 상세 */
export const useAdminRouteDetail = (routeId: string | undefined) =>
  useQuery({
    queryKey: queryKeys.admin.routes.detail(routeId ?? ""),
    queryFn: () => getAdminRouteDetail(routeId as string),
    enabled: Boolean(routeId),
  });

export const useCreateAdminRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminRoutePayload) => createAdminRoute(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.routes.all }),
  });
};

interface UpdateRouteVariables {
  routeId: string;
  payload: AdminRoutePayload;
}

export const useUpdateAdminRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ routeId, payload }: UpdateRouteVariables) =>
      updateAdminRoute(routeId, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.routes.all }),
  });
};
