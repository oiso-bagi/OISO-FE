import { formatPrice } from "../utils/routeFormat";

import * as styles from "./SavedRouteSummary.css";

interface SavedRouteSummaryProps {
  totalSavingAmount: number | null;
}

export function SavedRouteSummary({
  totalSavingAmount,
}: SavedRouteSummaryProps) {
  const formattedAmount =
    totalSavingAmount === null ? "-" : formatPrice(totalSavingAmount);

  return (
    <section className={styles.container}>
      <span className={styles.label}>저장 루트 누적 절약</span>
      <strong className={styles.amount}>{formattedAmount}</strong>
    </section>
  );
}
