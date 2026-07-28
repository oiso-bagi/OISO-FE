import { SurveyQuestion } from "../components/SurveyQuestion";
import { travelStyleOptions } from "../mocks/surveyOptions";

import * as styles from "./TravelStyleSection.css";

type TravelStyleSectionProps = {
  selectedStyleIdSet: Set<string>;
  selectedCount: number;
  onToggleStyle: (styleId: string) => void;
};

export function TravelStyleSection({
  selectedStyleIdSet,
  selectedCount,
  onToggleStyle,
}: TravelStyleSectionProps) {
  return (
    <>
      <SurveyQuestion
        indexLabel="Q1"
        title="선호하는 여행 스타일은 무엇인가요?"
        hint="복수 선택 가능"
      />

      <section className={styles.optionGrid} aria-label="여행 스타일 선택">
        {travelStyleOptions.map((option) => {
          const isSelected = selectedStyleIdSet.has(option.id);

          return (
            <button
              key={option.id}
              type="button"
              className={styles.optionCard}
              aria-pressed={isSelected}
              onClick={() => onToggleStyle(option.id)}
            >
              <img src={option.icon} alt="" className={styles.optionIcon} />
              <span className={styles.optionLabel}>{option.label}</span>
            </button>
          );
        })}
      </section>

      {selectedCount > 0 && (
        <section className={styles.selectionNotice} aria-live="polite">
          <strong className={styles.selectionCount}>{selectedCount}개</strong>
          <span>의 테마가 선택되었습니다.</span>
        </section>
      )}
    </>
  );
}
