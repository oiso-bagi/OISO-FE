/** 홈 요약 서버 응답 → 화면용 타입 변환. */

import { toSavingAmount } from "@/pages/route/api/mappers/common";
import type {
  HomeSummaryResponseDto,
  SavedRouteSummaryItemDto,
} from "@/shared/api/generated/types";

import type { HomeSavedRouteItem, HomeSummaryResponse } from "../types/home";

const toHomeSavedRouteItem = (
  item: SavedRouteSummaryItemDto,
): HomeSavedRouteItem => ({
  // 저장 레코드 id(item.id)가 아니라 루트 id 를 씁니다. 카드를 누르면
  // /saved-routes/{routeId} 로 상세를 조회하기 때문입니다.
  id: item.routeId,
  name: item.name,
  savedAt: item.savedAt,
  savingAmount: toSavingAmount(item.savingsWon),
  distanceKm: item.totalDistanceKm,
});

export const toHomeSummary = (
  response: HomeSummaryResponseDto,
): HomeSummaryResponse => ({
  totalSavingAmount: response.totalSavedSavingsWon,
  savedRouteCount: response.totalSavedCount,
  savedRoutes: response.savedRoutes.map(toHomeSavedRouteItem),
});
