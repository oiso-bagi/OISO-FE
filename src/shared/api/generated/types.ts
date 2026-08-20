/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RouteStopLocationDto {
  /**
   * 경유지 순서 (0부터 시작)
   * @example 0
   */
  sequence: number;
  /**
   * 일차 번호 (1일차, 2일차...)
   * @example 1
   */
  dayNumber: number;
  /**
   * 장소 이름
   * @example "광안리해수욕장"
   */
  placeName: string;
  /**
   * 장소 위도
   * @example 35.1532
   */
  latitude: number | null;
  /**
   * 장소 경도
   * @example 129.1187
   */
  longitude: number | null;
}

export interface RecommendedRouteListResponseDto {
  /**
   * 추천 루트 ID
   * @example "route_001"
   */
  id: string;
  /**
   * 추천 루트 이름
   * @example "부산 바다 감성 코스"
   */
  name: string;
  /**
   * 경유지 수
   * @example 4
   */
  stopCount: number;
  /**
   * 총 이동 거리(m)
   * @example 8500
   */
  totalDistanceMeters: number;
  /**
   * 총 이동 거리(km)
   * @example 8.5
   */
  totalDistanceKm: number;
  /**
   * 루트에서 사용하는 이동 수단 목록
   * @example ["WALKING","BUS"]
   */
  transitTypes: (
    | "WALKING"
    | "BUS"
    | "SUBWAY"
    | "DRIVING"
    | "TAXI"
    | "BIKING"
  )[];
  /**
   * 예상 총 비용(원)
   * @example 42000
   */
  totalCost: number;
  /**
   * 예상 총 소요 시간(분)
   * @example 180
   */
  totalTimeMinutes: number;
  /**
   * 예상 혼잡도
   * @example "MEDIUM"
   */
  congestionLevel: "LOW" | "MEDIUM" | "HIGH";
  /**
   * 예상 절약 금액(원)
   * @example 15000
   */
  estimatedSavingsWon: number;
  /**
   * 추천 점수
   * @example 87.5
   */
  score: number;
  /**
   * 추천 루트 여부
   * @example true
   */
  isRecommended: boolean;
  /** 루트 경유지 위치 목록 */
  stopLocations: RouteStopLocationDto[];
}

export interface MetaCostDto {
  /**
   * 대중교통/이동 비용(원)
   * @example 2500
   */
  transportCost: number;
  /**
   * 장소 예상 지출 비용(원)
   * @example 39500
   */
  placeCost: number;
}

export interface MetaTimeDto {
  /**
   * 순수 이동 시간(분)
   * @example 45
   */
  pureTravelTime: number;
  /**
   * 장소 체류 시간(분)
   * @example 135
   */
  stayTime: number;
}

export interface RouteStopResponseDto {
  /**
   * 경유지 순서 (0부터 시작)
   * @example 0
   */
  sequence: number;
  /**
   * 여행 일차 번호
   * @example 1
   */
  dayNumber: number;
  /**
   * 장소 이름
   * @example "광안리해수욕장"
   */
  placeName: string;
  /**
   * 장소 카테고리 (FOOD: 식당 | CAFE: 카페 | MARKET: 전통시장 | CULTURE: 문화 | NATURE: 자연 | EXPERIENCE: 체험 | VIEWPOINT: 전망대 | ETC: 기타)
   * @example "NATURE"
   */
  category:
    | "MARKET"
    | "CAFE"
    | "FOOD"
    | "CULTURE"
    | "NATURE"
    | "EXPERIENCE"
    | "VIEWPOINT"
    | "ETC"
    | null;
  /**
   * 장소 영업 시작 시간
   * @example "09:00"
   */
  openTime: string | null;
  /**
   * 장소 영업 종료 시간
   * @example "21:00"
   */
  closeTime: string | null;
  /**
   * 장소 위도
   * @example 35.1532
   */
  latitude: number | null;
  /**
   * 장소 경도
   * @example 129.1187
   */
  longitude: number | null;
  /**
   * 다음 경유지까지 이동 수단
   * @example "BUS"
   */
  nextTransportType:
    | "WALKING"
    | "BUS"
    | "SUBWAY"
    | "DRIVING"
    | "TAXI"
    | "BIKING"
    | null;
  /**
   * 다음 경유지까지 예상 이동 시간(분)
   * @example 15
   */
  nextTravelTimeMinutes: number | null;
}

