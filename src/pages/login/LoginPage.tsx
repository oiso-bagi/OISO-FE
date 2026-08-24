import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { API_BASE_URL } from "@/shared/config/env";
import { useToast } from "@/shared/components/Toast/toastContext";
import { CountUpAmount } from "@/shared/components/CountUpAmount/CountUpAmount";
import OisoLogo from "@/shared/icons/oiso_logo.svg?react";
import KakaoLogo from "@/shared/icons/kakao.svg?react";
import GoogleLogo from "@/shared/icons/google.svg?react";

import * as styles from "./LoginPage.css";

/**
 * 서비스 전체 누적 절약액(만원).
 *
 * TODO(API 연동 대기): 관리자 통계의 `totalSavingsWon` 을 비로그인도 볼 수 있는
 * 엔드포인트로 열면 실제 값으로 교체합니다. 지금은 화면 확인용 고정값입니다.
 */
const TOTAL_SAVINGS_MAN_WON = 5234;

type OAuthProvider = "kakao" | "google";

const loginFailureMessages: Record<string, string> = {
  kakao_canceled: "카카오 로그인이 취소됐어요. 다시 시도해 주세요.",
  google_canceled: "구글 로그인이 취소됐어요. 다시 시도해 주세요.",
  oauth_canceled: "소셜 로그인이 취소됐어요. 다시 시도해 주세요.",
  missing_code: "로그인 요청이 올바르지 않아요. 다시 시도해 주세요.",
  invalid_state: "로그인 요청이 만료됐어요. 다시 시도해 주세요.",
  token_exchange_failed:
    "로그인 정보를 확인하지 못했어요. 잠시 후 다시 시도해 주세요.",
  profile_fetch_failed:
    "소셜 계정 정보를 불러오지 못했어요. 다시 시도해 주세요.",
  email_required: "로그인하려면 소셜 계정의 이메일 정보가 필요해요.",
  nickname_required: "로그인하려면 소셜 계정의 닉네임 정보가 필요해요.",
  email_conflict: "이미 다른 소셜 계정으로 연결된 이메일이에요.",
  server_error: "로그인 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.",
};

const DEFAULT_LOGIN_FAILURE_MESSAGE =
  "로그인에 실패했어요. 잠시 후 다시 시도해 주세요.";

export function LoginPage() {
  const showToast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const handledReasonRef = useRef<string | null>(null);
  const failureReason = searchParams.get("reason");

  useEffect(() => {
    if (!failureReason) {
      handledReasonRef.current = null;
      return;
    }

    if (handledReasonRef.current === failureReason) return;

    handledReasonRef.current = failureReason;
    showToast({
      message:
        loginFailureMessages[failureReason] ?? DEFAULT_LOGIN_FAILURE_MESSAGE,
    });

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("reason");
    setSearchParams(nextSearchParams, { replace: true });
  }, [failureReason, searchParams, setSearchParams, showToast]);

  const handleLogin = (provider: OAuthProvider) => {
    window.location.assign(`${API_BASE_URL}/auth/${provider}/login`);
  };

  return (
    <div className={styles.page}>
      <section className={styles.intro} aria-labelledby="login-title">
        <OisoLogo className={styles.brandLogo} role="img" aria-label="오이소" />

        <h1 id="login-title" className={styles.title}>
          관광지 물가 말고
          <br />
          부산 <span className={styles.titleAccent}>현지 물가</span>로
        </h1>
        <p className={styles.description}>
          예산부터 동선까지, 데이터로 똑똑한 부산 여행
        </p>
      </section>

      <section className={styles.savingsBand} aria-label="누적 절약액">
        <span className={styles.savingsLabel}>
          오이소 여행자들이 지금까지 아낀 돈
        </span>
        <CountUpAmount
          className={styles.savingsAmount}
          value={TOTAL_SAVINGS_MAN_WON}
          unit="만원"
        />
      </section>

      <section className={styles.actions} aria-label="로그인 방법">
        <button
          type="button"
          className={styles.kakaoButton}
          onClick={() => handleLogin("kakao")}
        >
          <KakaoLogo className={styles.logoSlot} aria-hidden="true" />
          카카오로 시작하기
        </button>
        <button
          type="button"
          className={styles.googleButton}
          onClick={() => handleLogin("google")}
        >
          <GoogleLogo className={styles.logoSlot} aria-hidden="true" />
          Google로 계속하기
        </button>
      </section>

      <footer className={styles.footer}>
        <p>2026 관광데이터 활용 공모전 · 개발 부문</p>
      </footer>
    </div>
  );
}
