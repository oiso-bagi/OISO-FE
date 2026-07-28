import * as styles from "./SurveyQuestion.css";

type SurveyQuestionProps = {
  indexLabel: string;
  title: string;
  hint: string;
};

export function SurveyQuestion({
  indexLabel,
  title,
  hint,
}: SurveyQuestionProps) {
  return (
    <section className={styles.questionSection}>
      <p className={styles.questionIndex}>{indexLabel}</p>
      <h1 className={styles.questionTitle}>{title}</h1>
      <p className={styles.questionHint}>{hint}</p>
    </section>
  );
}
