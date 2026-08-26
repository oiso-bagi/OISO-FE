import * as styles from "./CompletionBar.css";

interface CompletionBarProps {
  isCompleted: boolean;
  /** 요청 중이면 토글을 잠가 중복 요청을 막습니다. */
  isDisabled?: boolean;
  onToggle: () => void;
}

/** 여행 중에 보는 지도 화면에서 바로 완료를 체크하게 합니다. */
export function CompletionBar({
  isCompleted,
  isDisabled,
  onToggle,
}: CompletionBarProps) {
  return (
    <div className={styles.completionBar}>
      <span className={styles.label}>
        {isCompleted ? "여행을 완료했어요" : "여행을 완료하셨나요?"}
      </span>

      <button
        type="button"
        role="switch"
        className={styles.toggleButton}
        data-checked={isCompleted}
        aria-checked={isCompleted}
        aria-label={isCompleted ? "여행 완료 취소" : "여행 완료로 표시"}
        disabled={isDisabled}
        onClick={onToggle}
      >
        <span className={styles.toggleThumb} data-checked={isCompleted} />
      </button>
    </div>
  );
}
