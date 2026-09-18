import type {
  AdminKtoCollectResponseDto,
  AdminKtoPlaceCollectResponseDto,
  AdminKtoPlaceStatusResponseDto,
  AdminKtoStatusResponseDto,
  AdminStatsOverviewResponseDto,
} from "@/shared/api/generated/types";
import { http } from "@/shared/api/http";

import type {
  AdminKtoCollectResponse,
  AdminKtoStatus,
  AdminStatsOverview,
  KtoSource,
} from "../types";

const KTO_COOLDOWN_MS = 10 * 60 * 1000;

const toLastCollectedAt = (value: object | null) =>
  typeof value === "string" ? value : null;

const toCooldownUntil = (lastCollectedAt: string | null) => {
  if (!lastCollectedAt) return null;

  const collectedAtMs = new Date(lastCollectedAt).getTime();

  if (!Number.isFinite(collectedAtMs)) return null;

  const cooldownUntilMs = collectedAtMs + KTO_COOLDOWN_MS;

  return cooldownUntilMs > Date.now()
    ? new Date(cooldownUntilMs).toISOString()
    : null;
};

export const getAdminStatsOverview = async (): Promise<AdminStatsOverview> => {
  const response = await http.get<AdminStatsOverviewResponseDto>(
    "/admin/stats/overview",
  );

  return {
    totalUserCount: response.totalUserCount,
    totalSavedRouteCount: response.totalSavedRouteCount,
    totalSavingsWon: response.totalSavingsCostWon,
    averageLocalContributionScore: response.averageLocalContributionScore,
  };
};

type KtoStatusDto = AdminKtoStatusResponseDto | AdminKtoPlaceStatusResponseDto;

type KtoCollectDto =
  AdminKtoCollectResponseDto | AdminKtoPlaceCollectResponseDto;

/**
 * 데이터마다 현황·수집 엔드포인트와 적재 건수 필드가 다릅니다.
 * 화면은 이 차이를 모르도록 여기서 한 번에 맞춥니다.
 */
const KTO_ENDPOINTS: Record<
  KtoSource,
  {
    status: string;
    collect: string;
    toLoadedCount: (dto: KtoStatusDto) => number;
  }
> = {
  TOUR_API: {
    status: "/admin/kto/place-status",
    collect: "/admin/kto/place-collect",
    toLoadedCount: (dto) =>
      (dto as AdminKtoPlaceStatusResponseDto).totalPlaceCount,
  },
  CONCENTRATION: {
    status: "/admin/kto/status",
    collect: "/admin/kto/collect",
    toLoadedCount: (dto) => (dto as AdminKtoStatusResponseDto).targetPlaceCount,
  },
};

/** 생성 타입은 `object | null` 이지만 실제로는 문자열이 옵니다. */
const toLastMessage = (value: unknown) =>
  typeof value === "string" && value.trim() ? value : null;

export const getAdminKtoStatus = async (
  source: KtoSource,
): Promise<AdminKtoStatus> => {
  const endpoint = KTO_ENDPOINTS[source];
  const response = await http.get<KtoStatusDto>(endpoint.status);
  const lastCollectedAt = toLastCollectedAt(response.lastCollectedAt);

  return {
    loadedCount: endpoint.toLoadedCount(response),
    dailyLimit: response.dailyQuotaLimit,
    usedCount: response.dailyApiUsage,
    remainingCount: Math.max(
      0,
      response.dailyQuotaLimit - response.dailyApiUsage,
    ),
    lastCollectedAt,
    lastCollectResult: response.lastResult,
    lastMessage: toLastMessage(response.lastMessage),
    isCollecting: response.status === "RUNNING",
    cooldownUntil: toCooldownUntil(lastCollectedAt),
  };
};

/**
 * 즉시 수집. 쿨타임(10분) 안에 다시 부르면 서버가 429 로 막습니다.
 */
export const postAdminKtoCollect = async (
  source: KtoSource,
): Promise<AdminKtoCollectResponse> => {
  const response = await http.post<KtoCollectDto>(
    KTO_ENDPOINTS[source].collect,
  );

  return {
    updatedCount: response.updatedPlaceCount,
    failureCount: response.failureCount,
    cooldownUntil: toCooldownUntil(response.collectedAt),
  };
};
