import { useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import * as styles from "@/app/layout/AppLayout.css";
import { useConsentStatus } from "@/pages/login/hooks/useConsents";
import { useAuthStatus } from "@/shared/auth/authContext";
import { useToast } from "@/shared/components/Toast/toastContext";
import * as typo from "@/shared/styles/typography.css";

interface RequireConsentsProps {
  children: ReactNode;
}

/**
 * 필수 약관에 동의한 사용자만 들여보냅니다.
 *
 * 설문은 로그인·약관 화면과 같이 인증을 확인하지 않는 레이아웃에 있어, 신규
 * 사용자가 약관 동의 화면에서 주소창에 `/survey` 를 입력하면 동의 없이
 * 넘어갈 수 있었습니다. 레이아웃 전체가 아니라 필요한 페이지만 감쌉니다.
 * 로그인·약관·데이터 출처 페이지는 동의 전에도 열려야 합니다.
 */
export function RequireConsents({ children }: RequireConsentsProps) {
  const authStatus = useAuthStatus();
  const showToast = useToast();
  const consentStatusQuery = useConsentStatus(authStatus === "authenticated");

  const hasCompletedRequiredConsents =
    consentStatusQuery.data?.hasCompletedRequiredConsents;

  // 주소를 직접 입력해 들어왔다가 약관 화면으로 돌아가면 이유를 알 수 없습니다.
  useEffect(() => {
    if (hasCompletedRequiredConsents !== false) return;

    showToast({ message: "필수 약관에 동의해 주세요." });
  }, [hasCompletedRequiredConsents, showToast]);

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (hasCompletedRequiredConsents === false) {
    return <Navigate to="/consents" replace />;
  }

  // 재조회가 실패해도 이미 받은 동의 상태가 있으면 그대로 씁니다.
  if (hasCompletedRequiredConsents === true) {
    return children;
  }

  if (authStatus === "error" || consentStatusQuery.isError) {
    return (
      <div className={`${styles.authStatus} ${typo.body6}`} role="alert">
        <p>약관 동의 상태를 확인하지 못했어요.</p>
        <button
          type="button"
          className={`${styles.authRetryButton} ${typo.body4}`}
          onClick={() => {
            // 로그인 상태를 모르면 앱을 다시 불러와야 세션부터 다시 확인합니다.
            if (authStatus === "error") {
              window.location.reload();
              return;
            }

            void consentStatusQuery.refetch();
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${styles.authStatus} ${typo.body6}`}
      role="status"
      aria-live="polite"
    >
      약관 동의 상태를 확인하고 있어요...
    </div>
  );
}
