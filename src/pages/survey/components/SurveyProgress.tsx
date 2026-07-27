import * as styles from "./SurveyProgress.css";

type SurveyProgressProps = {
  currentStep: number;
  totalStep: number;
};

export function SurveyProgress({
  currentStep,
  totalStep,
}: SurveyProgressProps) {
  return (
    <section className={styles.progressSection} aria-label="설문 진행 상황">
      <p className={styles.progressText}>
        {currentStep} / {totalStep}
      </p>
      <div className={styles.progressBars}>
        {Array.from({ length: totalStep }, (_, index) => (
          <span
            key={index}
            className={
              index < currentStep
                ? styles.activeProgressBar
                : styles.inactiveProgressBar
            }
          />
        ))}
      </div>
    </section>
  );
}
