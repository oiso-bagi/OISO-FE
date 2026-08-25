/**
 * 개발용 목 데이터
 *
 * .env 의 VITE_USE_MOCK 으로 켜고 끕니다. false 로 바꾸면 실제 API 요청으로
 * 전환되므로, 이 파일을 지우거나 훅을 되돌릴 필요는 없습니다.
 */

import { USE_MOCK } from "@/shared/config/env";

import type {
  RecommendedRouteDetail,
  RecommendedRouteListItem,
  RecommendedRouteStop,
} from "../api/types/recommendedRoute";
import type {
  SavedRouteDetail,
  SavedRouteListResponse,
} from "../api/types/savedRoute";

export const USE_MOCK_DATA = USE_MOCK;

const stopsByRouteId: Record<string, RecommendedRouteStop[]> = {
  route_001: [
    {
      sequence: 1,
      dayNumber: 1,
      placeName: "흰여울문화마을",
      category: "관광·포토",
      operatingHours: "09:00-18:00",
      latitude: 35.0785,
      longitude: 129.0201,
      transportationFromPrevious: null,
      durationFromPreviousMinutes: null,
    },
    {
      sequence: 2,
      dayNumber: 1,
      placeName: "깡깡이 예술마을",
      category: "문화·체험",
      operatingHours: null,
      latitude: 35.0836,
      longitude: 129.0294,
      transportationFromPrevious: "WALKING",
      durationFromPreviousMinutes: 8,
    },
    {
      sequence: 3,
      dayNumber: 1,
      placeName: "남항시장",
      category: "전통시장",
      operatingHours: "매일 영업",
      latitude: 35.0952,
      longitude: 129.0264,
      transportationFromPrevious: "SUBWAY",
      durationFromPreviousMinutes: 12,
    },
    {
      sequence: 4,
      dayNumber: 1,
      placeName: "태종대",
      category: "자연·관광",
      operatingHours: "09:00-일몰",
      latitude: 35.0518,
      longitude: 129.0873,
      transportationFromPrevious: "WALKING",
      durationFromPreviousMinutes: 6,
    },
  ],

  route_002: [
    {
      sequence: 1,
      dayNumber: 1,
      placeName: "해운대 해수욕장",
      category: "자연·관광",
      operatingHours: "상시 개방",
      latitude: 35.1587,
      longitude: 129.1604,
      transportationFromPrevious: null,
      durationFromPreviousMinutes: null,
    },
    {
      sequence: 2,
      dayNumber: 1,
      placeName: "동백섬 누리마루",
      category: "관광·포토",
      operatingHours: "09:00-18:00",
      latitude: 35.1533,
      longitude: 129.1543,
      transportationFromPrevious: "WALKING",
      durationFromPreviousMinutes: 15,
    },
    {
      sequence: 3,
      dayNumber: 1,
      placeName: "청사포 다릿돌전망대",
      category: "관광·포토",
      operatingHours: "09:00-20:00",
      latitude: 35.1614,
      longitude: 129.1935,
      transportationFromPrevious: "BUS",
      durationFromPreviousMinutes: 10,
    },
  ],

  route_003: [
    {
      sequence: 1,
      dayNumber: 1,
      placeName: "감천문화마을",
      category: "문화·체험",
      operatingHours: "09:00-18:00",
      latitude: 35.0975,
      longitude: 129.0107,
      transportationFromPrevious: null,
      durationFromPreviousMinutes: null,
    },
    {
      sequence: 2,
      dayNumber: 1,
      placeName: "아미산 전망대",
      category: "자연·관광",
      operatingHours: "10:00-18:00",
      latitude: 35.0836,
      longitude: 128.9993,
      transportationFromPrevious: "WALKING",
      durationFromPreviousMinutes: 11,
    },
    {
      sequence: 3,
      dayNumber: 1,
      placeName: "자갈치시장",
      category: "전통시장",
      operatingHours: "05:00-22:00",
      latitude: 35.0966,
      longitude: 129.0306,
      transportationFromPrevious: "BUS",
      durationFromPreviousMinutes: 14,
    },
    {
      sequence: 4,
      dayNumber: 1,
      placeName: "국제시장",
      category: "전통시장",
      operatingHours: null,
      latitude: 35.1013,
      longitude: 129.0261,
      transportationFromPrevious: "WALKING",
      durationFromPreviousMinutes: 7,
    },
  ],

  route_004: [
    {
      sequence: 1,
      dayNumber: 1,
      placeName: "광안리 해수욕장",
      category: "자연·관광",
      operatingHours: "상시 개방",
      latitude: 35.1532,
      longitude: 129.1187,
      transportationFromPrevious: null,
      durationFromPreviousMinutes: null,
    },
    {
      sequence: 2,
      dayNumber: 1,
      placeName: "민락수변공원",
      category: "관광·포토",
      operatingHours: null,
      latitude: 35.1546,
      longitude: 129.1289,
      transportationFromPrevious: "WALKING",
      durationFromPreviousMinutes: 9,
    },
  ],

  // 다일(2박 3일) 코스 목 — 일차별 지도 색상 구분/탭 UI 확인용
  route_005: [
    {
      sequence: 1,
      dayNumber: 1,
      placeName: "해운대 해수욕장",
      category: "자연·관광",
      operatingHours: "상시 개방",
      latitude: 35.1587,
      longitude: 129.1604,
      transportationFromPrevious: null,
      durationFromPreviousMinutes: null,
    },
    {
      sequence: 2,
      dayNumber: 1,
      placeName: "동백섬 누리마루",
      category: "관광·포토",
      operatingHours: "09:00-18:00",
      latitude: 35.1533,
      longitude: 129.1543,
      transportationFromPrevious: "WALKING",
      durationFromPreviousMinutes: 15,
    },
    {
      sequence: 3,
      dayNumber: 2,
      placeName: "감천문화마을",
      category: "문화·체험",
      operatingHours: "09:00-18:00",
      latitude: 35.0975,
      longitude: 129.0107,
      transportationFromPrevious: null,
      durationFromPreviousMinutes: null,
    },
    {
      sequence: 4,
      dayNumber: 2,
      placeName: "자갈치시장",
      category: "전통시장",
      operatingHours: "05:00-22:00",
      latitude: 35.0966,
      longitude: 129.0306,
      transportationFromPrevious: "BUS",
      durationFromPreviousMinutes: 14,
    },
    {
      sequence: 5,
      dayNumber: 3,
      placeName: "태종대",
      category: "자연·관광",
      operatingHours: "09:00-일몰",
      latitude: 35.0518,
      longitude: 129.0873,
      transportationFromPrevious: null,
      durationFromPreviousMinutes: null,
    },
    {
      sequence: 6,
      dayNumber: 3,
      placeName: "흰여울문화마을",
      category: "관광·포토",
      operatingHours: "09:00-18:00",
      latitude: 35.0785,
      longitude: 129.0201,
      transportationFromPrevious: "WALKING",
      durationFromPreviousMinutes: 20,
    },
  ],

  // 다일(1박 2일) 코스 목 — 2일차까지만 있는 케이스 확인용
  route_006: [
    {
      sequence: 1,
      dayNumber: 1,
      placeName: "광안리 해수욕장",
      category: "자연·관광",
      operatingHours: "상시 개방",
      latitude: 35.1532,
      longitude: 129.1187,
      transportationFromPrevious: null,
      durationFromPreviousMinutes: null,
    },
    {
      sequence: 2,
      dayNumber: 1,
      placeName: "민락수변공원",
      category: "관광·포토",
      operatingHours: null,
      latitude: 35.1546,
      longitude: 129.1289,
      transportationFromPrevious: "WALKING",
      durationFromPreviousMinutes: 9,
    },
    {
      sequence: 3,
      dayNumber: 2,
      placeName: "청사포 다릿돌전망대",
      category: "관광·포토",
      operatingHours: "09:00-20:00",
      latitude: 35.1614,
      longitude: 129.1935,
      transportationFromPrevious: null,
      durationFromPreviousMinutes: null,
    },
    {
      sequence: 4,
      dayNumber: 2,
      placeName: "동백섬 누리마루",
      category: "관광·포토",
      operatingHours: "09:00-18:00",
      latitude: 35.1533,
      longitude: 129.1543,
      transportationFromPrevious: "BUS",
      durationFromPreviousMinutes: 18,
    },
  ],
};

