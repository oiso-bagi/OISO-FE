import backIcon from "@/shared/assets/svg/back.svg";

import * as styles from "./SurveyHeader.css";

type SurveyHeaderProps = {
  onBack: () => void;
  onReset: () => void;

  /** 돌아갈 곳이 없으면(첫 설문의 첫 단계) 뒤로 가기 버튼을 숨깁니다. */
  canGoBack?: boolean;
};

export function SurveyHeader({
  onBack,
  onReset,
  canGoBack = true,
}: SurveyHeaderProps) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={
          canGoBack
            ? styles.backButton
            : `${styles.backButton} ${styles.backButtonHidden}`
        }
        onClick={onBack}
        disabled={!canGoBack}
        aria-hidden={!canGoBack}
        aria-label="이전 페이지로 이동"
      >
        <img src={backIcon} alt="" className={styles.backIcon} />
      </button>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        다시하기
      </button>
    </header>
  );
}
