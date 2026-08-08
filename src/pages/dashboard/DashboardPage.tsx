import { useEffect } from "react";

import { Card } from "@/shared/components/Card";
import { Header } from "@/shared/components/header/Header";
import { useToast } from "@/shared/components/Toast/toastContext";
import { pageContent } from "@/shared/styles/layout.css";

import { useCurrentUser } from "./hooks/useCurrentUser";
import { useLogout } from "./hooks/useLogout";
import * as styles from "./DashboardPage.css";

const SAVING_CATEGORIES = [
  { label: "식비", amount: "62,000" },
  { label: "교통비", amount: "38,000" },
  { label: "체험비", amount: "42,000" },
] as const;

const SAVING_HISTORY = [
  {
    id: 1,
    title: "영도 반나절 가성비 코스",
    date: "2026-06-28",
    amount: "-18,000원",
  },
  {
    id: 2,
    title: "서면·전포 카페 코스",
    date: "2026-06-15",
    amount: "-12,000원",
  },
  {
    id: 3,
    title: "기장 해안 드라이브",
    date: "2026-05-30",
    amount: "-17,000원",
  },
] as const;

const LOCAL_CONTRIBUTION_PERCENT = 65;

const formatDisplayDate = (date: string) => date.replaceAll("-", ".");

export function DashboardPage() {
  const showToast = useToast();
  const currentUserQuery = useCurrentUser();
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

  return (
    <main className={styles.page}>
      <Header
        title={dashboardTitle}
        rightText={logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
        rightVariant="accent"
        onClickRight={logoutMutation.isPending ? undefined : handleLogout}
      />

      <div className={`${pageContent} ${styles.content}`}>
        <Card className={styles.summaryCard}>
          <p className={styles.summaryLabel}>누적 절약</p>
          <strong className={styles.totalSaving}>142,000원</strong>
          <p className={styles.summaryDescription}>
            3번의 여행 · 회당 평균 47,000원
          </p>
        </Card>

        <section className={styles.section} aria-labelledby="category-title">
          <h2 id="category-title" className={styles.sectionTitle}>
            항목별 절약
          </h2>

          <dl className={styles.categoryGrid}>
            {SAVING_CATEGORIES.map(({ label, amount }) => (
              <div key={label} className={styles.categoryCard}>
                <dt className={styles.categoryLabel}>{label}</dt>
                <dd className={styles.categoryAmount}>{amount}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Card className={styles.contributionCard}>
          <h2 className={styles.contributionTitle}>로컬 기여 지수</h2>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label="로컬 기여 지수"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={LOCAL_CONTRIBUTION_PERCENT}
          >
            <span
              className={styles.progressValue}
              style={{ width: `${LOCAL_CONTRIBUTION_PERCENT}%` }}
            />
          </div>
          <div className={styles.contributionInfo}>
            <div className={styles.contributionRow}>
              <span>외곽·원도심 상권 방문</span>
              <strong className={styles.contributionPercent}>
                {LOCAL_CONTRIBUTION_PERCENT}%
              </strong>
            </div>

            <p className={styles.contributionDescription}>
              관광 수요 분산에 기여하고 있어요
            </p>
          </div>
        </Card>

        <section className={styles.section} aria-labelledby="history-title">
          <h2 id="history-title" className={styles.sectionTitle}>
            절약 내역
          </h2>

          <Card as="ul" className={styles.historyCard}>
            {SAVING_HISTORY.map(({ id, title, date, amount }) => (
              <li key={id} className={styles.historyItem}>
                <div>
                  <h3 className={styles.historyTitle}>{title}</h3>
                  <time className={styles.historyDate} dateTime={date}>
                    {formatDisplayDate(date)}
                  </time>
                </div>
                <strong className={styles.historyAmount}>{amount}</strong>
              </li>
            ))}
          </Card>
        </section>
      </div>
    </main>
  );
}