export const mockRecommendedRouteList: RecommendedRouteListItem[] = [
  {
    id: "route_001",
    name: "원도심 로컬 체험 코스",
    stopCount: 4,
    distanceKm: 3.2,
    transportationTypes: ["WALKING", "SUBWAY"],
    totalCost: 45000,
    totalDurationMinutes: 180,
    congestionLevel: "LOW",
    savingAmount: -25000,
    locations: [],
    recommendationScore: 92,
    isRecommended: true,
  },
  {
    id: "route_002",
    name: "해운대 바다 산책 코스",
    stopCount: 3,
    distanceKm: 4.8,
    transportationTypes: ["WALKING", "BUS"],
    totalCost: 32000,
    totalDurationMinutes: 150,
    congestionLevel: "HIGH",
    savingAmount: -12000,
    locations: [],
    recommendationScore: 85,
    isRecommended: false,
  },
  {
    id: "route_003",
    name: "감천문화마을 골목 코스",
    stopCount: 4,
    distanceKm: 2.6,
    transportationTypes: ["WALKING", "BUS"],
    totalCost: null,
    totalDurationMinutes: 210,
    congestionLevel: "MEDIUM",
    savingAmount: null,
    locations: [],
    recommendationScore: 78,
    isRecommended: false,
  },
  {
    id: "route_005",
    name: "부산 2박 3일 알짜배기 코스",
    stopCount: 6,
    distanceKm: 18.4,
    transportationTypes: ["WALKING", "BUS"],
    totalCost: 125000,
    totalDurationMinutes: 540,
    congestionLevel: "MEDIUM",
    savingAmount: -30000,
    locations: [],
    recommendationScore: 90,
    isRecommended: false,
  },
  {
    id: "route_006",
    name: "해운대·광안리 1박 2일 코스",
    stopCount: 4,
    distanceKm: 9.6,
    transportationTypes: ["WALKING", "BUS"],
    totalCost: 68000,
    totalDurationMinutes: 320,
    congestionLevel: "MEDIUM",
    savingAmount: -18000,
    locations: [],
    recommendationScore: 87,
    isRecommended: false,
  },
];

