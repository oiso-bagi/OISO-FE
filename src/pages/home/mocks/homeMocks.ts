/**
 * 개발용 목 데이터
 *
 * VITE_API_BASE_URL 이 비어 있을 때만 사용됩니다.
 * .env 에 API 주소를 채우면 자동으로 실제 API 요청으로 전환됩니다.
 */

import type { HomeSummaryResponse } from "../api/types/home";

export const USE_MOCK_HOME_DATA = !import.meta.env.VITE_API_BASE_URL;

// 저장 페이지 목(routeMocks.mockSavedRouteList)과 id·이름을 맞춰,
// 홈에서 카드를 눌렀을 때 저장 페이지에서 해당 루트가 펼쳐지도록 합니다.
export const mockHomeSummary: HomeSummaryResponse = {
  totalSavingAmount: 55000,
  savedRoutes: [
    {
      id: 1,
      name: "원도심 로컬 체험 코스",
      savedAt: "2026-05-18",
      savingAmount: -25000,
      distanceKm: 3.2,
    },
    {
      id: 2,
      name: "해운대 바다 산책 코스",
      savedAt: "2026-05-02",
      savingAmount: -12000,
      distanceKm: 4.8,
    },
    {
      id: 4,
      name: "광안리 야경 코스",
      savedAt: "2026-04-21",
      savingAmount: null,
      distanceKm: 1.4,
    },
  ],
};
