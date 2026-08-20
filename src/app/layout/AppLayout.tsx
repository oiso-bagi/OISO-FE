import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { BottomNavigation } from "@/shared/components/BottomNavigation";
import { useAuthStatus } from "@/shared/auth/authContext";
import { isSurveyCompleted } from "@/shared/lib/onboardingFlow";
import { readRecommendationConditions } from "@/shared/lib/recommendationConditions";
import * as typo from "@/shared/styles/typography.css";

import * as styles from "./AppLayout.css";

export function AppLayout() {
  const authStatus = useAuthStatus();

  if (authStatus === "checking") {
    return (
      <div className={styles.appContainer}>
        <main
          className={`${styles.authStatus} ${typo.body6}`}
          role="status"
          aria-live="polite"
        >
          로그인 상태를 확인하고 있어요...
        </main>
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (authStatus === "error") {
    return (
      <div className={styles.appContainer}>
        <main className={`${styles.authStatus} ${typo.body6}`} role="alert">
          <p>로그인 상태를 확인하지 못했어요.</p>
          <button
            type="button"
            className={`${styles.authRetryButton} ${typo.body4}`}
            onClick={() => window.location.reload()}
          >
            다시 시도
          </button>
        </main>
      </div>
    );
  }

  /**
   * 완료 플래그와 설문 답변은 별개 키라 한쪽만 남을 수 있습니다.
   * 이번 변경 전에 설문을 마친 사용자가 대표적으로, 플래그만 있고 답변이
   * 없어 조건 기반 추천 대신 전체 목록을 받게 됩니다.
   *
   * 답변이 없으면 여행 일수를 알 수 없어 추천을 만들 수 없으므로,
   * 완료로 보지 않고 설문을 다시 받습니다.
   */
  if (!isSurveyCompleted() || !readRecommendationConditions()) {
    return <Navigate to="/survey" replace />;
  }

  return (
    <div className={styles.appContainer}>
      <main className={styles.contentWithBottomNavigation}>
        <Outlet />
      </main>
      <BottomNavigation />

      {/* 뒤로가기 시 스크롤 위치 복원 */}
      <ScrollRestoration />
    </div>
  );
}