export interface RecommendedRouteDetailResponseDto {
  /**
   * 추천 루트 ID
   * @example "route_001"
   */
  routeId: string;
  /**
   * 추천 루트 이름
   * @example "부산 바다 감성 코스"
   */
  routeName: string;
  /**
   * 경유지 수
   * @example 4
   */
  stopCount: number;
  /**
   * 총 이동 거리(km)
   * @example 8.5
   */
  totalDistanceKm: number;
  /**
   * 대표 이동 수단
   * @example "WALKING + BUS"
   */
  transportType: string;
  /**
   * 예상 혼잡도
   * @example "MEDIUM"
   */
  congestionLevel: "LOW" | "MEDIUM" | "HIGH";
  /**
   * 절약 금액(원) — savedCost 호환 필드 (estimatedSavingsWon과 동일한 값)
   * @example 15000
   */
  savedCost: number;
  /**
   * 예상 절약 금액(원)
   * @example 15000
   */
  estimatedSavingsWon: number;
  /**
   * 추천 점수
   * @example 87.5
   */
  recommendScore: number;
  /**
   * 추천 루트 여부
   * @example true
   */
  isRecommended: boolean;
  /**
   * 사용자 저장 여부
   * @example false
   */
  isSaved: boolean;
  /**
   * 예상 총 비용(원)
   * @example 42000
   */
  totalCost: number;
  /**
   * 예상 총 소요 시간(분)
   * @example 180
   */
  totalTimeMinutes: number;
  /**
   * 예상 총 소요 시간 표시값
   * @example "3h 0m"
   */
  totalTimeDisplay: string;
  /** 비용 메타 정보 */
  metaCost: MetaCostDto;
  /** 시간 메타 정보 */
  metaTime: MetaTimeDto;
  /** 경유지 상세 목록 */
  stops: RouteStopResponseDto[];
}

export interface SavedRouteItemDto {
  /**
   * 저장 루트 ID
   * @example "route_001"
   */
  routeId: string;
  /**
   * 저장 루트 이름
   * @example "부산 바다 감성 코스"
   */
  routeName: string;
  /**
   * 저장 일시
   * @format date-time
   * @example "2026-08-01T00:00:00.000Z"
   */
  savedAt: string;
  /**
   * 여행 완료 여부
   * @example false
   */
  isCompleted: boolean;
  /**
   * 경유지 수
   * @example 4
   */
  stopCount: number;
  /**
   * 총 이동 거리(km)
   * @example 8.5
   */
  totalDistanceKm: number;
  /**
   * 루트에서 사용하는 이동 수단 목록
   * @example ["WALKING","BUS"]
   */
  transitTypes: (
    | "WALKING"
    | "BUS"
    | "SUBWAY"
    | "DRIVING"
    | "TAXI"
    | "BIKING"
  )[];
  /**
   * 예상 총 비용(원)
   * @example 42000
   */
  totalCost: number;
  /**
   * 예상 총 소요 시간(분)
   * @example 180
   */
  totalTimeMinutes: number;
  /**
   * 예상 절약 금액(원)
   * @example 15000
   */
  estimatedSavingsWon: number;
}

export interface SavedRouteListResponseDto {
  /**
   * 저장 루트 개수
   * @example 3
   */
  savedRouteCount: number;
  /**
   * 총 예상 절약 금액(원)
   * @example 45000
   */
  totalSavedSavingsWon: number;
  /** 저장 루트 목록 */
  savedRoutes: SavedRouteItemDto[];
}

export interface CreateSavedRouteDto {
  /**
   * 보관함에 저장할 추천/마스터 루트 ID
   * @example "clx1234567890abcdef"
   */
  routeId: string;
}

export interface ToggleSavedRouteCompletionDto {
  /**
   * 여행 완료 여부 (true: 여행 완료 ON, false: 미완료 OFF)
   * @example true
   */
  isCompleted: boolean;
  /**
   * 유저가 해당 여행에서 실제 지출한 총 금액 (원화)
   * @example 45000
   */
  actualCostWon?: number;
}

export interface SavedRouteCompletionResponseDto {
  /**
   * 보관 처리된 경로 ID
   * @example "route_001"
   */
  routeId: string;
  /**
   * 여행 완료 여부 (ON/OFF)
   * @example true
   */
  isCompleted: boolean;
  /**
   * 실제 지출 금액 (원화)
   * @example 45000
   */
  actualCostWon: number | null;
}

