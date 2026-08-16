import type { ReactNode } from "react";

import * as styles from "./ui.css";

type BadgeTone = keyof typeof styles.badgeTone;

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

/** 목록에서 상태·권한처럼 짧은 값을 눈에 띄게 표시합니다. */
export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles.badgeTone[tone]}`}>
      {children}
    </span>
  );
}
