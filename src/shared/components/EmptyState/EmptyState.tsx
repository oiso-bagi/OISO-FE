import { Link } from "react-router-dom";

import * as styles from "./EmptyState.css";

interface EmptyStateProps {
  title: string;
  description?: string;

  actionLabel?: string;

  /**
   * 다음에 갈 화면.
   *
   * 지금 쓰이는 빈 상태의 다음 행동은 모두 화면 이동이라 링크만 받습니다.
   * 버튼으로 그리면 새 탭 열기와 링크 대상 확인을 쓸 수 없습니다.
   */
  actionTo?: string;

  /**
   * 화면에 이미 큰 CTA 가 있는 자리(홈)에서는 `link` 로 낮춰 버튼이 둘로
   * 보이지 않게 합니다.
   */
  actionVariant?: "button" | "link";

  className?: string;
}

/**
 * 목록이 비었을 때의 안내와 다음 행동.
 *
 * 안내 문구만 있으면 사용자가 무엇을 해야 채워지는지 알 수 없어, 화면마다
 * 다음 행동을 함께 받습니다.
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  actionVariant = "button",
  className,
}: EmptyStateProps) {
  const actionClassName =
    actionVariant === "link" ? styles.actionLink : styles.actionButton;

  return (
    <div
      className={
        className ? `${styles.emptyState} ${className}` : styles.emptyState
      }
    >
      <strong className={styles.title}>{title}</strong>

      {description && <p className={styles.description}>{description}</p>}

      {actionLabel && actionTo && (
        <Link to={actionTo} className={actionClassName}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
