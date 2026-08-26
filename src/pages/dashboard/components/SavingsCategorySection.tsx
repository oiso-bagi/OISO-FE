import type { SavingsCategoryDto } from "@/shared/api/generated/types";
import { EmptyState } from "@/shared/components/EmptyState";

import { formatWon } from "../utils/dashboardFormat";
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
        항목별 절약
      </h2>

      {categories.length > 0 ? (
        <dl className={styles.categoryGrid}>
          {categories.map(({ label, amountWon }) => (
            <div key={label} className={styles.categoryCard}>
              <dt className={styles.categoryLabel}>{label}</dt>
              <dd className={styles.categoryAmount}>{formatWon(amountWon)}</dd>
            </div>
          ))}
        </dl>
      ) : (
        // 같은 화면의 절약 내역이 이미 저장 목록으로 안내해 여기서는 반복하지 않습니다.
        <EmptyState
          className={styles.emptySection}
          title="쌓인 항목이 없습니다!!"
          description="여행을 완료하면 식비·교통비·체험비로 나눠 담깁니다."
        />
      )}
    </section>
  );
}