export interface SavedRouteStopDetailDto {
  /**
   * 경유지 순서 (0부터 시작)
   * @example 0
   */
  sequence: number;
  /**
   * 여행 일차 번호
   * @example 1
   */
  dayNumber: number;
  /**
   * 장소 이름
   * @example "광안리해수욕장"
   */
  placeName: string;
  /**
   * 장소 카테고리 (FOOD: 식당 | CAFE: 카페 | MARKET: 전통시장 | CULTURE: 문화 | NATURE: 자연 | EXPERIENCE: 체험 | VIEWPOINT: 전망대 | ETC: 기타)
   * @example "NATURE"
   */
  category:
    | "MARKET"
    | "CAFE"
    | "FOOD"
    | "CULTURE"
    | "NATURE"
    | "EXPERIENCE"
    | "VIEWPOINT"
    | "ETC"
    | null;
  /**
   * 장소 영업 시작 시간
   * @example "09:00"
   */
  openTime: string | null;
  /**
   * 장소 영업 종료 시간
   * @example "21:00"
   */
  closeTime: string | null;
  /**
   * 다음 경유지까지 이동 수단
   * @example "BUS"
   */
  nextTransportType:
    | "WALKING"
    | "BUS"
    | "SUBWAY"
    | "DRIVING"
    | "TAXI"
    | "BIKING"
    | null;
  /**
   * 다음 경유지까지 예상 이동 시간(분)
   * @example 15
   */
  nextTravelTimeMinutes: number | null;
  /**
   * 장소 위도
   * @example 35.1532
   */
  latitude: number | null;
  /**
   * 장소 경도
   * @example 129.1187
   */
  longitude: number | null;
}

export interface SavedRouteDetailResponseDto {
  /**
   * 저장 루트 ID
   * @example "route_001"
   */
  routeId: string;
  /**
   * 저장 루트 이름
   * @example "부산 바다 감성 코스"
   */
  routeName: string;
  /**
   * 저장 일시
   * @format date-time
   * @example "2026-08-01T00:00:00.000Z"
   */
  savedAt: string;
  /**
   * 여행 완료 여부
   * @example false
   */
  isCompleted: boolean;
  /**
   * 경유지 수
   * @example 4
   */
  stopCount: number;
  /**
   * 총 이동 거리(km)
   * @example 8.5
   */
  totalDistanceKm: number;
  /**
   * 대표 이동 수단
   * @example "WALKING + BUS"
   */
  transportType: string;
  /**
   * 예상 혼잡도
   * @example "MEDIUM"
   */
  congestionLevel: "LOW" | "MEDIUM" | "HIGH";
  /**
   * 절약 금액(원) — savedCost 호환 필드 (estimatedSavingsWon과 동일한 값)
   * @example 15000
   */
  savedCost: number;
  /**
   * 추천 점수
   * @example 87.5
   */
  recommendScore: number;
  /**
   * 추천 루트 여부
   * @example true
   */
  isRecommended: boolean;
  /**
   * 사용자 저장 여부
   * @example true
   */
  isSaved: boolean;
  /**
   * 예상 총 비용(원)
   * @example 42000
   */
  totalCost: number;
  /**
   * 예상 총 소요 시간(분)
   * @example 180
   */
  totalTimeMinutes: number;
  /**
   * 예상 총 소요 시간 표시값
   * @example "3h 0m"
   */
  totalTimeDisplay: string;
  /** 비용 메타 정보 */
  metaCost: MetaCostDto;
  /** 시간 메타 정보 */
  metaTime: MetaTimeDto;
  /**
   * 예상 절약 금액(원)
   * @example 15000
   */
  estimatedSavingsWon: number;
  /** 저장 루트 경유지 상세 목록 */
  stops: SavedRouteStopDetailDto[];
}

export interface CurrentUserResponseDto {
  /**
   * 사용자 ID
   * @example "cm1234567890"
   */
  id: string;
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email: string;
  /**
   * 사용자 닉네임
   * @example "오이소"
   */
  nickname: string;
  /**
   * 가입 또는 로그인에 사용한 OAuth 제공자
   * @example "LOCAL"
   */
  provider: string;
  /**
   * User role
   * @example "USER"
   */
  role: "USER" | "ADMIN";
}

export interface AuthTokenResponseDto {
  /**
   * 재발급된 액세스 토큰
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  accessToken: string;
  /**
   * 토큰 타입
   * @example "Bearer"
   */
  tokenType: string;
}

export interface AuthSessionResponseDto {
  /**
   * 현재 요청에 유효한 인증 세션이 있는지 여부
   * @example true
   */
  authenticated: boolean;
}

