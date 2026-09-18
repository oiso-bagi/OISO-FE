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
      <p className={styles.summaryLabel}>지금까지 완료한 여행의 누적 절약액</p>
      <strong className={styles.totalSaving}>
        {formatWon(totalSavingsWon)}
      </strong>
      <p className={styles.summaryDescription}>
        {tripCount}번의 여행 · 회당 평균 {formatWon(averageSavingsWon)}
      </p>
    </Card>
  );
}
