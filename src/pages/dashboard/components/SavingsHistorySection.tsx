import { Link } from "react-router-dom";

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

              <div className={styles.historyAmountColumn}>
                <strong className={styles.historyAmount}>
                  -{formatWon(history.savedAmountWon)}
                </strong>

                {/*
                  저장 루트가 아니라 추천 루트로 엽니다. 기록은 저장을 지운
                  뒤에도 남아, 저장 상세로 열면 404 가 납니다.
                */}
                <Link
                  className={styles.historyDetailLink}
                  to={`/map/${encodeURIComponent(history.routeId)}?source=recommended`}
                >
                  상세 보기
                </Link>
              </div>
            </li>
          ))}
        </Card>
      ) : (
        <EmptyState
          className={styles.emptySection}
          title="다녀온 여행이 없습니다!!"
          description="저장한 루트에서 여행을 완료로 표시하면 절약이 쌓입니다."
          actionLabel="저장한 루트 보기"
          actionTo="/saved"
        />
      )}
    </section>
  );
}
