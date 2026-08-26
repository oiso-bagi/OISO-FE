import * as styles from "./EmptyState.css";

interface EmptyStateProps {
  title: string;
  description?: string;

  /** 다음에 할 일. 없으면 안내만 보여 줍니다. */
  actionLabel?: string;
  onAction?: () => void;

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
  onAction,
  actionVariant = "button",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={
        className ? `${styles.emptyState} ${className}` : styles.emptyState
      }
    >
      <strong className={styles.title}>{title}</strong>

      {description && <p className={styles.description}>{description}</p>}

      {actionLabel && onAction && (
        <button
          type="button"
          className={
            actionVariant === "link" ? styles.actionLink : styles.actionButton
          }
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
