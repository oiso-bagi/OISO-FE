import type { SavingsHistoryDto } from "@/shared/api/generated/types";
import { Card } from "@/shared/components/Card";

import { formatDisplayDate, formatWon } from "../utils/dashboardFormat";
import * as styles from "../DashboardPage.css";

interface SavingsHistorySectionProps {
  histories: SavingsHistoryDto[];
}

export function SavingsHistorySection({
  histories,
}: SavingsHistorySectionProps) {
  return (
    <section className={styles.section} aria-labelledby="history-title">
      <h2 id="history-title" className={styles.sectionTitle}>
        절약 내역
      </h2>

      {histories.length > 0 ? (
        <Card as="ul" className={styles.historyCard}>
          {histories.map((history) => (
            <li
              key={`${history.routeId}-${history.trippedAt}`}
              className={styles.historyItem}
            >
              <div>
                <h3 className={styles.historyTitle}>{history.routeName}</h3>
                <time
                  className={styles.historyDate}
                  dateTime={history.trippedAt}
                >
                  {formatDisplayDate(history.trippedAt)}
                </time>
              </div>
              <strong className={styles.historyAmount}>
                -{formatWon(history.savedAmountWon)}
              </strong>
            </li>
          ))}
        </Card>
      ) : (
        <Card className={styles.emptyCard}>
          아직 완료한 여행의 절약 기록이 없어요.
        </Card>
      )}
    </section>
  );
}
