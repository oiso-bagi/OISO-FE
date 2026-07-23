import * as styles from "./LoginPage.css";
import OisoLogo from "@/shared/icons/oiso_logo.svg?react";
import Cost from "@/shared/icons/cost.svg?react";
import BestRoute from "@/shared/icons/best_route.svg?react";
import LocalBalance from "@/shared/icons/local.svg?react";
import KakaoLogo from "@/shared/icons/kakao.svg?react";
import GoogleLogo from "@/shared/icons/google.svg?react";

const benefits = [
  { icon: <Cost />, label: "가성비 분석", highlighted: false },
  { icon: <BestRoute />, label: "동선 최적화", highlighted: true },
  { icon: <LocalBalance />, label: "지역 균형", highlighted: false },
] as const;

export function LoginPage() {
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
          {benefits.map(({ icon, label, highlighted }) => (
            <li
              key={label}
              className={
                highlighted ? styles.highlightedBenefit : styles.benefit
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
        <button type="button" className={styles.kakaoButton}>
          {/* TODO: 카카오 SVG 로고를 logoSlot 안에 넣어 주세요. */}
          <KakaoLogo className={styles.logoSlot} aria-hidden="true" />
          카카오로 시작하기
        </button>
        <button type="button" className={styles.googleButton}>
          {/* TODO: 구글 SVG 로고를 logoSlot 안에 넣어 주세요. */}
          <GoogleLogo className={styles.logoSlot} aria-hidden="true" />
          Google로 계속하기
        </button>
      </section>

      <footer className={styles.footer}>
        <p>2026 관광데이터 활용 공모전 · 개발 부문</p>
        <p>
          계정이 없으신가요?{" "}
          <a className={styles.signupLink} href="/signup">
            회원가입
          </a>
        </p>
      </footer>
    </div>
  );
}
