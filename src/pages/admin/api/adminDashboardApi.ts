import type {
  AdminKtoCollectResponseDto,
  AdminKtoStatusResponseDto,
  AdminStatsOverviewResponseDto,
} from "@/shared/api/generated/types";
import { http } from "@/shared/api/http";

import type {
  AdminKtoCollectResponse,
  AdminKtoStatus,
  AdminStatsOverview,
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

export const getAdminKtoStatus = async (): Promise<AdminKtoStatus> => {
  const response =
    await http.get<AdminKtoStatusResponseDto>("/admin/kto/status");
  const lastCollectedAt = toLastCollectedAt(response.lastCollectedAt);

  return {
    dailyLimit: response.dailyQuotaLimit,
    usedCount: response.dailyApiUsage,
    remainingCount: Math.max(
      0,
      response.dailyQuotaLimit - response.dailyApiUsage,
    ),
    lastCollectedAt,
    lastCollectStatus: lastCollectedAt ? "SUCCESS" : null,
    isCollecting: response.status === "RUNNING",
    cooldownUntil: toCooldownUntil(lastCollectedAt),
  };
};

export const postAdminKtoCollect =
  async (): Promise<AdminKtoCollectResponse> => {
    const response =
      await http.post<AdminKtoCollectResponseDto>("/admin/kto/collect");

    return {
      accepted: response.failureCount === 0,
      cooldownUntil: toCooldownUntil(response.collectedAt),
    };
  };