export interface ConsentItemResponse {
  /**
   * 약관 유형
   * @example "TERMS"
   */
  type: "TERMS" | "PRIVACY" | "AGE" | "MARKETING" | "LOCATION";
  /**
   * 필수/선택 약관 구분
   * @example "REQUIRED"
   */
  scope: "REQUIRED" | "OPTIONAL";
  /**
   * 해당 약관 동의 여부
   * @example true
   */
  isAgreed: boolean;
  /**
   * 동의한 약관 문서 버전
   * @example "v1.0.0"
   */
  version: string;
  /**
   * 동의 일시
   * @format date-time
   * @example "2026-08-01T00:00:00.000Z"
   */
  agreedAt: string;
  /**
   * 철회 일시. 동의 상태이면 null입니다.
   * @example null
   */
  revokedAt: object | null;
}

export interface ConsentStatusResponseDto {
  /**
   * 필수 약관(이용약관/개인정보/만 14세) 동의 완료 여부
   * @example true
   */
  hasCompletedRequiredConsents: boolean;
  /** 유저의 약관별 동의 이력 목록 */
  consents: ConsentItemResponse[];
}

export interface SubmitConsentRequestDto {
  /**
   * 동의 대상 약관 문서 버전
   * @example "v1.0.0"
   */
  version: string;
  /**
   * 이용약관 동의 여부. 필수 약관이므로 true여야 합니다.
   * @example true
   */
  terms: boolean;
  /**
   * 개인정보 수집·이용 동의 여부. 필수 약관이므로 true여야 합니다.
   * @example true
   */
  privacy: boolean;
  /**
   * 만 14세 이상 확인 동의 여부. 필수 약관이므로 true여야 합니다.
   * @example true
   */
  age: boolean;
  /**
   * 마케팅 정보 수신 동의 여부. 선택 약관입니다.
   * @example false
   */
  marketing: boolean;
  /**
   * 위치기반 서비스 이용약관 동의 여부. 선택 약관입니다.
   * @example false
   */
  location: boolean;
}

export interface TravelStyleOptionDto {
  /**
   * 여행 스타일 슬러그 식별자
   * @example "local-food"
   */
  slug: string;
  /**
   * 여행 스타일 한국어 라벨
   * @example "부산 로컬 맛집"
   */
  label: string;
}

export interface BudgetPresetDto {
  /**
   * 예산 구간 표기 라벨
   * @example "~3만원 · 가성비"
   */
  label: string;
  /**
   * 금액(원)
   * @example 30000
   */
  amountWon: number;
}

export interface BudgetAllocationRuleDto {
  /**
   * 예산 항목 구분 (transport | food | activity)
   * @example "transport"
   */
  type: "transport" | "food" | "activity";
  /**
   * 예산 항목 한국어 라벨
   * @example "교통비"
   */
  label: string;
  /**
   * 배분 비율(%)
   * @example 40
   */
  percentage: number;
}

export interface BudgetAllocationOptionsDto {
  /**
   * 기본 1일 예산(원)
   * @example 60000
   */
  defaultDailyBudgetWon: number;
  /**
   * 예산 항목별 배분 규칙 목록
   * @example [{"type":"transport","label":"교통비","percentage":40},{"type":"food","label":"식비","percentage":35},{"type":"activity","label":"체험/입장료","percentage":25}]
   */
  rules: BudgetAllocationRuleDto[];
}

export interface RecommendationOptionsResponseDto {
  /**
   * 선택 가능한 여행 스타일 목록 (6대 테마 전체)
   * @example [{"slug":"local-food","label":"부산 로컬 맛집"},{"slug":"emotion-cafe","label":"감성 카페"},{"slug":"beach-tour","label":"바다 관광"},{"slug":"photo-spot","label":"포토 스팟"},{"slug":"traditional-market","label":"전통시장"},{"slug":"nature-walk","label":"자연 / 산책"}]
   */
  travelStyles: TravelStyleOptionDto[];
  /**
   * 선택 가능한 여행 기간(일) 목록
   * @example [1,2,3,4,5]
   */
  durationDays: number[];
  /**
   * 예산 프리셋 목록
   * @example [{"label":"~3만원 · 가성비","amountWon":30000},{"label":"3~6만원 · 적당","amountWon":60000},{"label":"6만원 이상 · 자유","amountWon":90000}]
   */
  budgetPresets: BudgetPresetDto[];
  /** 기본 예산 및 항목별 예산 배분 옵션 */
  budgetAllocation: BudgetAllocationOptionsDto;
}

export interface BudgetRatiosDto {
  /**
   * 식비 비율 (0 ~ 1). 미입력 시 기본값 0.35 적용
   * @example 0.35
   */
  foodRatio?: number;
  /**
   * 체험/입장료 비율 (0 ~ 1). 미입력 시 기본값 0.25 적용
   * @example 0.25
   */
  experienceRatio?: number;
  /**
   * 교통비 비율 (0 ~ 1). 미입력 시 기본값 0.40 적용
   * @example 0.4
   */
  transportRatio?: number;
}

