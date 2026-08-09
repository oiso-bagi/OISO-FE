// 추천 루트 리스트와 상세 API 타입

export type TransportationType = "WALK" | "BUS" | "SUBWAY" | "BICYCLE" | "TAXI";

export type CongestionLevel = "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";

export interface RouteLocation {
  latitude: number;
  longitude: number;
}

// 1. 추천 루트 리스트
export interface RecommendedRouteListItem {
  /** 서버가 내려주는 루트 식별자. 숫자가 아니라 "route_001" 형태입니다. */
  id: string;
  name: string;

  stopCount: number;
  distanceKm: number;
  transportationTypes: TransportationType[];

  totalCost: number | null;
  totalDurationMinutes: number | null;
  congestionLevel: CongestionLevel;
  savingAmount: number | null;

  locations: RouteLocation[];

  recommendationScore: number;
  isRecommended: boolean;
}

export interface RecommendedRouteListResponse {
  routes: RecommendedRouteListItem[];
}

// 2. 추천 루트 상세
export interface RecommendedRouteStop {
  id: number;
  /** 전체 여행 코스 기준 누적 순서 (0, 1, 2, 3...) */
  sequence: number;
  /** 몇 일차 일정에 포함되는 경유지인지 (1~5). 다일 코스 지도 색상 구분에 사용합니다. */
  dayNumber: number;

  placeName: string;
  category: string;
  operatingHours: string | null;

  latitude: number;
  longitude: number;

  transportationToNext: TransportationType | null;
  durationToNextMinutes: number | null;
}

export interface RecommendedRouteDetail extends RecommendedRouteListItem {
  stops: RecommendedRouteStop[];
  isSaved: boolean;
}

export interface RecommendedRouteDetailResponse {
  route: RecommendedRouteDetail;
}
