// 저장 루트 관련 타입
import type {
  CongestionLevel,
  RecommendedRouteStop,
  TransportationType,
} from "./recommendedRoute";

export interface SavedRouteListItem {
  /** 서버가 내려주는 루트 식별자. 숫자가 아니라 "route_001" 형태입니다. */
  id: string;
  name: string;
  savedAt: string;

  stopCount: number;
  distanceKm: number;
  transportationTypes: TransportationType[];

  totalCost: number | null;
  totalDurationMinutes: number | null;
  /** 목록 응답에는 없습니다. 저장 카드는 혼잡도 대신 저장일을 표시합니다. */
  congestionLevel?: CongestionLevel;
  savingAmount: number | null;

  isCompleted: boolean;
}

export interface SavedRouteListResponse {
  totalSavingAmount: number;
  routes: SavedRouteListItem[];
}

export interface SavedRouteDetail extends SavedRouteListItem {
  stops: RecommendedRouteStop[];
}

export interface UpdateSavedRouteCompletionRequest {
  isCompleted: boolean;
}
