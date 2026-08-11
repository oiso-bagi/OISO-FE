import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { BottomNavigation } from "@/shared/components/BottomNavigation";
import { useAuthStatus } from "@/shared/auth/authContext";
import { isSurveyCompleted } from "@/shared/lib/onboardingFlow";

import * as styles from "./AppLayout.css";

export function AppLayout() {
  const authStatus = useAuthStatus();

  if (authStatus === "checking") {
    return (
      <div className={styles.appContainer}>
        <main className={styles.authStatus} role="status" aria-live="polite">
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
        <main className={styles.authStatus} role="alert">
          <p>로그인 상태를 확인하지 못했어요.</p>
          <button
            type="button"
            className={styles.authRetryButton}
            onClick={() => window.location.reload()}
          >
            다시 시도
          </button>
        </main>
      </div>
    );
  }

  if (!isSurveyCompleted()) {
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
