import type { LocalContributionDto } from "@/shared/api/generated/types";
import { Card } from "@/shared/components/Card";

import * as styles from "../DashboardPage.css";

interface LocalContributionCardProps {
  contribution: LocalContributionDto;
}

export function LocalContributionCard({
  contribution,
}: LocalContributionCardProps) {
  const score = Math.min(Math.max(contribution.scorePercent, 0), 100);

  return (
    <Card className={styles.contributionCard}>
      <h2 className={styles.contributionTitle}>로컬 기여 지수</h2>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label="로컬 기여 지수"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
      >
        <span className={styles.progressValue} style={{ width: `${score}%` }} />
      </div>
      <div className={styles.contributionInfo}>
        <div className={styles.contributionRow}>
          <span>{contribution.label}</span>
          <strong className={styles.contributionPercent}>{score}%</strong>
        </div>
        <p className={styles.contributionDescription}>{contribution.message}</p>
      </div>
    </Card>
  );
}
