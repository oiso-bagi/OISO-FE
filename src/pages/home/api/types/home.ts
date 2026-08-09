// 홈 요약 API 타입

export interface HomeSavedRouteItem {
  /** 서버가 내려주는 루트 식별자. 숫자가 아니라 "route_001" 형태입니다. */
  id: string;
  name: string;
  savedAt: string;

  savingAmount: number | null;
  distanceKm: number;
}

export interface HomeSummaryResponse {
  // 관광지 프리미엄 대비 아낀 돈 총합 (저장된 루트 기준)
  totalSavingAmount: number;

  savedRoutes: HomeSavedRouteItem[];
}
