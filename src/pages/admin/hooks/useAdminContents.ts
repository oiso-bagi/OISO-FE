import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";
import { USE_MOCK } from "@/shared/config/env";

import {
  getAdminPlaces,
  getAdminRouteDetail,
  getAdminRoutes,
  patchAdminPlaceActive,
  patchAdminRoutePublished,
  postAdminRoute,
  putAdminRoute,
} from "../api/adminContentApi";
import { replaceItemInLists } from "../lib/adminCache";
import {
  mockCreateAdminRoute,
  mockGetAdminPlaces,
  mockGetAdminRouteDetail,
  mockGetAdminRoutes,
  mockPatchAdminPlaceActive,
  mockPatchAdminRoutePublished,
  mockUpdateAdminRoute,
} from "../mocks/adminMocks";
import type {
  AdminPlace,
  AdminPlacesQuery,
  AdminRoute,
  AdminRoutePayload,
  AdminRoutesQuery,
} from "../types";

/* ── 장소 ───────────────────────────────────────────────── */

export const useAdminPlaces = (query: AdminPlacesQuery) =>
  useQuery({
    queryKey: queryKeys.admin.places.list(query),
    queryFn: () =>
      USE_MOCK ? mockGetAdminPlaces(query) : getAdminPlaces(query),
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
      USE_MOCK
        ? mockPatchAdminPlaceActive(placeId, isActive)
        : patchAdminPlaceActive(placeId, isActive),
    onSuccess: (updated: AdminPlace) =>
      replaceItemInLists(queryClient, queryKeys.admin.places.all, updated),
  });
};

/* ── 마스터 추천 코스 ───────────────────────────────────── */

export const useAdminRoutes = (query: AdminRoutesQuery) =>
  useQuery({
    queryKey: queryKeys.admin.routes.list(query),
    queryFn: () =>
      USE_MOCK ? mockGetAdminRoutes(query) : getAdminRoutes(query),
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
      USE_MOCK
        ? mockPatchAdminRoutePublished(routeId, isPublished)
        : patchAdminRoutePublished(routeId, isPublished),
    onSuccess: (updated: AdminRoute) =>
      replaceItemInLists(queryClient, queryKeys.admin.routes.all, updated),
  });
};

/* ── 코스 빌더 ──────────────────────────────────────────── */

/** 수정 화면에서 폼을 채우기 위한 코스 상세 */
export const useAdminRouteDetail = (routeId: string | undefined) =>
  useQuery({
    queryKey: queryKeys.admin.routes.detail(routeId ?? ""),
    queryFn: () =>
      USE_MOCK
        ? mockGetAdminRouteDetail(routeId as string)
        : getAdminRouteDetail(routeId as string),
    // 등록 화면에는 routeId 가 없습니다.
    enabled: Boolean(routeId),
  });

export const useCreateAdminRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminRoutePayload) =>
      USE_MOCK ? mockCreateAdminRoute(payload) : postAdminRoute(payload),
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
      USE_MOCK
        ? mockUpdateAdminRoute(routeId, payload)
        : putAdminRoute(routeId, payload),
    // 목록의 요약값(경유지 수·거리)과 상세가 함께 바뀝니다.
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.routes.all }),
  });
};
