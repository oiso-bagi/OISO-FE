import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { BottomNavigation } from "@/shared/components/BottomNavigation";
import {
  isLoginCompleted,
  isSurveyCompleted,
} from "@/shared/lib/onboardingFlow";

import * as styles from "./AppLayout.css";

export function AppLayout() {
  if (!isLoginCompleted()) {
    return <Navigate to="/login" replace />;
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
