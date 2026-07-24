import { Skeleton } from "./Skeleton";

import * as styles from "./RouteCardSkeleton.css";

interface RouteListSkeletonProps {
  count?: number;
}

/** RouteBox 모양의 로딩 스켈레톤 카드 */
export function RouteCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton width="55%" height="22px" />
      <Skeleton width="75%" height="16px" />

      <div className={styles.summaryRow}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} height="42px" />
        ))}
      </div>
    </div>
  );
}

/** 카드 목록 로딩 자리표시. count 만큼 카드를 보여줍니다. */
export function RouteListSkeleton({ count = 3 }: RouteListSkeletonProps) {
  return (
    <div className={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <RouteCardSkeleton key={index} />
      ))}
    </div>
  );
}
