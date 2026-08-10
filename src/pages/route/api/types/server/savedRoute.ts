/**
 * 저장 루트 API 의 서버 응답 원형입니다.
 *
 * Swagger 에서 이 도메인의 상세 응답은 대부분의 필드가 `type: object` 로
 * 선언되어 있어 코드 생성이 불가능합니다. example 값을 근거로 실제 타입을
 * 적어 두었고, 명세 보완 후 생성 타입으로 교체합니다.
 */

import type { ServerTransitType } from "./recommendedRoute";

/** GET /saved-routes 의 savedRoutes 요소 */
export interface ServerSavedRouteItem {
  routeId: string;
  routeName: string;
  /** ISO 8601 datetime. 예: "2026-08-01T00:00:00.000Z" */
  savedAt: string;
  isCompleted: boolean;
  stopCount: number;
  totalDistanceKm: number;
  transitTypes: ServerTransitType[];
  totalCost: number;
  totalTimeMinutes: number;
  estimatedSavingsWon: number;
}

/** GET /saved-routes */
export interface ServerSavedRouteList {
  savedRouteCount: number;
  totalSavedSavingsWon: number;
  savedRoutes: ServerSavedRouteItem[];
}

/**
 * 저장 루트 상세의 경유지.
 *
 * 추천 루트의 경유지(ServerRouteStop)와 달리 `dayNumber` 가 없습니다.
 * 화면은 일차별로 묶어 표시하므로 mapper 에서 1 일차로 채웁니다.
 */
export interface ServerSavedRouteStop {
  /** 0 부터 시작합니다. */
  sequence: number;
  placeName: string;
  /** 분류되지 않은 장소는 null 입니다. */
  category: string | null;
  openTime: string | null;
  closeTime: string | null;
  nextTransportType: ServerTransitType | null;
  nextTravelTimeMinutes: number | null;
  latitude: number | null;
  longitude: number | null;
}

/** GET /saved-routes/{routeId} */
export interface ServerSavedRouteDetail {
  routeId: string;
  routeName: string;
  savedAt: string;
  isCompleted: boolean;
  stopCount: number;
  totalDistanceKm: number;
  /** `"WALKING + BUS"` 형태의 단일 문자열입니다. */
  transportType: string;
  congestionLevel: "LOW" | "MEDIUM" | "HIGH";
  savedCost: number;
  recommendScore: number;
  isRecommended: boolean;
  isSaved: boolean;
  totalCost: number;
  totalTimeMinutes: number;
  totalTimeDisplay: string;
  metaCost: { transportCost: number; placeCost: number };
  metaTime: { pureTravelTime: number; stayTime: number };
  estimatedSavingsWon: number;
  stops: ServerSavedRouteStop[];
}

/** POST /saved-routes */
export interface ServerCreateSavedRouteRequest {
  routeId: string;
}

/** PATCH /saved-routes/{routeId}/completion */
export interface ServerToggleCompletionRequest {
  isCompleted: boolean;
  /** 실제 지출 금액. 입력 화면이 아직 없어 보내지 않습니다. */
  actualCostWon?: number;
}

export interface ServerSavedRouteCompletion {
  routeId: string;
  isCompleted: boolean;
  actualCostWon: number | null;
}
