import backIcon from "@/shared/assets/svg/back.svg";

import * as styles from "./SurveyHeader.css";

type SurveyHeaderProps = {
  onBack: () => void;
  onReset: () => void;
};

export function SurveyHeader({ onBack, onReset }: SurveyHeaderProps) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.backButton}
        onClick={onBack}
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