export const getMockRecommendedRouteDetail = (
  routeId: string,
): RecommendedRouteDetail => {
  const listItem = mockRecommendedRouteList.find(
    (route) => route.id === routeId,
  );

  // 저장 루트와 같은 이유로 첫 항목 대체 대신 실패시킵니다.
  if (!listItem) {
    throw new Error(`추천 루트를 찾을 수 없습니다: ${routeId}`);
  }

  return {
    ...listItem,
    // 목에서는 모든 추천 루트에 저장 버튼이 보이도록 항상 false 로 둡니다.
    isSaved: false,
    stops: stopsByRouteId[listItem.id] ?? [],
  };
};

const mockSavedRouteList: SavedRouteListResponse = {
  totalSavingAmount: 47000,
  routes: [
    {
      id: "route_001",
      name: "원도심 로컬 체험 코스",
      savedAt: "2026-05-18T00:00:00.000Z",
      stopCount: 4,
      distanceKm: 3.2,
      transportationTypes: ["WALKING", "SUBWAY"],
      totalCost: 45000,
      totalDurationMinutes: 180,
      congestionLevel: "LOW",
      savingAmount: -25000,
      isCompleted: false,
    },
    {
      id: "route_002",
      name: "해운대 바다 산책 코스",
      savedAt: "2026-05-02T00:00:00.000Z",
      stopCount: 3,
      distanceKm: 4.8,
      transportationTypes: ["WALKING", "BUS"],
      totalCost: 32000,
      totalDurationMinutes: 150,
      congestionLevel: "HIGH",
      savingAmount: -12000,
      isCompleted: true,
    },
    // 다일 코스. 저장 루트 상세에서도 일차 탭과 지도 색상 구분이 동작하는지
    // 확인하려면 목에 다일 코스가 하나는 있어야 합니다.
    {
      id: "route_005",
      name: "부산 2박 3일 알짜배기 코스",
      savedAt: "2026-06-02T00:00:00.000Z",
      stopCount: 6,
      distanceKm: 18.4,
      transportationTypes: ["WALKING", "BUS"],
      totalCost: 125000,
      totalDurationMinutes: 540,
      congestionLevel: "MEDIUM",
      savingAmount: -30000,
      isCompleted: false,
    },
    // 추천 목록에 없는 루트. 추천 루트를 저장하면 카드가 하나 더 추가됩니다.
    {
      id: "route_004",
      name: "광안리 야경 코스",
      savedAt: "2026-04-21T00:00:00.000Z",
      stopCount: 2,
      distanceKm: 1.4,
      transportationTypes: ["WALKING"],
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

export const getMockSavedRouteDetail = (routeId: string): SavedRouteDetail => {
  const listItem = mockSavedRouteList.routes.find(
    (route) => route.id === routeId,
  );

  // 서버는 없는 루트에 404 를 주므로 목도 실패시킵니다. 첫 항목으로 대체하면
  // 다른 루트를 보여주게 되고, 저장 루트를 모두 지운 뒤에는 목록이 비어
  // 접근 자체가 터집니다.
  if (!listItem) {
    throw new Error(`저장 루트를 찾을 수 없습니다: ${routeId}`);
  }

  return {
    ...listItem,
    stops: stopsByRouteId[listItem.id] ?? [],
  };
};

// --- 목 뮤테이션 ---------------------------------------------------------
// 실제 API 대신 목 목록을 직접 수정합니다. 뮤테이션 후 invalidate 되면
// 위의 getMockSavedRouteList 가 바뀐 값을 새 객체로 돌려줘 화면이 갱신됩니다.

export const mockUpdateSavedRouteCompleted = (
  routeId: string,
  isCompleted: boolean,
) => {
  mockSavedRouteList.routes = mockSavedRouteList.routes.map((route) =>
    route.id === routeId ? { ...route, isCompleted } : route,
  );
};

export const mockDeleteSavedRoute = (routeId: string) => {
  mockSavedRouteList.routes = mockSavedRouteList.routes.filter(
    (route) => route.id !== routeId,
  );
};

export const mockCreateSavedRoute = (routeId: string) => {
  if (mockSavedRouteList.routes.some((route) => route.id === routeId)) return;

  const source = mockRecommendedRouteList.find((route) => route.id === routeId);
  if (!source) return;

  mockSavedRouteList.routes = [
    ...mockSavedRouteList.routes,
    {
      id: source.id,
      name: source.name,
      savedAt: "2026-07-23T00:00:00.000Z",
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
