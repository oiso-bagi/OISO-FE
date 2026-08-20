import type {
  AdminKtoCollectResponseDto,
  AdminKtoStatusResponseDto,
  AdminSavingsBreakdownResponseDto,
  AdminStatsOverviewResponseDto,
} from "@/shared/api/generated/types";
import { http } from "@/shared/api/http";

import type {
  AdminKtoCollectResponse,
  AdminKtoStatus,
  AdminSavingsBreakdown,
  AdminStatsOverview,
  SavingsCategoryBreakdown,
  SavingsMarketBreakdown,
} from "../types";

const KTO_COOLDOWN_MS = 10 * 60 * 1000;
const MARKET_CATEGORIES = new Set(["MARKET", "LOCAL"]);

const toRatio = (percentage: number) =>
  Math.min(1, Math.max(0, percentage / 100));

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

export const getAdminSavingsBreakdown =
  async (): Promise<AdminSavingsBreakdown> => {
    const response = await http.get<AdminSavingsBreakdownResponseDto>(
      "/admin/stats/savings-breakdown",
    );

    const byCategory: SavingsCategoryBreakdown[] = [];
    const byMarketType: SavingsMarketBreakdown[] = [];

    response.breakdown.forEach((item) => {
      const breakdown = {
        label: item.label,
        amountWon: item.amountWon,
        ratio: toRatio(item.percentage),
      };

      if (MARKET_CATEGORIES.has(item.category)) {
        byMarketType.push({ ...breakdown, type: item.category });
        return;
      }

      byCategory.push({ ...breakdown, category: item.category });
    });

    return { byCategory, byMarketType };
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
