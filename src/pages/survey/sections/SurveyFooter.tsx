import { Button } from "@/shared/components/button/Button";
import { DataAttribution } from "@/shared/components/DataAttribution/DataAttribution";

import * as styles from "./SurveyFooter.css";

type SurveyFooterProps = {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled?: boolean;

  /** 현재 단계의 답이 서버가 받을 수 없는 값이면 넘어가지 못하게 합니다. */
  isNextDisabled?: boolean;
};

export function SurveyFooter({
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false,
}: SurveyFooterProps) {
  return (
    <footer className={styles.footer}>
      <Button
        type="button"
        variant="secondary"
        width="100%"
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        이전
      </Button>
      <Button
        type="button"
        width="100%"
        onClick={onNext}
        disabled={isNextDisabled}
      >
        다음
      </Button>

      <DataAttribution className={styles.attribution} />
    </footer>
  );
}
