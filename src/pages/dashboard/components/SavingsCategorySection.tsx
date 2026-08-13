import type { SavingsCategoryDto } from "@/shared/api/generated/types";
import { Card } from "@/shared/components/Card";

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
        <Card className={styles.emptyCard}>
          아직 항목별 절약 기록이 없어요.
        </Card>
      )}
    </section>
  );
}
