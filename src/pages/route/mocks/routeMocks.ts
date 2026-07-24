/**
 * 개발용 목 데이터
 *
 * VITE_API_BASE_URL 이 비어 있을 때만 사용됩니다.
 * .env 에 API 주소를 채우면 자동으로 실제 API 요청으로 전환되므로,
 * 이 파일을 지우거나 훅을 되돌릴 필요는 없습니다.
 */

import type {
  RecommendedRouteDetailResponse,
  RecommendedRouteListResponse,
  RecommendedRouteStop,
} from "../api/types/recommendedRoute";
import type {
  SavedRouteDetailResponse,
  SavedRouteListResponse,
} from "../api/types/savedRoute";

export const USE_MOCK_DATA = !import.meta.env.VITE_API_BASE_URL;

const stopsByRouteId: Record<number, RecommendedRouteStop[]> = {
  1: [
    {
      id: 101,
      order: 1,
      name: "흰여울문화마을",
      category: "관광·포토",
      operatingHours: "09:00-18:00",
      latitude: 35.0785,
      longitude: 129.0201,
      transportationToNext: "WALK",
      durationToNextMinutes: 8,
    },
    {
      id: 102,
      order: 2,
      name: "깡깡이 예술마을",
      category: "문화·체험",
      operatingHours: null,
      latitude: 35.0836,
      longitude: 129.0294,
      transportationToNext: "SUBWAY",
      durationToNextMinutes: 12,
    },
    {
      id: 103,
      order: 3,
      name: "남항시장",
      category: "전통시장",
      operatingHours: "매일 영업",
      latitude: 35.0952,
      longitude: 129.0264,
      transportationToNext: "WALK",
      durationToNextMinutes: 6,
    },
    {
      id: 104,
      order: 4,
      name: "태종대",
      category: "자연·관광",
      operatingHours: "09:00-일몰",
      latitude: 35.0518,
      longitude: 129.0873,
      transportationToNext: null,
      durationToNextMinutes: null,
    },
  ],

  2: [
    {
      id: 201,
      order: 1,
      name: "해운대 해수욕장",
      category: "자연·관광",
      operatingHours: "상시 개방",
      latitude: 35.1587,
      longitude: 129.1604,
      transportationToNext: "WALK",
      durationToNextMinutes: 15,
    },
    {
      id: 202,
      order: 2,
      name: "동백섬 누리마루",
      category: "관광·포토",
      operatingHours: "09:00-18:00",
      latitude: 35.1533,
      longitude: 129.1543,
      transportationToNext: "BUS",
      durationToNextMinutes: 10,
    },
    {
      id: 203,
      order: 3,
      name: "청사포 다릿돌전망대",
      category: "관광·포토",
      operatingHours: "09:00-20:00",
      latitude: 35.1614,
      longitude: 129.1935,
      transportationToNext: null,
      durationToNextMinutes: null,
    },
  ],

  3: [
    {
      id: 301,
      order: 1,
      name: "감천문화마을",
      category: "문화·체험",
      operatingHours: "09:00-18:00",
      latitude: 35.0975,
      longitude: 129.0107,
      transportationToNext: "WALK",
      durationToNextMinutes: 11,
    },
    {
      id: 302,
      order: 2,
      name: "아미산 전망대",
      category: "자연·관광",
      operatingHours: "10:00-18:00",
      latitude: 35.0836,
      longitude: 128.9993,
      transportationToNext: "BUS",
      durationToNextMinutes: 14,
    },
    {
      id: 303,
      order: 3,
      name: "자갈치시장",
      category: "전통시장",
      operatingHours: "05:00-22:00",
      latitude: 35.0966,
      longitude: 129.0306,
      transportationToNext: "WALK",
      durationToNextMinutes: 7,
    },
    {
      id: 304,
      order: 4,
      name: "국제시장",
      category: "전통시장",
      operatingHours: null,
      latitude: 35.1013,
      longitude: 129.0261,
      transportationToNext: null,
      durationToNextMinutes: null,
    },
  ],

  4: [
    {
      id: 401,
      order: 1,
      name: "광안리 해수욕장",
      category: "자연·관광",
      operatingHours: "상시 개방",
      latitude: 35.1532,
      longitude: 129.1187,
      transportationToNext: "WALK",
      durationToNextMinutes: 9,
    },
    {
      id: 402,
      order: 2,
      name: "민락수변공원",
      category: "관광·포토",
      operatingHours: null,
      latitude: 35.1546,
      longitude: 129.1289,
      transportationToNext: null,
      durationToNextMinutes: null,
    },
  ],
};

