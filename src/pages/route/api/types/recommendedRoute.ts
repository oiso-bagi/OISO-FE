// 추천 루트 리스트와 상세 API 타입

/** 서버가 내려주는 교통수단 코드와 값을 맞춥니다. */
export type TransportationType =
  "WALKING" | "BUS" | "SUBWAY" | "DRIVING" | "TAXI" | "BIKING";

/** UNKNOWN 은 서버가 보내지 않는 화면 전용 폴백입니다. */
export type CongestionLevel = "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";

export interface RouteLocation {
  sequence: number;
  dayNumber: number;
  placeName: string;
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

// 2. 추천 루트 상세
export interface RecommendedRouteStop {
  /** 전체 여행 코스 기준 누적 순서. 화면 표기용으로 1 부터 시작합니다. */
  sequence: number;
  /** 몇 일차 일정에 포함되는 경유지인지 (1~5). 다일 코스 지도 색상 구분에 사용합니다. */
  dayNumber: number;

  placeName: string;
  category: string;
  operatingHours: string | null;

  /** 좌표가 없는 장소가 있어 null 을 허용합니다. 지도에서는 제외됩니다. */
  latitude: number | null;
  longitude: number | null;

  transportationToNext: TransportationType | null;
  durationToNextMinutes: number | null;
}

export interface RecommendedRouteDetail extends RecommendedRouteListItem {
  stops: RecommendedRouteStop[];
  isSaved: boolean;
}
