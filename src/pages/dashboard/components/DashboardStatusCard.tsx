import { Card } from "@/shared/components/Card";

import * as styles from "../DashboardPage.css";

interface DashboardStatusCardProps {
  isError: boolean;
  onRetry: () => void;
}

export function DashboardStatusCard({
  isError,
  onRetry,
}: DashboardStatusCardProps) {
  if (!isError) {
    return (
      <Card className={styles.statusCard} role="status" aria-live="polite">
        절약 기록을 불러오고 있어요...
      </Card>
    );
  }

  return (
    <Card className={styles.statusCard} role="alert">
      <p>절약 기록을 불러오지 못했어요.</p>
      <button type="button" className={styles.retryButton} onClick={onRetry}>
        다시 시도
      </button>
    </Card>
  );
}
