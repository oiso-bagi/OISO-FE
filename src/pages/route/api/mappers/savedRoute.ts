/** 저장 루트 서버 응답 → 화면용 타입 변환. */

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
import type {
  SavedRouteDetailResponseDto,
  SavedRouteItemDto,
  SavedRouteListResponseDto,
  SavedRouteStopDetailDto,
} from "@/shared/api/generated/schema";

/**
 * 저장 루트 경유지에는 서버가 `dayNumber` 를 내려주지 않습니다.
 * 화면은 일차 단위로 묶어 표시하므로 전부 1 일차로 둡니다. 다일 코스라도
 * 일차 구분이 되지 않으니, 서버에 필드가 추가되면 그대로 사용해야 합니다.
 */
const FALLBACK_DAY_NUMBER = 1;

const toSavedRouteStop = (
  stop: SavedRouteStopDetailDto,
): RecommendedRouteStop => ({
  sequence: toDisplaySequence(stop.sequence),
  dayNumber: FALLBACK_DAY_NUMBER,
  placeName: stop.placeName,
  category: toCategoryLabel(stop.category),
  operatingHours: toOperatingHours(stop.openTime, stop.closeTime),
  latitude: stop.latitude,
  longitude: stop.longitude,
  transportationToNext: stop.nextTransportType,
  durationToNextMinutes: stop.nextTravelTimeMinutes,
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
