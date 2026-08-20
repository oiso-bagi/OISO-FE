/**
 * 관리자 화면이 그리는 데이터 형태.
 *
 * 서버 DTO와 화면에서 사용하기 좋은 형태가 다른 경우 API 경계에서 이 타입으로
 * 매핑합니다. 서버 계약 자체는 `shared/api/generated/types.ts`를 사용합니다.
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

export type AuthProvider = "LOCAL" | "KAKAO" | "GOOGLE";

export interface AdminUser {
  id: string;
  email: string;
  nickname: string;
  provider: AuthProvider;
  role: UserRole;
  isActive: boolean;
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

/** 기존 루트 API 의 `transitTypes` 와 같은 값입니다. */
export type TransportType =
  "WALKING" | "BUS" | "SUBWAY" | "DRIVING" | "TAXI" | "BIKING";

export interface AdminRouteStop {
  /** 전체 통산. 일차가 넘어가도 이어집니다. */
  sequence: number;
  dayNumber: number;
  placeId: string;
  /** 수정 화면에서 장소를 다시 조회하지 않도록 서버가 함께 내려줍니다. */
  placeName: string;
  address: string;
  /** 다음 경유지까지의 정보. 마지막 경유지는 모두 null 입니다. */
  nextTransportType: TransportType | null;
  nextTravelTimeMinutes: number | null;
  nextTravelCostWon: number | null;
}

/** 코스 상세. 수정 폼을 채우는 데 씁니다. */
export interface AdminRouteDetail {
  id: string;
  name: string;
  theme: string;
  description: string;
  isPublished: boolean;
  stops: AdminRouteStop[];
}

/** 코스 등록·수정 요청 본문 */
export interface AdminRoutePayload {
  name: string;
  theme: string;
  description: string;
  isPublished: boolean;
  stops: AdminRouteStop[];
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
  /** 서버의 percentage(0~100)를 API 경계에서 0~1로 변환합니다. */
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
