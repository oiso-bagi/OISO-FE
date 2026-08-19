import { vars } from "@/shared/styles/theme.css";

import { RecommendationOptionsStatus } from "../components/RecommendationOptionsStatus";
import { SurveyQuestion } from "../components/SurveyQuestion";
import type { RecommendationOptionsQuery } from "../hooks/useRecommendationOptions";
import type { SurveyForm } from "../hooks/useSurveyForm";

import * as styles from "./BudgetSection.css";

type BudgetSectionProps = {
  optionsQuery: RecommendationOptionsQuery;
  budget: SurveyForm["budget"];
};

export function BudgetSection({ optionsQuery, budget }: BudgetSectionProps) {
  const tripDayOptions = optionsQuery.data?.durationDays ?? [];
  const budgetPresets = optionsQuery.data?.budgetPresets ?? [];
  const hasNoOptions =
    !optionsQuery.isLoading &&
    !optionsQuery.isError &&
    (tripDayOptions.length === 0 || budgetPresets.length === 0);

  return (
    <>
      <SurveyQuestion
        indexLabel="Q2"
        title="하루 예산은 얼마인가요?"
        hint="입력한 예산을 항목별로 자동 배분해드려요"
      />

      <RecommendationOptionsStatus
        isLoading={optionsQuery.isLoading}
        isError={optionsQuery.isError}
        isEmpty={hasNoOptions}
        loadingMessage="추천 옵션을 불러오는 중이에요."
        errorMessage="추천 옵션을 불러오지 못했어요."
        emptyMessage="선택 가능한 예산 옵션이 아직 없어요."
        onRetry={() => optionsQuery.refetch()}
      />

      <section className={styles.budgetInputSection}>
        <div className={styles.fieldGroup}>
          <p className={styles.fieldLabel}>여행 기간</p>
          <div className={styles.dayOptionGrid}>
            {tripDayOptions.map((day) => (
              <button
                key={day}
                type="button"
                className={styles.dayOption}
                aria-pressed={budget.tripDays === day}
                onClick={() => budget.setTripDays(day)}
              >
                {day}일
              </button>
            ))}
          </div>
        </div>

        <label className={styles.budgetInputCard}>
          <span className={styles.currencySymbol}>₩</span>
          <input
            className={styles.budgetInput}
            inputMode="numeric"
            value={budget.formattedBudget}
            onChange={(event) => budget.updateBudgetText(event.target.value)}
            aria-label="하루 예산"
          />
          <span className={styles.currencyUnit}>원</span>
        </label>

        <p className={styles.fieldHint}>
          {budget.hasNegativeBudgetInput
            ? "음수는 입력할 수 없어요."
            : "숙박비를 제외한 가격을 입력해주세요!"}
        </p>
      </section>

      <section className={styles.presetSection}>
        <p className={styles.presetTitle}>
          예산이 고민된다면 아래 옵션을 선택해보세요.
        </p>
        <div className={styles.presetGrid}>
          {budgetPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={styles.presetButton}
              aria-pressed={budget.budget === preset.value}
              onClick={() => budget.selectBudget(preset.value)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      {budget.isBudgetAllocationVisible && (
        <section className={styles.allocationCard}>
          <h2 className={styles.allocationTitle}>
            권장 예산 배분 (1일 기준: {budget.formattedBudget}원)
          </h2>

          {budget.allocationItems.length > 0 ? (
            <div className={styles.allocationList}>
              {budget.allocationItems.map((item) => {
                const sliderFillPercent =
                  item.maxPercent > 0
                    ? Math.min(100, (item.percent / item.maxPercent) * 100)
                    : 0;

                return (
                  <div key={item.id} className={styles.allocationItem}>
                    <div className={styles.allocationRow}>
                      <span className={styles.allocationLabel}>
                        <img
                          src={item.icon}
                          alt=""
                          className={styles.allocationIcon}
                        />
                        {item.label}
                      </span>
                      <span className={styles.allocationValue}>
                        {`${item.amount.toLocaleString("ko-KR")}원(${item.percent}%)`}
                      </span>
                    </div>
                    <div className={styles.allocationControl}>
                      <input
                        className={styles.allocationRange}
                        type="range"
                        min={0}
                        max={item.maxPercent}
                        step={5}
                        value={item.percent}
                        onChange={(event) =>
                          budget.updateAllocationPercent(
                            item.id,
                            Number(event.target.value),
                          )
                        }
                        aria-label={`${item.label} 배분 비율`}
                        style={{
                          background: `linear-gradient(to right, ${vars.color.neutral900} ${sliderFillPercent}%, ${vars.color.neutral100} ${sliderFillPercent}%) center / 100% 1rem no-repeat`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.allocationEmptyText}>
              예산 배분 옵션을 불러온 뒤 계산 결과가 표시돼요.
            </p>
          )}
        </section>
      )}
    </>
  );
}