export interface RecommendRouteRequestDto {
  /**
   * 추천에 사용할 여행 스타일 slug 목록 (1개 이상 선택 가능: local-food: 부산 로컬 맛집 | emotion-cafe: 감성 카페 | beach-tour: 바다 관광 | photo-spot: 포토 스팟 | traditional-market: 전통시장 | nature-walk: 자연 / 산책)
   * @example ["local-food","emotion-cafe"]
   */
  travelStyleSlugs: string[][];
  /**
   * 여행 기간(일). 1부터 5까지 허용됩니다.
   * @example 2
   */
  durationDays: number;
  /**
   * 1일 예산(원). 안전한 양의 정수여야 합니다.
   * @example 60000
   */
  dailyBudgetWon: number;
  /**
   * 예산 비율 배분 (선택). foodRatio + experienceRatio + transportRatio 합계가 1.0이어야 합니다. 미입력 시 기본값 { food: 0.35, experience: 0.25, transport: 0.40 } 적용.
   * @example {"foodRatio":0.35,"experienceRatio":0.25,"transportRatio":0.4}
   */
  ratios?: BudgetRatiosDto;
}

export interface SavingsCategoryDto {
  /**
   * 절약 카테고리 라벨
   * @example "식비"
   */
  label: string;
  /**
   * 카테고리별 절약 금액(원)
   * @example 12000
   */
  amountWon: number;
}

export interface LocalContributionDto {
  /**
   * 지역 기여 점수(0~100)
   * @example 72
   */
  scorePercent: number;
  /**
   * 지역 기여 라벨
   * @example "환경·지역 상생 방문"
   */
  label: string;
  /**
   * 지역 기여 안내 문구
   * @example "관광 소비 분산에 기여하고 있어요."
   */
  message: string;
}

export interface SavingsHistoryDto {
  /**
   * 여행 루트 ID
   * @example "route_001"
   */
  routeId: string;
  /**
   * 여행 루트 이름
   * @example "부산 바다 감성 코스"
   */
  routeName: string;
  /**
   * 여행 시작 일시
   * @format date-time
   * @example "2026-07-31T03:00:00.000Z"
   */
  trippedAt: string;
  /**
   * 해당 여행에서 절약한 금액(원)
   * @example 15000
   */
  savedAmountWon: number;
}

export interface SavingsDashboardResponseDto {
  /**
   * 총 절약 금액(원)
   * @example 48000
   */
  totalSavingsWon: number;
  /**
   * 완료한 여행 수
   * @example 3
   */
  tripCount: number;
  /**
   * 여행당 평균 절약 금액(원)
   * @example 16000
   */
  averageSavingsWon: number;
  /** 카테고리별 절약 금액 목록 */
  savingsByCategory: SavingsCategoryDto[];
  /** 지역 기여 정보 */
  localContribution: LocalContributionDto;
  /** 최근 완료 여행 절약 내역 */
  histories: SavingsHistoryDto[];
}

export interface SavedRouteSummaryItemDto {
  /**
   * 사용자 ID와 루트 ID를 조합한 저장 루트 요약 ID
   * @example "user-1_route-101"
   */
  id: string;
  /**
   * 저장된 루트 ID
   * @example "route-101"
   */
  routeId: string;
  /**
   * 저장된 루트 이름
   * @example "부산 해안 산책 코스"
   */
  name: string;
  /**
   * 루트 저장 일시
   * @format date-time
   * @example "2026-07-30T10:00:00.000Z"
   */
  savedAt: string;
  /**
   * 해당 루트의 예상 절약 금액(원)
   * @example 15000
   */
  savingsWon: number;
  /**
   * 총 이동 거리(km)
   * @example 8.5
   */
  totalDistanceKm: number;
}

export interface HomeSummaryResponseDto {
  /**
   * 저장 루트의 총 예상 절약 금액(원)
   * @example 35000
   */
  totalSavedSavingsWon: number;
  /**
   * 저장 루트 개수
   * @example 2
   */
  totalSavedCount: number;
  /** 최근 저장 루트 요약 목록 */
  savedRoutes: SavedRouteSummaryItemDto[];
}

