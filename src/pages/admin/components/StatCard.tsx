import * as styles from "./ui.css";

interface StatCardProps {
  label: string;
  /** 이미 서식이 적용된 값. 자릿수 구분·반올림은 호출부에서 정합니다. */
  value: string;
  unit?: string;
  isPending?: boolean;
}

export function StatCard({ label, value, unit, isPending }: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>
        {isPending ? "—" : value}
        {!isPending && unit && <span className={styles.statUnit}>{unit}</span>}
      </div>
    </div>
  );
}
