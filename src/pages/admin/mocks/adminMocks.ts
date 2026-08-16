/**
 * 관리자 화면 개발용 목 데이터.
 *
 * 이 이슈의 범위는 UI 까지이고 실제 API 연동은 별도 작업이라, 화면이 붙잡고
 * 쓸 데이터를 여기서 대신 만듭니다.
 *
 * 목록은 실제 서버처럼 **필터 → 정렬 → 페이지네이션** 순으로 처리하고,
 * 토글은 메모리 상태를 바꾼 뒤 **변경된 객체 전체**를 돌려줍니다. 백엔드에
 * 전달한 스펙과 같은 동작이라, 연동할 때 훅의 `queryFn`·`mutationFn` 만
 * 실제 호출로 바꾸면 화면 코드는 그대로 둘 수 있습니다.
 *
 * 상태는 메모리에만 있어 새로고침하면 초기값으로 돌아갑니다.
 */

import type {
  AdminKtoCollectResponse,
  AdminKtoStatus,
  AdminPlace,
  AdminPlacesQuery,
  AdminRoute,
  AdminRoutesQuery,
  AdminSavingsBreakdown,
  AdminStatsOverview,
  AdminUser,
  AdminUsersQuery,
  AuthProvider,
  PaginatedResponse,
  PlaceCategory,
  UserRole,
} from "../types";

/** 로딩·에러 상태를 눈으로 확인할 수 있도록 약간 지연시킵니다. */
const delay = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms));

const paginate = <T>(
  rows: T[],
  page: number,
  size: number,
): PaginatedResponse<T> => {
  const totalCount = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / size));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * size;

  return {
    items: rows.slice(start, start + size),
    page: safePage,
    size,
    totalCount,
    totalPages,
  };
};

const includes = (haystack: string, needle: string) =>
  haystack.toLowerCase().includes(needle.trim().toLowerCase());

/* ── 회원 ───────────────────────────────────────────────── */

const NICKNAMES = [
  "부산러버",
  "광안리단골",
  "해운대워커",
  "감천마을",
  "밀면조아",
  "남포동산책",
  "영도바람",
  "송정서퍼",
  "기장멸치",
  "자갈치아침",
  "전포카페",
  "다대포노을",
];

const PROVIDERS: AuthProvider[] = ["KAKAO", "GOOGLE"];

const users: AdminUser[] = Array.from({ length: 137 }, (_, index) => {
  const order = index + 1;
  const createdAt = new Date(2026, 0, 1);
  createdAt.setDate(createdAt.getDate() + index * 2);

  return {
    id: `user_${String(order).padStart(3, "0")}`,
    email: `user${order}@example.com`,
    nickname: `${NICKNAMES[index % NICKNAMES.length]}${order}`,
    provider: PROVIDERS[index % 2],
    // 관리자는 소수만 둡니다.
    role: index % 23 === 0 ? "ADMIN" : "USER",
    // 정지 계정도 섞여야 필터가 의미 있습니다.
    isActive: index % 11 !== 0,
    profileImageUrl: null,
    createdAt: createdAt.toISOString(),
  };
});

export const mockGetAdminUsers = async (
  query: AdminUsersQuery,
): Promise<PaginatedResponse<AdminUser>> => {
  await delay();

  const filtered = users.filter((user) => {
    if (
      query.q &&
      !includes(user.email, query.q) &&
      !includes(user.nickname, query.q)
    ) {
      return false;
    }
    if (query.provider && user.provider !== query.provider) return false;
    if (query.isActive !== undefined && user.isActive !== query.isActive) {
      return false;
    }
    if (query.role && user.role !== query.role) return false;

    return true;
  });

  // 최근 가입 순
  const sorted = [...filtered].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return paginate(sorted, query.page, query.size);
};

const findUser = (userId: string) => {
  const user = users.find((row) => row.id === userId);

  if (!user) throw new Error("존재하지 않는 회원입니다.");

  return user;
};

export const mockPatchAdminUserActive = async (
  userId: string,
  isActive: boolean,
): Promise<AdminUser> => {
  await delay(200);

  const user = findUser(userId);
  user.isActive = isActive;

  return { ...user };
};

export const mockPatchAdminUserRole = async (
  userId: string,
  role: UserRole,
): Promise<AdminUser> => {
  await delay(200);

  const user = findUser(userId);

  /**
   * 마지막 관리자를 해제하면 아무도 관리자 화면에 들어올 수 없게 됩니다.
   * 서버에서 409 로 막아주기로 한 규칙이라 목에서도 같게 동작시킵니다.
   */
  if (user.role === "ADMIN" && role === "USER") {
    const adminCount = users.filter((row) => row.role === "ADMIN").length;

    if (adminCount <= 1) {
      throw new Error("마지막 관리자는 권한을 해제할 수 없습니다.");
    }
  }

  user.role = role;

  return { ...user };
};

/* ── 장소 ───────────────────────────────────────────────── */

