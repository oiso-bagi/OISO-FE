import { useEffect } from "react";

import { Card } from "@/shared/components/Card";
import { Header } from "@/shared/components/header/Header";
import { useToast } from "@/shared/components/Toast/toastContext";
import { pageContent } from "@/shared/styles/layout.css";

import { useCurrentUser } from "./hooks/useCurrentUser";
import { useLogout } from "./hooks/useLogout";
import { useSavingsDashboard } from "./hooks/useSavingsDashboard";
import * as styles from "./DashboardPage.css";

const formatWon = (amount: number) => `${amount.toLocaleString("ko-KR")}원`;

const formatDisplayDate = (isoDate: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(isoDate))
    .replaceAll(". ", ".")
    .replace(/\.$/, "");

export function DashboardPage() {
  const showToast = useToast();
  const currentUserQuery = useCurrentUser();
  const savingsDashboardQuery = useSavingsDashboard();
  const logoutMutation = useLogout();

  useEffect(() => {
    if (!currentUserQuery.isError) return;

    showToast({
      message: "사용자 정보를 불러오지 못했어요.",
    });
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
  const contributionScore = dashboard
    ? Math.min(Math.max(dashboard.localContribution.scorePercent, 0), 100)
    : 0;

  return (
    <main className={styles.page}>
      <Header
        title={dashboardTitle}
        rightText={logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
        rightVariant="accent"
        onClickRight={logoutMutation.isPending ? undefined : handleLogout}
      />

      <div className={`${pageContent} ${styles.content}`}>
        {savingsDashboardQuery.isPending && (
          <Card className={styles.statusCard} role="status" aria-live="polite">
            절약 기록을 불러오고 있어요...
          </Card>
        )}

        {savingsDashboardQuery.isError && (
          <Card className={styles.statusCard} role="alert">
            <p>절약 기록을 불러오지 못했어요.</p>
            <button
              type="button"
              className={styles.retryButton}
              onClick={() => savingsDashboardQuery.refetch()}
            >
              다시 시도
            </button>
          </Card>
        )}

        {dashboard && (
          <>
            <Card className={styles.summaryCard}>
              <p className={styles.summaryLabel}>누적 절약</p>
              <strong className={styles.totalSaving}>
                {formatWon(dashboard.totalSavingsWon)}
              </strong>
              <p className={styles.summaryDescription}>
                {dashboard.tripCount}번의 여행 · 회당 평균{" "}
                {formatWon(dashboard.averageSavingsWon)}
              </p>
            </Card>

            <section
              className={styles.section}
              aria-labelledby="category-title"
            >
              <h2 id="category-title" className={styles.sectionTitle}>
                항목별 절약
              </h2>

              {dashboard.savingsByCategory.length > 0 ? (
                <dl className={styles.categoryGrid}>
                  {dashboard.savingsByCategory.map(({ label, amountWon }) => (
                    <div key={label} className={styles.categoryCard}>
                      <dt className={styles.categoryLabel}>{label}</dt>
                      <dd className={styles.categoryAmount}>
                        {formatWon(amountWon)}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <Card className={styles.emptyCard}>
                  아직 항목별 절약 기록이 없어요.
                </Card>
              )}
            </section>

            <Card className={styles.contributionCard}>
              <h2 className={styles.contributionTitle}>로컬 기여 지수</h2>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-label="로컬 기여 지수"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={contributionScore}
              >
                <span
                  className={styles.progressValue}
                  style={{ width: `${contributionScore}%` }}
                />
              </div>
              <div className={styles.contributionInfo}>
                <div className={styles.contributionRow}>
                  <span>{dashboard.localContribution.label}</span>
                  <strong className={styles.contributionPercent}>
                    {dashboard.localContribution.scorePercent}%
                  </strong>
                </div>

                <p className={styles.contributionDescription}>
                  {dashboard.localContribution.message}
                </p>
              </div>
            </Card>

            <section className={styles.section} aria-labelledby="history-title">
              <h2 id="history-title" className={styles.sectionTitle}>
                절약 내역
              </h2>

              {dashboard.histories.length > 0 ? (
                <Card as="ul" className={styles.historyCard}>
                  {dashboard.histories.map((history) => (
                    <li
                      key={`${history.routeId}-${history.trippedAt}`}
                      className={styles.historyItem}
                    >
                      <div>
                        <h3 className={styles.historyTitle}>
                          {history.routeName}
                        </h3>
                        <time
                          className={styles.historyDate}
                          dateTime={history.trippedAt}
                        >
                          {formatDisplayDate(history.trippedAt)}
                        </time>
                      </div>
                      <strong className={styles.historyAmount}>
                        -{formatWon(history.savedAmountWon)}
                      </strong>
                    </li>
                  ))}
                </Card>
              ) : (
                <Card className={styles.emptyCard}>
                  아직 완료한 여행의 절약 기록이 없어요.
                </Card>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
