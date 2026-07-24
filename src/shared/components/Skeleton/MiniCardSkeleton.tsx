import { Skeleton } from "./Skeleton";

import * as styles from "./MiniCardSkeleton.css";

/** 홈 저장 루트 요약 카드 모양의 로딩 스켈레톤 */
function MiniCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <Skeleton width="55%" height="18px" />
        <Skeleton width="20px" height="20px" />
      </div>

      <Skeleton width="35%" height="14px" />

      <div className={styles.metaRow}>
        <Skeleton width="40%" height="16px" />
        <Skeleton width="28%" height="16px" />
      </div>
    </div>
  );
}

/** 미니 카드 목록 로딩 자리표시 */
export function MiniCardListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <MiniCardSkeleton key={index} />
      ))}
    </div>
  );
}
