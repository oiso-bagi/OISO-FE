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
   * 경유지 순서
   * @example 1
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
   * 경유지 순서
   * @example 1
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
   * 장소 카테고리
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
   * 경유지 순서
   * @example 1
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
   * 장소 카테고리
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
   * @example "kakao"
   */
  provider: string;
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
   * 선택 가능한 여행 스타일 목록
   * @example [{"slug":"local-food","label":"부산 로컬 맛집"},{"slug":"emotion-cafe","label":"감성 카페"}]
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
   * 추천에 사용할 여행 스타일 slug 목록
   * @example ["local-food","emotion-cafe"]
   */
  travelStyleSlugs: string[];
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