const PLACE_SEEDS: {
  name: string;
  address: string;
  category: PlaceCategory;
}[] = [
  {
    name: "자갈치시장",
    address: "부산 중구 자갈치해안로 52",
    category: "MARKET",
  },
  { name: "국제시장", address: "부산 중구 신창동4가", category: "MARKET" },
  { name: "부평깡통시장", address: "부산 중구 부평1길 48", category: "MARKET" },
  { name: "전포카페거리", address: "부산 부산진구 서전로", category: "CAFE" },
  { name: "초량밀면", address: "부산 동구 중앙대로 225", category: "FOOD" },
  {
    name: "가야포차선지국",
    address: "부산 부산진구 가야대로",
    category: "FOOD",
  },
  {
    name: "감천문화마을",
    address: "부산 사하구 감내2로 203",
    category: "CULTURE",
  },
  {
    name: "부산현대미술관",
    address: "부산 사하구 낙동남로 1191",
    category: "CULTURE",
  },
  {
    name: "광안리해수욕장",
    address: "부산 수영구 광안해변로",
    category: "NATURE",
  },
  {
    name: "다대포해수욕장",
    address: "부산 사하구 몰운대1길",
    category: "NATURE",
  },
  {
    name: "송정해수욕장",
    address: "부산 해운대구 송정해변로",
    category: "NATURE",
  },
  {
    name: "깡깡이예술마을",
    address: "부산 영도구 대평로",
    category: "EXPERIENCE",
  },
  {
    name: "해운대블루라인파크",
    address: "부산 해운대구 달맞이길",
    category: "EXPERIENCE",
  },
  {
    name: "황령산전망대",
    address: "부산 남구 황령산로",
    category: "VIEWPOINT",
  },
  {
    name: "흰여울문화마을",
    address: "부산 영도구 흰여울길",
    category: "VIEWPOINT",
  },
  {
    name: "부산시민공원",
    address: "부산 부산진구 시민공원로",
    category: "ETC",
  },
];

const places: AdminPlace[] = Array.from({ length: 84 }, (_, index) => {
  const seed = PLACE_SEEDS[index % PLACE_SEEDS.length];
  const round = Math.floor(index / PLACE_SEEDS.length) + 1;

  return {
    id: `place_${String(index + 1).padStart(3, "0")}`,
    name: round === 1 ? seed.name : `${seed.name} ${round}호점`,
    address: seed.address,
    // 카테고리 미분류 건이 섞여야 null 처리를 확인할 수 있습니다.
    category: index % 17 === 0 ? null : seed.category,
    tpiScore:
      index % 7 === 0 ? null : Number((0.4 + (index % 60) / 100).toFixed(2)),
    isActive: index % 9 !== 0,
    latitude: Number((35.0 + (index % 40) / 100).toFixed(6)),
    longitude: Number((128.9 + (index % 50) / 100).toFixed(6)),
  };
});

export const mockGetAdminPlaces = async (
  query: AdminPlacesQuery,
): Promise<PaginatedResponse<AdminPlace>> => {
  await delay();

  const filtered = places.filter((place) => {
    if (
      query.q &&
      !includes(place.name, query.q) &&
      !includes(place.address, query.q)
    ) {
      return false;
    }
    if (query.category && place.category !== query.category) return false;
    if (query.isActive !== undefined && place.isActive !== query.isActive) {
      return false;
    }

    return true;
  });

  return paginate(filtered, query.page, query.size);
};

export const mockPatchAdminPlaceActive = async (
  placeId: string,
  isActive: boolean,
): Promise<AdminPlace> => {
  await delay(200);

  const place = places.find((row) => row.id === placeId);

  if (!place) throw new Error("존재하지 않는 장소입니다.");

  place.isActive = isActive;

  return { ...place };
};

/* ── 마스터 추천 코스 ───────────────────────────────────── */

export const ROUTE_THEMES = [
  { value: "local-food", label: "부산 로컬 맛집" },
  { value: "nature-walk", label: "바다·자연 산책" },
  { value: "culture-art", label: "문화·예술" },
  { value: "market-tour", label: "전통시장 투어" },
  { value: "night-view", label: "야경 명소" },
  { value: "cafe-hopping", label: "카페 호핑" },
];

const routes: AdminRoute[] = Array.from({ length: 42 }, (_, index) => {
  const theme = ROUTE_THEMES[index % ROUTE_THEMES.length];
  const createdAt = new Date(2026, 5, 1);
  createdAt.setDate(createdAt.getDate() + index * 3);

  return {
    id: `route-${String(index + 1).padStart(3, "0")}`,
    name: `${theme.label} 코스 ${Math.floor(index / ROUTE_THEMES.length) + 1}`,
    theme: theme.value,
    themeLabel: theme.label,
    stopCount: 3 + (index % 4),
    totalDistanceKm: Number((2 + (index % 9) * 0.7).toFixed(1)),
    // 미게시 코스가 섞여야 관리자 목록의 의미가 있습니다.
    isPublished: index % 5 !== 0,
    createdAt: createdAt.toISOString(),
  };
});

