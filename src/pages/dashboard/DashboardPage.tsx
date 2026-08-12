import { useEffect } from "react";

import { Header } from "@/shared/components/header/Header";
import { useToast } from "@/shared/components/Toast/toastContext";
import { pageContent } from "@/shared/styles/layout.css";

import { DashboardStatusCard } from "./components/DashboardStatusCard";
import { DashboardSummaryCard } from "./components/DashboardSummaryCard";
import { LocalContributionCard } from "./components/LocalContributionCard";
import { SavingsCategorySection } from "./components/SavingsCategorySection";
import { SavingsHistorySection } from "./components/SavingsHistorySection";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { useLogout } from "./hooks/useLogout";
import { useSavingsDashboard } from "./hooks/useSavingsDashboard";
import * as styles from "./DashboardPage.css";

export function DashboardPage() {
  const showToast = useToast();
  const currentUserQuery = useCurrentUser();
  const savingsDashboardQuery = useSavingsDashboard();
  const logoutMutation = useLogout();

  useEffect(() => {
    if (!currentUserQuery.isError) return;

    showToast({ message: "사용자 정보를 불러오지 못했어요." });
  }, [currentUserQuery.isError, showToast]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onError: () => {
        showToast({
          message: "로그아웃하지 못했어요. 다시 시도해 주세요.",
        });
      },
    });
  };

  const dashboardTitle = currentUserQuery.data
    ? `${currentUserQuery.data.nickname}님의 절약 기록`
    : "여행자님의 절약 기록";
  const dashboard = savingsDashboardQuery.data;

  return (
    <main className={styles.page}>
      <Header
        title={dashboardTitle}
        rightText={logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
        rightVariant="accent"
        onClickRight={logoutMutation.isPending ? undefined : handleLogout}
      />

      <div className={`${pageContent} ${styles.content}`}>
        {(savingsDashboardQuery.isPending || savingsDashboardQuery.isError) && (
          <DashboardStatusCard
            isError={savingsDashboardQuery.isError}
            onRetry={() => savingsDashboardQuery.refetch()}
          />
        )}

        {dashboard && (
          <>
            <DashboardSummaryCard
              totalSavingsWon={dashboard.totalSavingsWon}
              tripCount={dashboard.tripCount}
              averageSavingsWon={dashboard.averageSavingsWon}
            />
            <SavingsCategorySection categories={dashboard.savingsByCategory} />
            <LocalContributionCard contribution={dashboard.localContribution} />
            <SavingsHistorySection histories={dashboard.histories} />
          </>
        )}
      </div>
    </main>
  );
}
