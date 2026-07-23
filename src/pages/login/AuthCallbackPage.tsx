import { useNavigate, useSearchParams } from "react-router-dom";

import XIcon from "@/shared/icons/x.svg?react";

import * as styles from "./AuthCallbackPage.css";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isError =
    searchParams.get("status") === "error" || searchParams.has("error");

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
