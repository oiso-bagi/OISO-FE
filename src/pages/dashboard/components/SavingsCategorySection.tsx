import type { SavingsCategoryDto } from "@/shared/api/generated/types";
import { EmptyState } from "@/shared/components/EmptyState";

import { formatPercent, normalizePercent } from "../utils/dashboardFormat";
import * as styles from "../DashboardPage.css";

interface SavingsCategorySectionProps {
  categories: SavingsCategoryDto[];
}

export function SavingsCategorySection({
  categories,
}: SavingsCategorySectionProps) {
  return (
    <section className={styles.section} aria-labelledby="category-title">
      <h2 id="category-title" className={styles.sectionTitle}>
        항목별 절약 지수
      </h2>
      <p className={styles.sectionDescription}>
        관광지 가격 대비 얼마나 절약했는지를 나타내는 비율이에요.
      </p>

      {categories.length > 0 ? (
        <dl className={styles.categoryGrid}>
          {categories.map(({ label, savingRatePercent }) => {
            const normalizedPercent = normalizePercent(savingRatePercent);

            return (
              <div key={label} className={styles.categoryCard}>
                <dt className={styles.categoryLabel}>{label}</dt>
                <dd className={styles.categoryRate}>
                  <div className={styles.categoryRateChart}>
                    <svg
                      className={styles.categoryRateChartSvg}
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                    >
                      <circle
                        className={styles.categoryRateTrack}
                        cx="50"
                        cy="50"
                        r="42"
                        pathLength="100"
                      />
                      <circle
                        className={styles.categoryRateProgress}
                        cx="50"
                        cy="50"
                        r="42"
                        pathLength="100"
                        strokeDasharray={`${normalizedPercent} ${100 - normalizedPercent}`}
                      />
                    </svg>
                    <strong className={styles.categoryPercent}>
                      {formatPercent(savingRatePercent)}
                    </strong>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      ) : (
        // 같은 화면의 절약 내역이 이미 저장 목록으로 안내해 여기서는 반복하지 않습니다.
        <EmptyState
          className={styles.emptySection}
          title="쌓인 항목이 없습니다!!"
          description="여행을 완료하면 식비·교통비·체험비 절약 지수가 계산됩니다."
        />
      )}
    </section>
  );
}
