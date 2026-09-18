import {
  matchPath,
  Navigate,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { RequireConsents } from "@/app/router/RequireConsents";
import { BottomNavigation } from "@/shared/components/BottomNavigation";
import { useAuthStatus } from "@/shared/auth/authContext";
import { readRecommendationConditions } from "@/shared/lib/recommendationConditions";
import * as typo from "@/shared/styles/typography.css";

import * as styles from "./AppLayout.css";

export function AppLayout() {
  const authStatus = useAuthStatus();
  const location = useLocation();

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
   * 설문 조건이 꼭 필요한 추천 화면에 직접 들어온 경우에만 설문으로 보냅니다.
   * 로그인 직후의 신규/기존 사용자 분기는 서버의 필수 약관 완료 상태로
   * 판단하므로, 로컬 설문 데이터가 없다는 이유로 앱 전체를 막지 않습니다.
   */
  if (
    matchPath("/route", location.pathname) &&
    !readRecommendationConditions()
  ) {
    return <Navigate to="/survey" replace />;
  }

  return (
    <div className={styles.appContainer}>
      <main className={styles.contentWithBottomNavigation}>
        {/*
         * 서비스 화면은 필수 약관에 동의한 사용자만 봅니다. 예전에는 설문 완료
         * 표시가 없으면 설문으로 보내 간접적으로 막혔는데, 그 표시가 없어지면서
         * 동의 화면에서 주소창에 `/` 를 치면 그대로 들어올 수 있었습니다.
         */}
        <RequireConsents>
          <Outlet />
        </RequireConsents>
      </main>
      <BottomNavigation />

      {/* 뒤로가기 시 스크롤 위치 복원 */}
      <ScrollRestoration />
    </div>
  );
}
