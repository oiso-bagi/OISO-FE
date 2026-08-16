/**
 * 관리자 화면이 그리는 데이터 형태.
 *
 * 이 이슈의 범위는 UI 까지입니다. 실제 API 연동은 별도 작업이라, 여기서는
 * 백엔드에 전달한 스펙 문서와 같은 형태로 타입만 정의해 두고 목 데이터로
 * 화면을 만듭니다. 연동할 때 이 타입을 그대로 쓰거나, Swagger 에 반영된 뒤
 * `shared/api/generated/types.ts` 의 생성 타입으로 옮기면 됩니다.
 */

/** 목록 공통 응답 */
export interface PaginatedResponse<T> {
  items: T[];
  /** 1부터 시작 */
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

/** 목록 API 공통 요청 파라미터 */
export interface PaginatedQuery {
  page: number;
  size: number;
  /** 검색어. 검색 대상은 엔드포인트별로 다릅니다. */
  q?: string;
}

/* ── 회원 ───────────────────────────────────────────────── */

export type UserRole = "USER" | "ADMIN";

export type AuthProvider = "KAKAO" | "GOOGLE";

export interface AdminUser {
  id: string;
  email: string;
  nickname: string;
  provider: AuthProvider;
  role: UserRole;
  isActive: boolean;
  profileImageUrl: string | null;
  createdAt: string;
}

export interface AdminUsersQuery extends PaginatedQuery {
  provider?: AuthProvider;
  isActive?: boolean;
  role?: UserRole;
}

/* ── 장소 ───────────────────────────────────────────────── */

export type PlaceCategory =
  | "MARKET"
  | "CAFE"
  | "FOOD"
  | "CULTURE"
  | "NATURE"
  | "EXPERIENCE"
  | "VIEWPOINT"
  | "ETC";

export interface AdminPlace {
  id: string;
  name: string;
  address: string;
  /** 기존 응답에서 nullable 이라 목록 표시 시 처리가 필요합니다. */
  category: PlaceCategory | null;
  /** TPI 프리미엄 지수. 산출 전이면 null */
  tpiScore: number | null;
  isActive: boolean;
  latitude: number;
  longitude: number;
}

export interface AdminPlacesQuery extends PaginatedQuery {
  category?: PlaceCategory;
  isActive?: boolean;
}

/* ── 마스터 추천 코스 ───────────────────────────────────── */

export interface AdminRoute {
  id: string;
  name: string;
  theme: string;
  themeLabel: string;
  stopCount: number;
  totalDistanceKm: number;
  isPublished: boolean;
  createdAt: string;
}

export interface AdminRoutesQuery extends PaginatedQuery {
  theme?: string;
  isPublished?: boolean;
}

/* ── 대시보드 ───────────────────────────────────────────── */

export interface AdminStatsOverview {
  totalUserCount: number;
  totalSavedRouteCount: number;
  totalSavingsWon: number;
  /** 로컬 기여 지수 평균 (%) */
  averageLocalContributionScore: number;
}

export interface SavingsCategoryBreakdown {
  category: string;
  label: string;
  amountWon: number;
  /** 서버에서 계산해 내려줍니다. 합이 1 */
  ratio: number;
}

export interface SavingsMarketBreakdown {
  type: string;
  label: string;
  amountWon: number;
  ratio: number;
}

export interface AdminSavingsBreakdown {
  byCategory: SavingsCategoryBreakdown[];
  byMarketType: SavingsMarketBreakdown[];
}

/* ── KTO 공공데이터 배치 ────────────────────────────────── */

export type KtoCollectStatus = "SUCCESS" | "FAILED";

export interface AdminKtoStatus {
  dailyLimit: number;
  usedCount: number;
  remainingCount: number;
  lastCollectedAt: string | null;
  lastCollectStatus: KtoCollectStatus | null;
  /** 현재 수집 진행 중 여부 */
  isCollecting: boolean;
  /** 쿨타임 종료 시각. 쿨타임이 없으면 null */
  cooldownUntil: string | null;
}

export interface AdminKtoCollectResponse {
  accepted: boolean;
  cooldownUntil: string | null;
}
