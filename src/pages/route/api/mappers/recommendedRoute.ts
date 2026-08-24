/**
 * 서버 응답 → 화면용 타입 변환.
 *
 * 서버 필드명을 화면에 그대로 흘리지 않고 여기서 한 번 흡수합니다. 서버가
 * 목록과 상세에서 서로 다른 필드명(`id`/`name` ↔ `routeId`/`routeName`)을 쓰기
 * 때문에, 이 레이어가 없으면 화면이 두 형태를 모두 알아야 합니다.
 */

import type {
  RecommendedRouteDetailResponseDto,
  RecommendedRouteListResponseDto,
  RouteStopLocationDto,
  RouteStopResponseDto,
} from "@/shared/api/generated/types";

import {
  parseTransportType,
  toCategoryLabel,
  toDisplaySequence,
  toOperatingHours,
  toSavingAmount,
} from "./common";
import type {
  RecommendedRouteDetail,
  RecommendedRouteListItem,
  RecommendedRouteStop,
  RouteLocation,
} from "../types/recommendedRoute";

/** 좌표가 없는 경유지는 지도에 찍을 수 없어 제외합니다. */
const toRouteLocations = (
  stopLocations: RouteStopLocationDto[],
): RouteLocation[] =>
  stopLocations
    .filter((stop) => stop.latitude !== null && stop.longitude !== null)
    .map((stop) => ({
      sequence: toDisplaySequence(stop.sequence),
      dayNumber: stop.dayNumber,
      placeName: stop.placeName,
      latitude: stop.latitude as number,
      longitude: stop.longitude as number,
    }));

const toRouteStop = (stop: RouteStopResponseDto): RecommendedRouteStop => ({
  // 서버 sequence 는 0 부터라 화면 표기(1 부터)에 맞춰 올립니다.
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

export const toRecommendedRouteListItem = (
  route: RecommendedRouteListResponseDto,
): RecommendedRouteListItem => ({
  id: route.id,
  name: route.name,
  stopCount: route.stopCount,
  distanceKm: route.totalDistanceKm,
  transportationTypes: route.transitTypes,
  totalCost: route.totalCost,
  totalDurationMinutes: route.totalTimeMinutes,
  congestionLevel: route.congestionLevel,
  savingAmount: toSavingAmount(route.estimatedSavingsWon),
  locations: toRouteLocations(route.stopLocations),
  recommendationScore: route.score,
  isRecommended: route.isRecommended,
});

export const toRecommendedRouteDetail = (
  route: RecommendedRouteDetailResponseDto,
): RecommendedRouteDetail => ({
  id: route.routeId,
  name: route.routeName,
  stopCount: route.stopCount,
  distanceKm: route.totalDistanceKm,
  transportationTypes: parseTransportType(route.transportType),
  totalCost: route.totalCost,
  totalDurationMinutes: route.totalTimeMinutes,
  congestionLevel: route.congestionLevel,
  savingAmount: toSavingAmount(route.estimatedSavingsWon),
  // 상세 응답에는 목록의 stopLocations 가 없어 stops 좌표로 대신 채웁니다.
  locations: toRouteLocations(route.stops),
  recommendationScore: route.recommendScore,
  isRecommended: route.isRecommended,
  isSaved: route.isSaved,
  stops: route.stops.map(toRouteStop),
});
