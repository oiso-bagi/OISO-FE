import { Button } from "@/shared/components/button/Button";

import * as styles from "./SurveyFooter.css";

type SurveyFooterProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export function SurveyFooter({ onPrevious, onNext }: SurveyFooterProps) {
  return (
    <footer className={styles.footer}>
      <Button
        type="button"
        variant="secondary"
        width="100%"
        onClick={onPrevious}
      >
        이전
      </Button>
      <Button type="button" width="100%" onClick={onNext}>
        다음
      </Button>
    </footer>
  );
}
