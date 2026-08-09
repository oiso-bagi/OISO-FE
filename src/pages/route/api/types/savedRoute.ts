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
  congestionLevel: CongestionLevel;
  savingAmount: number | null;

  isCompleted: boolean;
}

export interface SavedRouteListResponse {
  totalSavingAmount?: number | null; // 백엔드에서 누적 금액 직접 내려줄지 미확인
  routes: SavedRouteListItem[];
}

export interface SavedRouteDetail extends SavedRouteListItem {
  stops: RecommendedRouteStop[];
}

export interface SavedRouteDetailResponse {
  route: SavedRouteDetail;
}

export interface UpdateSavedRouteCompletedRequest {
  isCompleted: boolean;
}
