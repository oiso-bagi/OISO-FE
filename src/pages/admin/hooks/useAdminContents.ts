import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";

import { replaceItemInLists } from "../lib/adminCache";
import {
  mockGetAdminPlaces,
  mockGetAdminRoutes,
  mockPatchAdminPlaceActive,
  mockPatchAdminRoutePublished,
} from "../mocks/adminMocks";
import type {
  AdminPlace,
  AdminPlacesQuery,
  AdminRoute,
  AdminRoutesQuery,
} from "../types";

/* ── 장소 ───────────────────────────────────────────────── */

export const useAdminPlaces = (query: AdminPlacesQuery) =>
  useQuery({
    queryKey: queryKeys.admin.places.list(query),
    queryFn: () => mockGetAdminPlaces(query),
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
      mockPatchAdminPlaceActive(placeId, isActive),
    onSuccess: (updated: AdminPlace) =>
      replaceItemInLists(queryClient, queryKeys.admin.places.all, updated),
  });
};

/* ── 마스터 추천 코스 ───────────────────────────────────── */

export const useAdminRoutes = (query: AdminRoutesQuery) =>
  useQuery({
    queryKey: queryKeys.admin.routes.list(query),
    queryFn: () => mockGetAdminRoutes(query),
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
      mockPatchAdminRoutePublished(routeId, isPublished),
    onSuccess: (updated: AdminRoute) =>
      replaceItemInLists(queryClient, queryKeys.admin.routes.all, updated),
  });
};
