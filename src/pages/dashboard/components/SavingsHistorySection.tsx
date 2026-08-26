import { useNavigate } from "react-router-dom";

import type { SavingsHistoryDto } from "@/shared/api/generated/types";
import { Card } from "@/shared/components/Card";
import { EmptyState } from "@/shared/components/EmptyState";

import { formatDisplayDate, formatWon } from "../utils/dashboardFormat";
import * as styles from "../DashboardPage.css";

interface SavingsHistorySectionProps {
  histories: SavingsHistoryDto[];
}

export function SavingsHistorySection({
  histories,
}: SavingsHistorySectionProps) {
  const navigate = useNavigate();

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
        <EmptyState
          className={styles.emptySection}
          title="다녀온 여행이 없습니다!!"
          description="저장한 루트에서 여행을 완료로 표시하면 절약이 쌓입니다."
          actionLabel="저장한 루트 보기"
          onAction={() => navigate("/saved")}
        />
      )}
    </section>
  );
}
