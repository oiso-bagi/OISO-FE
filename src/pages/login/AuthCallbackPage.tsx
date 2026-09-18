import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuthStatus } from "@/shared/auth/authContext";
import XIcon from "@/shared/icons/x.svg?react";
import {
  isSurveyCompleted,
  prepareSurveyOnboarding,
} from "@/shared/lib/onboardingFlow";
import { clearRecommendationConditions } from "@/shared/lib/recommendationConditions";

import { useConsentStatus } from "./hooks/useConsents";
import * as styles from "./AuthCallbackPage.css";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authStatus = useAuthStatus();
  const consentStatusQuery = useConsentStatus(authStatus === "authenticated");

  const hasRedirectError =
    searchParams.get("status") === "error" ||
    searchParams.has("error") ||
    searchParams.has("reason");
  const isError =
    hasRedirectError ||
    authStatus === "unauthenticated" ||
    authStatus === "error" ||
    consentStatusQuery.isError;

  useEffect(() => {
    if (
      hasRedirectError ||
      authStatus !== "authenticated" ||
      !consentStatusQuery.data
    ) {
      return;
    }

    if (!consentStatusQuery.data.hasCompletedRequiredConsents) {
      /**
       * 같은 기기에 이전 사용자의 설문 완료 표시가 남아 있으면, 동의 화면에서
       * 주소창에 `/` 를 쳐 동의 없이 서비스 화면으로 들어갈 수 있습니다.
       * 동의 전인 사용자는 설문부터 다시 시작하게 지웁니다.
       */
      prepareSurveyOnboarding();
      clearRecommendationConditions();
      navigate("/consents", { replace: true });
      return;
    }

    navigate(isSurveyCompleted() ? "/" : "/survey", {
      replace: true,
    });
  }, [authStatus, consentStatusQuery.data, hasRedirectError, navigate]);

  if (isError) {
    return (
      <main className={styles.page}>
        <section className={styles.statusContent} role="alert">
          <div className={styles.errorIcon} aria-hidden="true">
            <XIcon className={styles.errorSymbol} />
          </div>

          <h1 className={styles.title}>로그인에 실패했어요</h1>
          <p className={styles.description}>
            인증이 취소되었거나 오류가 발생했어요.
            <br />
            다시 시도하거나 비로그인으로 둘러볼 수 있어요.
          </p>

          <button
            type="button"
            className={styles.retryButton}
            onClick={() => navigate("/login", { replace: true })}
          >
            다시 시도하기
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section
        className={styles.statusContent}
        role="status"
        aria-live="polite"
      >
        <div className={styles.loadingIcon} aria-hidden="true">
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
        </div>

        <h1 className={styles.title}>소셜 로그인 중...</h1>
        <p className={styles.description}>
          신규 회원은 약관 동의로,
          <br />
          기존 회원은 직전 화면 또는 홈으로 이동해요
        </p>
      </section>
    </main>
  );
}
