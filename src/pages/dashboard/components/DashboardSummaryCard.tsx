import { Card } from "@/shared/components/Card";

import { formatWon } from "../utils/dashboardFormat";
import * as styles from "../DashboardPage.css";

interface DashboardSummaryCardProps {
  totalSavingsWon: number;
  tripCount: number;
  averageSavingsWon: number;
}

export function DashboardSummaryCard({
  totalSavingsWon,
  tripCount,
  averageSavingsWon,
}: DashboardSummaryCardProps) {
  return (
    <Card className={styles.summaryCard}>
      <p className={styles.summaryLabel}>누적 절약</p>
      <strong className={styles.totalSaving}>
        {formatWon(totalSavingsWon)}
      </strong>
      <p className={styles.summaryDescription}>
        {tripCount}번의 여행 · 회당 평균 {formatWon(averageSavingsWon)}
      </p>
    </Card>
  );
}
