/**
 * 개발용 목 데이터
 *
 * .env 의 VITE_USE_MOCK 으로 켜고 끕니다. false 로 바꾸면 실제 API 요청으로
 * 전환됩니다.
 */

import { getMockSavedRouteList } from "@/pages/route/mocks/routeMocks";
import { USE_MOCK } from "@/shared/config/env";

import type { HomeSummaryResponse } from "../api/types/home";

export const USE_MOCK_HOME_DATA = USE_MOCK;

/**
 * 홈 요약은 저장 루트에서 파생되는 값이라 저장 목 데이터에서 계산합니다.
 *
 * 별도 상수로 두면 루트를 저장하거나 삭제해도 홈이 그대로여서, 실제 서버와
 * 다르게 동작합니다. 목에서도 같은 흐름을 확인할 수 있도록 맞춥니다.
 */
export const getMockHomeSummary = (): HomeSummaryResponse => {
  const { totalSavingAmount, routes } = getMockSavedRouteList();

  return {
    totalSavingAmount,
    savedRouteCount: routes.length,
    savedRoutes: routes.map((route) => ({
      id: route.id,
      name: route.name,
      savedAt: route.savedAt,
      savingAmount: route.savingAmount,
      distanceKm: route.distanceKm,
    })),
  };
};
