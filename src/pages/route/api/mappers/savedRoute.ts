/** 저장 루트 서버 응답 → 화면용 타입 변환. */

import type {
  SavedRouteDetailResponseDto,
  SavedRouteItemDto,
  SavedRouteListResponseDto,
  SavedRouteStopDetailDto,
} from "@/shared/api/generated/types";

import {
  parseTransportType,
  toCategoryLabel,
  toDisplaySequence,
  toOperatingHours,
  toSavingAmount,
} from "./common";
import type { RecommendedRouteStop } from "../types/recommendedRoute";
import type {
  SavedRouteDetail,
  SavedRouteListItem,
  SavedRouteListResponse,
} from "../types/savedRoute";

const toSavedRouteStop = (
  stop: SavedRouteStopDetailDto,
): RecommendedRouteStop => ({
  sequence: toDisplaySequence(stop.sequence),
  dayNumber: stop.dayNumber,
  placeName: stop.placeName,
  category: toCategoryLabel(stop.category),
  operatingHours: toOperatingHours(stop.openTime, stop.closeTime),
  latitude: stop.latitude,
  longitude: stop.longitude,
  transportationToNext: stop.nextTransportType,
  durationToNextMinutes: stop.nextTravelTimeMinutes,
  pathFromPrevious: stop.pathCoordinates ?? [],
});

const toSavedRouteListItem = (
  route: SavedRouteItemDto,
): SavedRouteListItem => ({
  id: route.routeId,
  name: route.routeName,
  savedAt: route.savedAt,
  stopCount: route.stopCount,
  distanceKm: route.totalDistanceKm,
  transportationTypes: route.transitTypes,
  totalCost: route.totalCost,
  totalDurationMinutes: route.totalTimeMinutes,
  // 목록 응답에는 혼잡도가 없습니다. 저장 카드는 이 값을 쓰지 않습니다.
  congestionLevel: undefined,
  savingAmount: toSavingAmount(route.estimatedSavingsWon),
  isCompleted: route.isCompleted,
});

export const toSavedRouteList = (
  response: SavedRouteListResponseDto,
): SavedRouteListResponse => ({
  totalSavingAmount: response.totalSavedSavingsWon,
  routes: response.savedRoutes.map(toSavedRouteListItem),
});

export const toSavedRouteDetail = (
  route: SavedRouteDetailResponseDto,
): SavedRouteDetail => ({
  id: route.routeId,
  name: route.routeName,
  savedAt: route.savedAt,
  stopCount: route.stopCount,
  distanceKm: route.totalDistanceKm,
  transportationTypes: parseTransportType(route.transportType),
  totalCost: route.totalCost,
  totalDurationMinutes: route.totalTimeMinutes,
  congestionLevel: route.congestionLevel,
  savingAmount: toSavingAmount(route.estimatedSavingsWon),
  isCompleted: route.isCompleted,
  stops: route.stops.map(toSavedRouteStop),
});
