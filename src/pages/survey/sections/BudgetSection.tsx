import { SurveyQuestion } from "../components/SurveyQuestion";
import { budgetPresets, tripDayOptions } from "../mocks/budgetOptions";

import * as styles from "./BudgetSection.css";

type BudgetAllocationItem = {
  id: string;
  label: string;
  percent: number;
  icon: string;
  amount: number;
};

type BudgetSectionProps = {
  tripDays: number;
  formattedBudget: string;
  hasNegativeBudgetInput: boolean;
  isBudgetAllocationVisible: boolean;
  allocationItems: BudgetAllocationItem[];
  onSelectTripDays: (tripDays: number) => void;
  onChangeBudget: (budgetText: string) => void;
  onSelectBudgetPreset: (budget: number) => void;
};

export function BudgetSection({
  tripDays,
  formattedBudget,
  hasNegativeBudgetInput,
  isBudgetAllocationVisible,
  allocationItems,
  onSelectTripDays,
  onChangeBudget,
  onSelectBudgetPreset,
}: BudgetSectionProps) {
  return (
    <>
      <SurveyQuestion
        indexLabel="Q2"
        title="하루 예산은 얼마인가요?"
        hint="입력한 예산을 항목별로 자동 배분해 드려요"
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
                aria-pressed={tripDays === day}
                onClick={() => onSelectTripDays(day)}
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
            value={formattedBudget}
            onChange={(event) => onChangeBudget(event.target.value)}
            aria-label="하루 예산"
          />
          <span className={styles.currencyUnit}>원</span>
        </label>

        <p className={styles.fieldHint}>
          {hasNegativeBudgetInput
            ? "음수는 입력할 수 없어요."
            : "숙박비를 제외한 가격을 입력해주세요!"}
        </p>
      </section>

      <section className={styles.presetSection}>
        <p className={styles.presetTitle}>예산대 예시 (탭하면 자동 입력)</p>
        <div className={styles.presetGrid}>
          {budgetPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={styles.presetButton}
              onClick={() => onSelectBudgetPreset(preset.value)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      {isBudgetAllocationVisible && (
        <section className={styles.allocationCard}>
          <h2 className={styles.allocationTitle}>
            권장 예산 배분 (1일 기준: {formattedBudget}원)
          </h2>

          <div className={styles.allocationList}>
            {allocationItems.map((item) => (
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
                    {item.amount.toLocaleString("ko-KR")}원 ({item.percent}%)
                  </span>
                </div>
                <div className={styles.allocationTrack}>
                  <span
                    className={styles.allocationFill}
                    style={{ width: `${item.percent}%` }}
                  />
                  <span
                    className={styles.allocationThumb}
                    style={{ left: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
