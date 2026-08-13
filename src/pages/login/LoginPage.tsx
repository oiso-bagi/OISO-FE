import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { API_BASE_URL } from "@/shared/config/env";
import { useToast } from "@/shared/components/Toast/toastContext";
import OisoLogo from "@/shared/icons/oiso_logo.svg?react";
import Cost from "@/shared/icons/cost.svg?react";
import BestRoute from "@/shared/icons/best_route.svg?react";
import LocalBalance from "@/shared/icons/local.svg?react";
import KakaoLogo from "@/shared/icons/kakao.svg?react";
import GoogleLogo from "@/shared/icons/google.svg?react";

import * as styles from "./LoginPage.css";

const benefits = [
  { icon: <Cost />, label: "가성비 분석", isHighlighted: false },
  { icon: <BestRoute />, label: "동선 최적화", isHighlighted: true },
  { icon: <LocalBalance />, label: "지역 균형", isHighlighted: false },
] as const;

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
        <div className={styles.brandLogoSlot} aria-hidden="true">
          <OisoLogo className={styles.brandLogo} aria-label="오이소 로고" />
        </div>

        <h1 id="login-title" className={styles.title}>
          오이소
        </h1>
        <p className={styles.description}>
          <strong className={styles.accent}>예산</strong>부터{" "}
          <strong className={styles.accent}>동선</strong>까지, 데이터로 똑똑한
          부산 여행
        </p>

        <ul className={styles.benefitList} aria-label="서비스 특징">
          {benefits.map(({ icon, label, isHighlighted }) => (
            <li
              key={label}
              className={
                isHighlighted ? styles.highlightedBenefit : styles.benefit
              }
            >
              <span className={styles.benefitIcon} aria-hidden="true">
                {icon}
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.actions} aria-label="로그인 방법">
        <button
          type="button"
          className={styles.kakaoButton}
          onClick={() => handleLogin("kakao")}
        >
          {/* TODO: 카카오 SVG 로고를 logoSlot 안에 넣어 주세요. */}
          <KakaoLogo className={styles.logoSlot} aria-hidden="true" />
          카카오로 시작하기
        </button>
        <button
          type="button"
          className={styles.googleButton}
          onClick={() => handleLogin("google")}
        >
          {/* TODO: 구글 SVG 로고를 logoSlot 안에 넣어 주세요. */}
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
