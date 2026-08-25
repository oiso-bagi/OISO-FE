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
  /** 분류되지 않은 장소는 null 이며, 화면에서 태그를 감춥니다. */
  category: string | null;
  operatingHours: string | null;

  /** 좌표가 없는 장소가 있어 null 을 허용합니다. 지도에서는 제외됩니다. */
  latitude: number | null;
  longitude: number | null;

  /**
   * 이전 경유지에서 이 경유지까지의 이동수단과 소요시간.
   *
   * 서버 필드명은 `nextTransportType` / `nextTravelTimeMinutes` 지만 실제 값은
   * `pathCoordinates` 와 같은 방향입니다. 첫 경유지는 출발점이라 시간이 항상 0
   * 이고, 마지막 경유지에도 값이 들어 있습니다.
   */
  transportationFromPrevious: TransportationType | null;
  durationFromPreviousMinutes: number | null;

  /**
   * 이전 경유지에서 이 경유지까지의 실제 도로 좌표. 지도 경로선에 씁니다.
   *
   * 스웨거 설명은 "이 경유지부터 다음 경유지까지"라고 되어 있으나 실제 응답은
   * 반대입니다(첫 경유지는 항상 빈 배열, 마지막 경유지는 값이 있음). 헷갈리지
   * 않도록 이름에 방향을 박아 둡니다.
   *
   * 목 데이터에는 없어 optional 이며, 없으면 지도가 직선으로 잇습니다.
   */
  pathFromPrevious?: RoutePathPoint[];
}

/** 도로 굴곡을 이루는 좌표 하나 */
export interface RoutePathPoint {
  latitude: number;
  longitude: number;
}

export interface RecommendedRouteDetail extends RecommendedRouteListItem {
  stops: RecommendedRouteStop[];
  isSaved: boolean;
}