export interface AdminRouteListItemDto {
  /**
   * 코스 ID
   * @example "route-03b77f38aa146d15"
   */
  id: string;
  /**
   * 코스명
   * @example "부산 로컬 맛집 릴레이 코스"
   */
  name: string;
  /**
   * 대표 테마 슬러그
   * @example "local-food"
   */
  theme: string;
  /**
   * 대표 테마 한글 라벨
   * @example "부산 로컬 맛집"
   */
  themeLabel: string;
  /**
   * 경유 장소 수
   * @example 4
   */
  stopCount: number;
  /**
   * 총 이동 거리 (km)
   * @example 3.4
   */
  totalDistanceKm: number;
  /**
   * 게시 여부
   * @example true
   */
  isPublished: boolean;
  /**
   * 생성 일시
   * @format date-time
   * @example "2026-08-01T00:00:00.000Z"
   */
  createdAt: string;
}

export interface AdminRoutePageResponseDto {
  /** 추천 코스 목록 데이터 아이템 */
  items: AdminRouteListItemDto[];
  /**
   * 현재 페이지 (1부터 시작)
   * @example 1
   */
  page: number;
  /**
   * 페이지당 항목 수
   * @example 20
   */
  size: number;
  /**
   * 전체 데이터 건수
   * @example 137
   */
  totalCount: number;
  /**
   * 전체 페이지 수
   * @example 7
   */
  totalPages: number;
}

export interface AdminToggleRoutePublishedDto {
  /**
   * 게시 상태 여부
   * @example true
   */
  isPublished: boolean;
}

export interface AdminPlaceListItemDto {
  /**
   * 장소 ID
   * @example "place_001"
   */
  id: string;
  /**
   * 장소명
   * @example "가야포차선지국"
   */
  name: string;
  /**
   * 주소
   * @example "부산광역시 부산진구 ..."
   */
  address: string;
  /**
   * 카테고리
   * @example "FOOD"
   */
  category: object | null;
  /**
   * TPI 지수
   * @example 0.82
   */
  tpiScore: object | null;
  /**
   * 활성화 상태 (Soft Delete 여부)
   * @example true
   */
  isActive: boolean;
  /**
   * 위도
   * @example 35.3223258
   */
  latitude: number;
  /**
   * 경도
   * @example 129.1788934
   */
  longitude: number;
}

export interface AdminPlacePageResponseDto {
  /** 장소 목록 데이터 아이템 */
  items: AdminPlaceListItemDto[];
  /**
   * 현재 페이지 (1부터 시작)
   * @example 1
   */
  page: number;
  /**
   * 페이지당 항목 수
   * @example 20
   */
  size: number;
  /**
   * 전체 데이터 건수
   * @example 137
   */
  totalCount: number;
  /**
   * 전체 페이지 수
   * @example 7
   */
  totalPages: number;
}

export interface AdminTogglePlaceActiveDto {
  /**
   * 활성화 상태 여부 (Soft Delete)
   * @example true
   */
  isActive: boolean;
}

export interface AdminRouteStopInputDto {
  /**
   * 장소 ID
   * @example "place_001"
   */
  placeId: string;
  /**
   * 코스 내 경유 순서 (0부터 시작하는 연속 정수)
   * @example 0
   */
  sequence: number;
  /**
   * 장소 체류 시간 (분)
   * @default 60
   * @example 60
   */
  stayTimeMinutes?: number;
  /**
   * 다음 장소까지 이동 소요 시간 (분)
   * @example 20
   */
  nextTravelTimeMinutes?: number;
  /**
   * 다음 장소까지 이동 수단 (WALKING, BUS, SUBWAY, TAXI, CAR 등)
   * @example "WALKING"
   */
  nextTransportType?:
    | "WALKING"
    | "BUS"
    | "SUBWAY"
    | "DRIVING"
    | "TAXI"
    | "BIKING";
}

export interface CreateAdminRouteDto {
  /**
   * 마스터 추천 코스명
   * @example "부산 감성 카페 & 야경 코스"
   */
  name: string;
  /**
   * 코스 상세 설명
   * @example "광안리와 해운대의 밤바다를 즐기는 로미오 코스"
   */
  description?: string;
  /**
   * 대표 테마 슬러그 (local-food: 부산 로컬 맛집 | emotion-cafe: 감성 카페 | beach-tour: 바다 관광 | photo-spot: 포토 스팟 | traditional-market: 전통시장 | nature-walk: 자연 / 산책)
   * @example "emotion-cafe"
   */
  themeSlug: string;
  /**
   * 게시 여부
   * @default true
   * @example true
   */
  isPublished?: boolean;
  /**
   * 경유 장소 목록 (sequence는 0부터 시작하는 연속 정수)
   * @example [{"placeId":"place_001","sequence":0,"stayTimeMinutes":60,"nextTravelTimeMinutes":20,"nextTransportType":"WALKING"},{"placeId":"place_002","sequence":1,"stayTimeMinutes":45}]
   */
  stops: AdminRouteStopInputDto[];
}

