import type { RecommendationConditions } from "@/shared/lib/recommendationConditions";

/**
 * 서버 상태 query key 를 한곳에서 관리합니다.
 *
 * 도메인별 prefix 를 두어, 뮤테이션 후 `all` 만 넘기면 해당 도메인의 목록과
 * 상세가 함께 무효화됩니다. 페이지별로 key 를 따로 두면 다른 도메인의 캐시를
 * 무효화할 수 없어(예: 루트를 저장했을 때 홈 요약) 화면이 오래된 값을
 * 보여주게 됩니다.
 */

const home = ["home"] as const;
const recommendedRoutes = ["recommendedRoutes"] as const;
const savedRoutes = ["savedRoutes"] as const;

const adminUsers = ["admin", "users"] as const;
const adminPlaces = ["admin", "places"] as const;
const adminRoutes = ["admin", "routes"] as const;
const adminStats = ["admin", "stats"] as const;
const adminKto = ["admin", "kto"] as const;

export const queryKeys = {
  user: {
    me: ["user", "me"],
  },

  consent: {
    status: ["consent", "status"],
  },

  dashboard: {
    savings: ["dashboard", "savings"],
  },

  home: {
    all: home,
    summary: () => [...home, "summary"] as const,
  },

  recommendedRoutes: {
    all: recommendedRoutes,
    /** 설문 조건이 바뀌면 다른 결과이므로 key 에 포함합니다. */
    list: (conditions: RecommendationConditions | null = null) =>
      [...recommendedRoutes, "list", conditions] as const,
    detail: (routeId: string) =>
      [...recommendedRoutes, "detail", routeId] as const,
  },

  savedRoutes: {
    all: savedRoutes,
    list: () => [...savedRoutes, "list"] as const,
    detail: (routeId: string) => [...savedRoutes, "detail", routeId] as const,
  },

  survey: {
    recommendationOptions: () => ["survey", "recommendationOptions"] as const,
  },

  admin: {
    users: {
      all: adminUsers,
      /** 검색·필터·페이지가 바뀌면 다른 결과이므로 key 에 포함합니다. */
      list: (query: object) => [...adminUsers, "list", query] as const,
    },

    places: {
      all: adminPlaces,
      list: (query: object) => [...adminPlaces, "list", query] as const,
    },

    routes: {
      all: adminRoutes,
      list: (query: object) => [...adminRoutes, "list", query] as const,
      detail: (routeId: string) => [...adminRoutes, "detail", routeId] as const,
    },

    stats: {
      all: adminStats,
      overview: () => [...adminStats, "overview"] as const,
      savingsBreakdown: () => [...adminStats, "savingsBreakdown"] as const,
    },

    kto: {
      all: adminKto,
      status: () => [...adminKto, "status"] as const,
    },
  },
};
