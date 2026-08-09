/**
 * 추천 루트 API 의 서버 응답 원형입니다.
 *
 * 화면에서 직접 쓰지 않고 `mappers/recommendedRoute.ts` 를 거쳐 view 타입으로
 * 변환합니다. Swagger 의 일부 필드가 아직 `type: object` 로 선언되어 있어
 * 코드 생성이 불가능하므로, 실제 응답을 확인해 손으로 작성했습니다.
 * 명세 보완 후 생성 타입으로 교체합니다.
 */

export type ServerTransitType =
  "WALKING" | "BUS" | "SUBWAY" | "DRIVING" | "TAXI" | "BIKING";

export type ServerCongestionLevel = "LOW" | "MEDIUM" | "HIGH";

/** POST /recommended-routes/recommend 요청 본문 */
export interface ServerRecommendRouteRequest {
  travelStyleSlugs: string[];
  durationDays: number;
  dailyBudgetWon: number;
  ratios?: {
    foodRatio: number;
    experienceRatio: number;
    transportRatio: number;
  };
}

export interface ServerRouteStopLocation {
  sequence: number;
  dayNumber: number;
  placeName: string;
  latitude: number | null;
  longitude: number | null;
}

/** GET /recommended-routes 의 배열 요소 */
export interface ServerRecommendedRouteListItem {
  id: string;
  name: string;
  stopCount: number;
  totalDistanceMeters: number;
  totalDistanceKm: number;
  transitTypes: ServerTransitType[];
  totalCost: number;
  totalTimeMinutes: number;
  congestionLevel: ServerCongestionLevel;
  estimatedSavingsWon: number;
  score: number;
  isRecommended: boolean;
  stopLocations: ServerRouteStopLocation[];
}

export interface ServerRouteStop {
  /** 0 부터 시작합니다. 화면 표기는 1 부터라 mapper 에서 +1 합니다. */
  sequence: number;
  dayNumber: number;
  placeName: string;
  category: string;
  openTime: string | null;
  closeTime: string | null;
  latitude: number | null;
  longitude: number | null;
  nextTransportType: ServerTransitType | null;
  nextTravelTimeMinutes: number | null;
}

/** GET /recommended-routes/{id} */
export interface ServerRecommendedRouteDetail {
  routeId: string;
  routeName: string;
  stopCount: number;
  totalDistanceKm: number;
  /** 목록의 transitTypes 와 달리 `"WALKING + BUS"` 형태의 단일 문자열입니다. */
  transportType: string;
  congestionLevel: ServerCongestionLevel;
  savedCost: number;
  recommendScore: number;
  isRecommended: boolean;
  isSaved: boolean;
  totalCost: number;
  totalTimeMinutes: number;
  totalTimeDisplay: string;
  metaCost: { transportCost: number; placeCost: number };
  metaTime: { pureTravelTime: number; stayTime: number };
  stops: ServerRouteStop[];
}