export interface AdminRouteDetailStopDto {
  /**
   * 경유지 순서 (0부터 시작)
   * @example 0
   */
  sequence: number;
  /**
   * 여행 일차
   * @example 1
   */
  dayNumber: number;
  /**
   * 장소 ID
   * @example "place_001"
   */
  placeId: string;
  /**
   * 장소명
   * @example "가야포차선지국"
   */
  placeName: string;
  /**
   * 주소
   * @example "부산진구 ..."
   */
  address: string;
  /**
   * 카테고리
   * @example "FOOD"
   */
  category: object | null;
  /**
   * 체류 시간 (분)
   * @example 60
   */
  stayTimeMinutes: number;
  /**
   * 다음 이동 시간 (분)
   * @example 20
   */
  nextTravelTimeMinutes: object | null;
  /**
   * 다음 이동 수단
   * @example "WALKING"
   */
  nextTransportType:
    | "WALKING"
    | "BUS"
    | "SUBWAY"
    | "DRIVING"
    | "TAXI"
    | "BIKING"
    | null;
  /**
   * 위도
   * @example 35.1532
   */
  latitude: number;
  /**
   * 경도
   * @example 129.1187
   */
  longitude: number;
}

export interface AdminRouteDetailResponseDto {
  /**
   * 코스 ID
   * @example "route-03b77f38aa146d15"
   */
  id: string;
  /**
   * 코스명
   * @example "부산 감성 카페 & 야경 코스"
   */
  name: string;
  /**
   * 코스 설명
   * @example "광안리와 해운대의 밤바다를 즐기는 코스"
   */
  description: object | null;
  /**
   * 대표 테마 슬러그
   * @example "emotion-cafe"
   */
  themeSlug: string;
  /**
   * 대표 테마 한글 라벨
   * @example "감성 카페"
   */
  themeLabel: string;
  /**
   * 전체 소요 일수
   * @example 2
   */
  durationDays: number;
  /**
   * 총 경유 장소 수
   * @example 4
   */
  stopCount: number;
  /**
   * 총 이동 거리 (km)
   * @example 5.2
   */
  totalDistanceKm: number;
  /**
   * 게시 여부
   * @example true
   */
  isPublished: boolean;
  /**
   * 생성 일시
   * @format date-time
   * @example "2026-08-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 경유 장소 상세 목록
   * @example [{"sequence":0,"dayNumber":1,"placeId":"place_001","placeName":"가야포차선지국","address":"부산진구 가야대로","category":"FOOD","stayTimeMinutes":60,"nextTravelTimeMinutes":20,"nextTransportType":"WALKING","latitude":35.1532,"longitude":129.1187}]
   */
  stops: AdminRouteDetailStopDto[];
}

export interface UpdateAdminRouteDto {
  /**
   * 마스터 추천 코스명
   * @example "부산 감성 카페 & 야경 코스"
   */
  name: string;
  /**
   * 코스 상세 설명
   * @example "광안리와 해운대의 밤바다를 즐기는 로미오 코스"
   */
  description?: string;
  /**
   * 대표 테마 슬러그 (local-food: 부산 로컬 맛집 | emotion-cafe: 감성 카페 | beach-tour: 바다 관광 | photo-spot: 포토 스팟 | traditional-market: 전통시장 | nature-walk: 자연 / 산책)
   * @example "emotion-cafe"
   */
  themeSlug: string;
  /**
   * 게시 여부
   * @default true
   * @example true
   */
  isPublished?: boolean;
  /**
   * 경유 장소 목록 (sequence는 0부터 시작하는 연속 정수)
   * @example [{"placeId":"place_001","sequence":0,"stayTimeMinutes":60,"nextTravelTimeMinutes":20,"nextTransportType":"WALKING"},{"placeId":"place_002","sequence":1,"stayTimeMinutes":45}]
   */
  stops: AdminRouteStopInputDto[];
}

export interface AdminStatsOverviewResponseDto {
  /**
   * 총 가입 유저 수
   * @example 128
   */
  totalUserCount: number;
  /**
   * 누적 저장 루트 수
   * @example 342
   */
  totalSavedRouteCount: number;
  /**
   * 누적 절약 금액 합계 (원)
   * @example 4850000
   */
  totalSavingsCostWon: number;
  /**
   * 누적 로컬 기여 지수 평균 (0~100점)
   * @example 78.4
   */
  averageLocalContributionScore: number;
}

