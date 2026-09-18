import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import * as styles from "../components/ui.css";
import { useAdminStatsOverview } from "../hooks/useAdminDashboard";
import { formatNumber } from "../lib/format";
import { AdminKtoPanel } from "./AdminKtoPanel";

/** 큰 금액은 만원 단위로 줄여야 카드 안에서 자릿수를 읽을 수 있습니다. */
const toManwon = (won: number) => formatNumber(Math.round(won / 10000));

export function AdminDashboardPage() {
  const overview = useAdminStatsOverview();

  const stats = overview.data;
  const isPending = overview.isPending;

  return (
    <>
      <PageHeader
        title="대시보드"
        description="서비스 현황과 KTO 공공데이터 적재·수집 상태를 확인합니다."
      />

      {/* 실패했을 때 카드가 전부 "—" 로만 남으면 값이 없는 이유를 알 수 없습니다. */}
      {overview.isError && (
        <p className={styles.inlineError} role="alert">
          지표를 불러오지 못했어요.
        </p>
      )}

      <div className={styles.statGrid}>
        <StatCard
          label="누적 회원"
          value={stats ? formatNumber(stats.totalUserCount) : "—"}
          unit="명"
          isPending={isPending}
        />
        <StatCard
          label="누적 저장 코스"
          value={stats ? formatNumber(stats.totalSavedRouteCount) : "—"}
          unit="개"
          isPending={isPending}
        />
        <StatCard
          label="누적 절약액"
          value={stats ? toManwon(stats.totalSavingsWon) : "—"}
          unit="만원"
          isPending={isPending}
        />
        <StatCard
          label="로컬 기여 지수 평균"
          value={stats ? stats.averageLocalContributionScore.toFixed(1) : "—"}
          unit="%"
          isPending={isPending}
        />
      </div>

      <AdminKtoPanel />
    </>
  );
}
