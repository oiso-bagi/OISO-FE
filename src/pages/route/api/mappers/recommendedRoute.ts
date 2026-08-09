/**
 * 서버 응답 → 화면용 타입 변환.
 *
 * 서버 필드명을 화면에 그대로 흘리지 않고 여기서 한 번 흡수합니다. 서버가
 * 목록과 상세에서 서로 다른 필드명(`id`/`name` ↔ `routeId`/`routeName`)을 쓰기
 * 때문에, 이 레이어가 없으면 화면이 두 형태를 모두 알아야 합니다.
 */

import type {
  RecommendedRouteDetail,
  RecommendedRouteListItem,
  RecommendedRouteStop,
  RouteLocation,
  TransportationType,
} from "../types/recommendedRoute";
import type {
  ServerRecommendedRouteDetail,
  ServerRecommendedRouteListItem,
  ServerRouteStop,
  ServerRouteStopLocation,
} from "../types/server/recommendedRoute";

const CATEGORY_LABELS: Record<string, string> = {
  MARKET: "전통시장",
  CAFE: "카페",
  FOOD: "맛집",
  CULTURE: "문화·체험",
  NATURE: "자연·관광",
  EXPERIENCE: "체험",
  VIEWPOINT: "관광·포토",
  ETC: "기타",
};

/** 알 수 없는 코드는 그대로 노출해, 새 카테고리가 추가돼도 빈칸이 되지 않게 합니다. */
const toCategoryLabel = (category: string) =>
  CATEGORY_LABELS[category] ?? category;

/** `openTime`/`closeTime` 을 기존 화면이 쓰던 단일 문자열로 합칩니다. */
const toOperatingHours = (
  openTime: string | null,
  closeTime: string | null,
): string | null => {
  if (openTime && closeTime) return `${openTime}-${closeTime}`;

  return openTime ?? closeTime;
};

/**
 * 서버는 절약 금액을 양수로 내려주지만, 화면은 "절약 -25,000원" 처럼 음수로
 * 표기해 왔습니다. 표기 규칙을 바꾸지 않도록 여기서 부호를 뒤집습니다.
 */
const toSavingAmount = (savingsWon: number) =>
  savingsWon === 0 ? 0 : -savingsWon;

/** 상세의 `"WALKING + BUS"` 를 목록과 같은 배열 형태로 되돌립니다. */
const parseTransportType = (value: string): TransportationType[] =>
  value
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean) as TransportationType[];

/** 좌표가 없는 경유지는 지도에 찍을 수 없어 제외합니다. */
const toRouteLocations = (
  stopLocations: ServerRouteStopLocation[],
): RouteLocation[] =>
  stopLocations
    .filter((stop) => stop.latitude !== null && stop.longitude !== null)
    .map((stop) => ({
      sequence: stop.sequence + 1,
      dayNumber: stop.dayNumber,
      placeName: stop.placeName,
      latitude: stop.latitude as number,
      longitude: stop.longitude as number,
    }));

const toRouteStop = (stop: ServerRouteStop): RecommendedRouteStop => ({
  // 서버 sequence 는 0 부터라 화면 표기(1 부터)에 맞춰 올립니다.
  sequence: stop.sequence + 1,
  dayNumber: stop.dayNumber,
  placeName: stop.placeName,
  category: toCategoryLabel(stop.category),
  operatingHours: toOperatingHours(stop.openTime, stop.closeTime),
  latitude: stop.latitude,
  longitude: stop.longitude,
  transportationToNext: stop.nextTransportType,
  durationToNextMinutes: stop.nextTravelTimeMinutes,
});

export const toRecommendedRouteListItem = (
  route: ServerRecommendedRouteListItem,
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
  route: ServerRecommendedRouteDetail,
): RecommendedRouteDetail => ({
  id: route.routeId,
  name: route.routeName,
  stopCount: route.stopCount,
  distanceKm: route.totalDistanceKm,
  transportationTypes: parseTransportType(route.transportType),
  totalCost: route.totalCost,
  totalDurationMinutes: route.totalTimeMinutes,
  congestionLevel: route.congestionLevel,
  savingAmount: toSavingAmount(route.savedCost),
  // 상세 응답에는 목록의 stopLocations 가 없어 stops 좌표로 대신 채웁니다.
  locations: toRouteLocations(route.stops),
  recommendationScore: route.recommendScore,
  isRecommended: route.isRecommended,
  isSaved: route.isSaved,
  stops: route.stops.map(toRouteStop),
});