export const mockGetAdminRoutes = async (
  query: AdminRoutesQuery,
): Promise<PaginatedResponse<AdminRoute>> => {
  await delay();

  const filtered = routes.filter((route) => {
    if (query.q && !includes(route.name, query.q)) return false;
    if (query.theme && route.theme !== query.theme) return false;
    if (
      query.isPublished !== undefined &&
      route.isPublished !== query.isPublished
    ) {
      return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return paginate(sorted, query.page, query.size);
};

export const mockPatchAdminRoutePublished = async (
  routeId: string,
  isPublished: boolean,
): Promise<AdminRoute> => {
  await delay(200);

  const route = routes.find((row) => row.id === routeId);

  if (!route) throw new Error("존재하지 않는 코스입니다.");

  route.isPublished = isPublished;

  return { ...route };
};

/* ── 대시보드 ───────────────────────────────────────────── */

export const mockGetAdminStatsOverview =
  async (): Promise<AdminStatsOverview> => {
    await delay();

    return {
      totalUserCount: users.length,
      totalSavedRouteCount: 3891,
      totalSavingsWon: 52_340_000,
      averageLocalContributionScore: 72.4,
    };
  };

export const mockGetAdminSavingsBreakdown =
  async (): Promise<AdminSavingsBreakdown> => {
    await delay();

    return {
      byCategory: [
        {
          category: "FOOD",
          label: "식당·카페",
          amountWon: 12_000_000,
          ratio: 0.42,
        },
        {
          category: "TRANSPORT",
          label: "교통비",
          amountWon: 8_000_000,
          ratio: 0.28,
        },
        {
          category: "ACTIVITY",
          label: "체험비",
          amountWon: 8_600_000,
          ratio: 0.3,
        },
      ],
      byMarketType: [
        {
          type: "MARKET",
          label: "전통시장",
          amountWon: 15_000_000,
          ratio: 0.55,
        },
        {
          type: "LOCAL",
          label: "로컬 상권",
          amountWon: 12_300_000,
          ratio: 0.45,
        },
      ],
    };
  };

/* ── KTO 공공데이터 배치 ────────────────────────────────── */

/** 쿨타임은 서버가 관리하기로 한 값이라, 목에서도 서버처럼 여기서 들고 있습니다. */
const COOLDOWN_MS = 10 * 60 * 1000;
const COLLECT_DURATION_MS = 6000;

const ktoState = {
  dailyLimit: 1000,
  usedCount: 150,
  lastCollectedAt: new Date(2026, 7, 16, 4, 0, 0).toISOString() as
    string | null,
  lastCollectStatus: "SUCCESS" as AdminKtoStatus["lastCollectStatus"],
  collectingUntil: 0,
  cooldownUntil: 0,
};

export const mockGetAdminKtoStatus = async (): Promise<AdminKtoStatus> => {
  await delay(180);

  const now = Date.now();
  const isCollecting = now < ktoState.collectingUntil;

  // 수집이 끝나는 시점에 사용량과 마지막 수집 기록을 갱신합니다.
  if (!isCollecting && ktoState.collectingUntil !== 0) {
    ktoState.collectingUntil = 0;
    ktoState.usedCount = Math.min(ktoState.usedCount + 40, ktoState.dailyLimit);
    ktoState.lastCollectedAt = new Date().toISOString();
    ktoState.lastCollectStatus = "SUCCESS";
  }

  return {
    dailyLimit: ktoState.dailyLimit,
    usedCount: ktoState.usedCount,
    remainingCount: ktoState.dailyLimit - ktoState.usedCount,
    lastCollectedAt: ktoState.lastCollectedAt,
    lastCollectStatus: ktoState.lastCollectStatus,
    isCollecting,
    cooldownUntil:
      ktoState.cooldownUntil > now
        ? new Date(ktoState.cooldownUntil).toISOString()
        : null,
  };
};

export const mockPostAdminKtoCollect =
  async (): Promise<AdminKtoCollectResponse> => {
    await delay(200);

    const now = Date.now();

    if (now < ktoState.collectingUntil) {
      throw new Error("이미 수집이 진행 중입니다.");
    }
    if (now < ktoState.cooldownUntil) {
      throw new Error("쿨타임이 끝난 뒤에 다시 시도해 주세요.");
    }
    if (ktoState.dailyLimit - ktoState.usedCount <= 0) {
      throw new Error("오늘 사용 가능한 쿼터를 모두 사용했습니다.");
    }

    ktoState.collectingUntil = now + COLLECT_DURATION_MS;
    ktoState.cooldownUntil = now + COOLDOWN_MS;

    return {
      accepted: true,
      cooldownUntil: new Date(ktoState.cooldownUntil).toISOString(),
    };
  };
