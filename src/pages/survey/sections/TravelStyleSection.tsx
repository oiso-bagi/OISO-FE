import { SurveyQuestion } from "../components/SurveyQuestion";
import type { RecommendationOptionsQuery } from "../hooks/useRecommendationOptions";
import type { SurveyForm } from "../hooks/useSurveyForm";

import * as styles from "./TravelStyleSection.css";

type TravelStyleSectionProps = {
  optionsQuery: RecommendationOptionsQuery;
  selection: SurveyForm["travelStyle"];
};

export function TravelStyleSection({
  optionsQuery,
  selection,
}: TravelStyleSectionProps) {
  const travelStyleOptions = optionsQuery.data?.travelStyles ?? [];

  return (
    <>
      <SurveyQuestion
        indexLabel="Q1"
        title="선호하는 여행 스타일은 무엇인가요?"
        hint="복수 선택 가능"
      />

      {optionsQuery.isLoading && (
        <section className={styles.statusBox} role="status" aria-live="polite">
          추천 옵션을 불러오는 중이에요.
        </section>
      )}

      {optionsQuery.isError && (
        <section className={styles.statusBox} role="alert">
          <span>추천 옵션을 불러오지 못했어요.</span>
          <button
            type="button"
            className={styles.retryButton}
            onClick={() => optionsQuery.refetch()}
          >
            다시 시도
          </button>
        </section>
      )}

      {!optionsQuery.isLoading &&
        !optionsQuery.isError &&
        travelStyleOptions.length === 0 && (
          <section className={styles.statusBox} role="status">
            선택 가능한 여행 스타일이 아직 없어요.
          </section>
        )}

      <section className={styles.optionGrid} aria-label="여행 스타일 선택">
        {travelStyleOptions.map((option) => {
          const isSelected = selection.selectedStyleIdSet.has(option.id);

          return (
            <button
              key={option.id}
              type="button"
              className={styles.optionCard}
              aria-pressed={isSelected}
              onClick={() => selection.toggleStyle(option.id)}
            >
              <img src={option.icon} alt="" className={styles.optionIcon} />
              <span className={styles.optionLabel}>{option.label}</span>
            </button>
          );
        })}
      </section>

      {selection.selectedCount > 0 && (
        <section className={styles.selectionNotice} aria-live="polite">
          <strong className={styles.selectionCount}>
            {selection.selectedCount}개
          </strong>
          <span>의 테마가 선택되었어요.</span>
        </section>
      )}
    </>
  );
}
