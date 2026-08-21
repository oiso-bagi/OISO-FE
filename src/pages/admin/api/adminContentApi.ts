import type {
  AdminPlaceListItemDto,
  AdminPlacePageResponseDto,
  AdminRouteDetailResponseDto,
  AdminRouteListItemDto,
  AdminRoutePageResponseDto,
  AdminRouteStopInputDto,
  AdminToggleRoutePublishedDto,
  AdminTogglePlaceActiveDto,
  CreateAdminRouteDto,
  UpdateAdminRouteDto,
} from "@/shared/api/generated/types";
import { http } from "@/shared/api/http";

import type {
  AdminPlace,
  AdminPlacesQuery,
  AdminRoute,
  AdminRouteDetail,
  AdminRoutePayload,
  AdminRoutesQuery,
  PaginatedResponse,
  PlaceCategory,
} from "../types";

const PLACE_CATEGORIES = new Set<PlaceCategory>([
  "MARKET",
  "CAFE",
  "FOOD",
  "CULTURE",
  "NATURE",
  "EXPERIENCE",
  "VIEWPOINT",
  "ETC",
]);

const toPlaceCategory = (value: object | null): PlaceCategory | null =>
  typeof value === "string" && PLACE_CATEGORIES.has(value as PlaceCategory)
    ? (value as PlaceCategory)
    : null;

const toNullableNumber = (value: object | null): number | null =>
  typeof value === "number" ? value : null;

const toNullableString = (value: object | null): string | null =>
  typeof value === "string" ? value : null;

/** Swagger DTO를 관리자 장소 표가 사용하는 형태로 변환합니다. */
const toAdminPlace = (place: AdminPlaceListItemDto): AdminPlace => ({
  id: place.id,
  name: place.name,
  address: place.address,
  category: toPlaceCategory(place.category),
  tpiScore: toNullableNumber(place.tpiScore),
  isActive: place.isActive,
  latitude: place.latitude,
  longitude: place.longitude,
});

export const getAdminPlaces = async (
  query: AdminPlacesQuery,
): Promise<PaginatedResponse<AdminPlace>> => {
  const response = await http.get<AdminPlacePageResponseDto>("/admin/places", {
    params: query,
  });

  return {
    ...response,
    items: response.items.map(toAdminPlace),
  };
};

export const patchAdminPlaceActive = async (
  placeId: string,
  isActive: boolean,
): Promise<AdminPlace> => {
  const body: AdminTogglePlaceActiveDto = { isActive };
  const response = await http.patch<AdminPlaceListItemDto>(
    `/admin/places/${placeId}/active`,
    body,
  );

  return toAdminPlace(response);
};

const toAdminRoute = (route: AdminRouteListItemDto): AdminRoute => ({
  id: route.id,
  name: route.name,
  theme: route.theme,
  themeLabel: route.themeLabel,
  stopCount: route.stopCount,
  totalDistanceKm: route.totalDistanceKm,
  isPublished: route.isPublished,
  createdAt: route.createdAt,
});

const toAdminRouteDetail = (
  route: AdminRouteDetailResponseDto,
): AdminRouteDetail => ({
  id: route.id,
  name: route.name,
  theme: route.themeSlug,
  description: toNullableString(route.description) ?? "",
  isPublished: route.isPublished,
  stops: route.stops.map((stop) => ({
    sequence: stop.sequence,
    dayNumber: stop.dayNumber,
    placeId: stop.placeId,
    placeName: stop.placeName,
    address: stop.address,
    stayTimeMinutes: stop.stayTimeMinutes,
    nextTransportType: stop.nextTransportType,
    nextTravelTimeMinutes: toNullableNumber(stop.nextTravelTimeMinutes),
    // 현재 관리자 API 요청·응답에는 이동 비용 필드가 없습니다.
    nextTravelCostWon: null,
  })),
});

const toRouteStops = (
  stops: AdminRoutePayload["stops"],
): AdminRouteStopInputDto[] =>
  stops.map((stop) => ({
    placeId: stop.placeId,
    sequence: stop.sequence,
    stayTimeMinutes: stop.stayTimeMinutes ?? 60,
    ...(stop.nextTravelTimeMinutes === null
      ? {}
      : { nextTravelTimeMinutes: stop.nextTravelTimeMinutes }),
    ...(stop.nextTransportType === null
      ? {}
      : { nextTransportType: stop.nextTransportType }),
  }));

const toCreateRouteBody = (
  payload: AdminRoutePayload,
): CreateAdminRouteDto => ({
  name: payload.name,
  description: payload.description || undefined,
  themeSlug: payload.theme,
  isPublished: payload.isPublished,
  stops: toRouteStops(payload.stops),
});

export const getAdminRoutes = async (
  query: AdminRoutesQuery,
): Promise<PaginatedResponse<AdminRoute>> => {
  const response = await http.get<AdminRoutePageResponseDto>("/admin/routes", {
    params: query,
  });

  return {
    ...response,
    items: response.items.map(toAdminRoute),
  };
};

export const patchAdminRoutePublished = async (
  routeId: string,
  isPublished: boolean,
): Promise<AdminRoute> => {
  const body: AdminToggleRoutePublishedDto = { isPublished };
  const response = await http.patch<AdminRouteListItemDto>(
    `/admin/routes/${routeId}/published`,
    body,
  );

  return toAdminRoute(response);
};

export const getAdminRouteDetail = async (
  routeId: string,
): Promise<AdminRouteDetail> => {
  const response = await http.get<AdminRouteDetailResponseDto>(
    `/admin/routes/${routeId}`,
  );

  return toAdminRouteDetail(response);
};

export const postAdminRoute = async (
  payload: AdminRoutePayload,
): Promise<AdminRouteDetail> => {
  const response = await http.post<AdminRouteDetailResponseDto>(
    "/admin/routes",
    toCreateRouteBody(payload),
  );

  return toAdminRouteDetail(response);
};

export const putAdminRoute = async (
  routeId: string,
  payload: AdminRoutePayload,
): Promise<AdminRouteDetail> => {
  const body: UpdateAdminRouteDto = toCreateRouteBody(payload);
  const response = await http.put<AdminRouteDetailResponseDto>(
    `/admin/routes/${routeId}`,
    body,
  );

  return toAdminRouteDetail(response);
};
