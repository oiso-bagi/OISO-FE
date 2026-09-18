import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import type { SavingsHistoryDto } from "@/shared/api/generated/types";
import { Card } from "@/shared/components/Card";
import { EmptyState } from "@/shared/components/EmptyState";

import { formatDisplayDate, formatWon } from "../utils/dashboardFormat";
import * as styles from "../DashboardPage.css";

interface SavingsHistorySectionProps {
  histories: SavingsHistoryDto[];
  isPending: boolean;
  isInitialError: boolean;
  isFetchingNextPage: boolean;
  isNextPageError: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  onRetry: () => void;
}

export function SavingsHistorySection({
  histories,
  isPending,
  isInitialError,
  isFetchingNextPage,
  isNextPageError,
  hasNextPage,
  onLoadMore,
  onRetry,
}: SavingsHistorySectionProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasNextPage || isFetchingNextPage || isNextPageError) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        observer.unobserve(target);
        onLoadMore();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, isNextPageError, onLoadMore]);

  return (
    <section className={styles.section} aria-labelledby="history-title">
      <h2 id="history-title" className={styles.sectionTitle}>
        절약 내역
      </h2>

      {isPending && (
        <Card className={styles.historyStatusCard} role="status">
          절약 내역을 불러오고 있어요...
        </Card>
      )}

      {isInitialError && (
        <Card className={styles.historyStatusCard} role="alert">
          <p>절약 내역을 불러오지 못했어요.</p>
          <button
            type="button"
            className={styles.retryButton}
            onClick={onRetry}
          >
            다시 시도
          </button>
        </Card>
      )}

      {!isPending && !isInitialError && histories.length > 0 && (
        <>
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

          {(hasNextPage || isFetchingNextPage || isNextPageError) && (
            <div
              ref={loadMoreRef}
              className={styles.historyLoadMore}
              aria-live="polite"
            >
              {isFetchingNextPage && (
                <span role="status">절약 내역을 더 불러오고 있어요...</span>
              )}

              {isNextPageError && (
                <div className={styles.historyLoadMoreError} role="alert">
                  <span>다음 내역을 불러오지 못했어요.</span>
                  <button
                    type="button"
                    className={styles.historyLoadMoreRetryButton}
                    onClick={onLoadMore}
                  >
                    다시 시도
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {!isPending && !isInitialError && histories.length === 0 && (
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
