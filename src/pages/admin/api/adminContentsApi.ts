import type {
  AdminPlaceListItemDto,
  AdminPlacePageResponseDto,
  AdminRouteDetailResponseDto,
  AdminRouteDetailStopDto,
  AdminRouteListItemDto,
  AdminRoutePageResponseDto,
  AdminRouteStopInputDto,
  AdminTogglePlaceActiveDto,
  AdminToggleRoutePublishedDto,
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
  AdminRouteStop,
  PaginatedResponse,
  PlaceCategory,
} from "../types";

const toNullableNumber = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

const toPlaceCategory = (category: unknown): PlaceCategory | null =>
  typeof category === "string" ? (category as PlaceCategory) : null;

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

const toAdminPlacePage = (
  response: AdminPlacePageResponseDto,
): PaginatedResponse<AdminPlace> => ({
  items: response.items.map(toAdminPlace),
  page: response.page,
  size: response.size,
  totalCount: response.totalCount,
  totalPages: response.totalPages,
});

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

const toAdminRoutePage = (
  response: AdminRoutePageResponseDto,
): PaginatedResponse<AdminRoute> => ({
  items: response.items.map(toAdminRoute),
  page: response.page,
  size: response.size,
  totalCount: response.totalCount,
  totalPages: response.totalPages,
});

const toAdminRouteStop = (stop: AdminRouteDetailStopDto): AdminRouteStop => ({
  sequence: stop.sequence,
  dayNumber: stop.dayNumber,
  placeId: stop.placeId,
  placeName: stop.placeName,
  address: stop.address,
  nextTransportType: stop.nextTransportType,
  nextTravelTimeMinutes: toNullableNumber(stop.nextTravelTimeMinutes),
  nextTravelCostWon: null,
});

const toAdminRouteDetail = (
  route: AdminRouteDetailResponseDto,
): AdminRouteDetail => ({
  id: route.id,
  name: route.name,
  theme: route.themeSlug,
  description: typeof route.description === "string" ? route.description : "",
  isPublished: route.isPublished,
  stops: route.stops.map(toAdminRouteStop),
});

const toRouteStopInput = (stop: AdminRouteStop): AdminRouteStopInputDto => ({
  placeId: stop.placeId,
  sequence: stop.sequence,
  stayTimeMinutes: 60,
  ...(stop.nextTravelTimeMinutes !== null
    ? { nextTravelTimeMinutes: stop.nextTravelTimeMinutes }
    : {}),
  ...(stop.nextTransportType !== null
    ? { nextTransportType: stop.nextTransportType }
    : {}),
});

const toCreateRouteDto = (payload: AdminRoutePayload): CreateAdminRouteDto => ({
  name: payload.name,
  description: payload.description || undefined,
  themeSlug: payload.theme,
  isPublished: payload.isPublished,
  stops: payload.stops.map(toRouteStopInput),
});

const toUpdateRouteDto = (payload: AdminRoutePayload): UpdateAdminRouteDto => ({
  name: payload.name,
  description: payload.description || undefined,
  themeSlug: payload.theme,
  isPublished: payload.isPublished,
  stops: payload.stops.map(toRouteStopInput),
});

export const getAdminPlaces = async (
  query: AdminPlacesQuery,
): Promise<PaginatedResponse<AdminPlace>> => {
  const response = await http.get<AdminPlacePageResponseDto>("/admin/places", {
    params: query,
  });

  return toAdminPlacePage(response);
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

export const getAdminRoutes = async (
  query: AdminRoutesQuery,
): Promise<PaginatedResponse<AdminRoute>> => {
  const response = await http.get<AdminRoutePageResponseDto>("/admin/routes", {
    params: query,
  });

  return toAdminRoutePage(response);
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

export const createAdminRoute = async (
  payload: AdminRoutePayload,
): Promise<AdminRouteDetail> => {
  const response = await http.post<AdminRouteDetailResponseDto>(
    "/admin/routes",
    toCreateRouteDto(payload),
  );

  return toAdminRouteDetail(response);
};

export const updateAdminRoute = async (
  routeId: string,
  payload: AdminRoutePayload,
): Promise<AdminRouteDetail> => {
  const response = await http.put<AdminRouteDetailResponseDto>(
    `/admin/routes/${routeId}`,
    toUpdateRouteDto(payload),
  );

  return toAdminRouteDetail(response);
};