export interface AdminSavingsCategoryItemDto {
  /**
   * 장소 카테고리 코드
   * @example "MARKET"
   */
  category: string;
  /**
   * 카테고리 한글 라벨
   * @example "전통시장"
   */
  label: string;
  /**
   * 해당 카테고리 절약 금액 (원)
   * @example 1940000
   */
  amountWon: number;
  /**
   * 전체 대비 절약 금액 비율 (%)
   * @example 40
   */
  percentage: number;
}

export interface AdminSavingsBreakdownResponseDto {
  /**
   * 전체 절약 금액 합계 (원)
   * @example 4850000
   */
  totalSavingsCostWon: number;
  /**
   * 카테고리별 절약 지출 요약 목록 (내림차순 정렬)
   * @example [{"category":"MARKET","label":"전통시장","amountWon":1940000,"percentage":40},{"category":"FOOD","label":"식당 / 음식점","amountWon":1455000,"percentage":30},{"category":"CAFE","label":"감성 카페","amountWon":970000,"percentage":20},{"category":"LOCAL","label":"로컬 상권","amountWon":485000,"percentage":10}]
   */
  breakdown: AdminSavingsCategoryItemDto[];
}

export interface AdminKtoStatusResponseDto {
  /**
   * 오늘 KTO API 호출 사용량 (쿼터 1,000건 한도)
   * @example 142
   */
  dailyApiUsage: number;
  /**
   * 일일 최대 허용 쿼터 수
   * @example 1000
   */
  dailyQuotaLimit: number;
  /**
   * 마지막 수집 성공 일시
   * @example "2026-08-17T04:00:00.000Z"
   */
  lastCollectedAt: object | null;
  /**
   * 현재 수집 작업 상태 (IDLE | RUNNING)
   * @example "IDLE"
   */
  status: string;
  /**
   * 혼잡도 수집 대상 장소 수
   * @example 85
   */
  targetPlaceCount: number;
}

export interface AdminKtoCollectResponseDto {
  /**
   * 수동 수집 실행 결과 메시지
   * @example "KTO 경로 혼잡도 수동 수집이 성공적으로 완료되었습니다."
   */
  message: string;
  /**
   * 수집 실행 완료 일시
   * @format date-time
   * @example "2026-08-17T17:45:00.000Z"
   */
  collectedAt: string;
  /**
   * 갱신된 장소 건수
   * @example 85
   */
  updatedPlaceCount: number;
  /**
   * 갱신 실패한 장소 건수
   * @example 0
   */
  failureCount: number;
}

export interface AdminUserListItemDto {
  /**
   * 회원 ID
   * @example "cm1234567890"
   */
  id: string;
  /**
   * 회원 이메일
   * @example "user@example.com"
   */
  email: string;
  /**
   * 회원 닉네임
   * @example "oiso_user"
   */
  nickname: string;
  /**
   * OAuth 제공자
   * @example "google"
   */
  provider: string;
  /**
   * 회원 권한
   * @example "USER"
   */
  role: "USER" | "ADMIN";
  /**
   * 계정 활성 상태
   * @example true
   */
  isActive: boolean;
  /**
   * 계정 생성 일시
   * @format date-time
   * @example "2026-08-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 계정 수정 일시
   * @format date-time
   * @example "2026-08-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface AdminUserPageResponseDto {
  /** 회원 목록 데이터 */
  items: AdminUserListItemDto[];
  /**
   * 현재 페이지 (1부터 시작)
   * @example 1
   */
  page: number;
  /**
   * 페이지당 항목 수
   * @example 20
   */
  size: number;
  /**
   * 전체 데이터 건수
   * @example 137
   */
  totalCount: number;
  /**
   * 전체 페이지 수
   * @example 7
   */
  totalPages: number;
}

export interface AdminToggleUserActiveDto {
  /**
   * 변경할 계정 활성 상태
   * @example false
   */
  isActive: boolean;
}

export interface AdminUpdateUserRoleDto {
  /**
   * 변경할 회원 권한
   * @example "ADMIN"
   */
  role: "USER" | "ADMIN";
}

export interface CommonErrorResponse {
  /**
   * HTTP status code
   * @example 400
   */
  statusCode: number;
  /**
   * Error response timestamp
   * @format date-time
   * @example "2026-08-01T00:00:00.000Z"
   */
  timestamp: string;
  /**
   * Request path
   * @example "/api/v1/recommended-routes/%20"
   */
  path: string;
  /**
   * HTTP method
   * @example "GET"
   */
  method: string;
  /** Error message */
  message: string | string[];
  /**
   * HTTP error name
   * @example "Bad Request"
   */
  error: string;
}