export const mockRecommendedRouteList: RecommendedRouteListResponse = {
  routes: [
    {
      id: 1,
      name: "원도심 로컬 체험 코스",
      stopCount: 4,
      distanceKm: 3.2,
      transportationTypes: ["WALK", "SUBWAY"],
      totalCost: 45000,
      totalDurationMinutes: 180,
      congestionLevel: "LOW",
      savingAmount: -25000,
      locations: [],
      recommendationScore: 92,
      isRecommended: true,
    },
    {
      id: 2,
      name: "해운대 바다 산책 코스",
      stopCount: 3,
      distanceKm: 4.8,
      transportationTypes: ["WALK", "BUS"],
      totalCost: 32000,
      totalDurationMinutes: 150,
      congestionLevel: "HIGH",
      savingAmount: -12000,
      locations: [],
      recommendationScore: 85,
      isRecommended: false,
    },
    {
      id: 3,
      name: "감천문화마을 골목 코스",
      stopCount: 4,
      distanceKm: 2.6,
      transportationTypes: ["WALK", "BUS"],
      totalCost: null,
      totalDurationMinutes: 210,
      congestionLevel: "MEDIUM",
      savingAmount: null,
      locations: [],
      recommendationScore: 78,
      isRecommended: false,
    },
  ],
};

export const getMockRecommendedRouteDetail = (
  routeId: number,
): RecommendedRouteDetailResponse => {
  const listItem =
    mockRecommendedRouteList.routes.find((route) => route.id === routeId) ??
    mockRecommendedRouteList.routes[0];

  return {
    route: {
      ...listItem,
      // 목에서는 모든 추천 루트에 저장 버튼이 보이도록 항상 false 로 둡니다.
      isSaved: false,
      stops: stopsByRouteId[listItem.id] ?? [],
    },
  };
};

const mockSavedRouteList: SavedRouteListResponse = {
  totalSavingAmount: 47000,
  routes: [
    {
      id: 1,
      name: "원도심 로컬 체험 코스",
      savedAt: "2026-05-18",
      stopCount: 4,
      distanceKm: 3.2,
      transportationTypes: ["WALK", "SUBWAY"],
      totalCost: 45000,
      totalDurationMinutes: 180,
      congestionLevel: "LOW",
      savingAmount: -25000,
      isCompleted: false,
    },
    {
      id: 2,
      name: "해운대 바다 산책 코스",
      savedAt: "2026-05-02",
      stopCount: 3,
      distanceKm: 4.8,
      transportationTypes: ["WALK", "BUS"],
      totalCost: 32000,
      totalDurationMinutes: 150,
      congestionLevel: "HIGH",
      savingAmount: -12000,
      isCompleted: true,
    },
    // 추천 목록에 없는 루트. 추천 루트를 저장하면 4번째 카드로 추가됩니다.
    {
      id: 4,
      name: "광안리 야경 코스",
      savedAt: "2026-04-21",
      stopCount: 2,
      distanceKm: 1.4,
      transportationTypes: ["WALK"],
      totalCost: null,
      totalDurationMinutes: 90,
      congestionLevel: "MEDIUM",
      savingAmount: null,
      isCompleted: false,
    },
  ],
};

/**
 * 목 뮤테이션 결과가 화면에 반영되도록 매번 새 객체로 반환합니다.
 * 누적 절약은 현재 routes 에서 다시 계산해, 삭제/추가 시 값이 바뀝니다.
 * (실제 API 는 서버가 총액을 계산해 내려줍니다)
 */
export const getMockSavedRouteList = (): SavedRouteListResponse => ({
  totalSavingAmount: mockSavedRouteList.routes.reduce(
    (sum, route) => sum + Math.abs(route.savingAmount ?? 0),
    0,
  ),
  routes: [...mockSavedRouteList.routes],
});

export const getMockSavedRouteDetail = (
  routeId: number,
): SavedRouteDetailResponse => {
  const listItem =
    mockSavedRouteList.routes.find((route) => route.id === routeId) ??
    mockSavedRouteList.routes[0];

  return {
    route: {
      ...listItem,
      stops: stopsByRouteId[listItem.id] ?? [],
    },
  };
};

// --- 목 뮤테이션 ---------------------------------------------------------
// 실제 API 대신 목 목록을 직접 수정합니다. 뮤테이션 후 invalidate 되면
// 위의 getMockSavedRouteList 가 바뀐 값을 새 객체로 돌려줘 화면이 갱신됩니다.

export const mockUpdateSavedRouteCompleted = (
  routeId: number,
  isCompleted: boolean,
) => {
  mockSavedRouteList.routes = mockSavedRouteList.routes.map((route) =>
    route.id === routeId ? { ...route, isCompleted } : route,
  );
};

export const mockDeleteSavedRoute = (routeId: number) => {
  mockSavedRouteList.routes = mockSavedRouteList.routes.filter(
    (route) => route.id !== routeId,
  );
};

export const mockCreateSavedRoute = (routeId: number) => {
  if (mockSavedRouteList.routes.some((route) => route.id === routeId)) return;

  const source = mockRecommendedRouteList.routes.find(
    (route) => route.id === routeId,
  );
  if (!source) return;

  mockSavedRouteList.routes = [
    ...mockSavedRouteList.routes,
    {
      id: source.id,
      name: source.name,
      savedAt: "2026-07-23",
      stopCount: source.stopCount,
      distanceKm: source.distanceKm,
      transportationTypes: source.transportationTypes,
      totalCost: source.totalCost,
      totalDurationMinutes: source.totalDurationMinutes,
      congestionLevel: source.congestionLevel,
      savingAmount: source.savingAmount,
      isCompleted: false,
    },
  ];
};
