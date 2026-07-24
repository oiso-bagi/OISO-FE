import { useEffect } from "react";

import * as styles from "./Toast.css";

interface ToastProps {
  open: boolean;
  message: string;
  duration?: number;
  onClose: () => void;

  /** 전달하면 오른쪽에 액션 버튼(예: 실행취소)을 노출합니다. 없으면 메시지만. */
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * 하단에 잠깐 뜨는 토스트. duration 후 자동 닫힘.
 * 저장 성공 같은 알림, 또는 실행취소 액션이 있는 알림에 재사용.
 */
export function Toast({
  open,
  message,
  duration = 4000,
  onClose,
  actionLabel,
  onAction,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(onClose, duration);

    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.toast} role="status">
        <span className={styles.message}>{message}</span>

        {actionLabel && onAction && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
