import { useEffect, useId, useRef } from "react";

import { Button } from "./Button";
import * as styles from "./ui.css";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  /** 되돌리기 어려운 동작이면 확인 버튼을 경고색으로 바꿉니다. */
  isDanger?: boolean;
  confirmLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 되돌리기 어려운 동작(정지·권한 변경·게시 전환) 앞에 한 번 끊어 줍니다.
 *
 * 목록에서 토글은 클릭 한 번이라 실수하기 쉽고, 실수한 대상이 무엇인지도
 * 바로 드러나지 않습니다. 그래서 대상 이름을 문구에 넣어 확인시킵니다.
 */
export function ConfirmDialog({
  isOpen,
  title,
  description,
  isDanger = false,
  confirmLabel = "확인",
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  /** 닫힌 뒤 원래 있던 자리로 포커스를 돌려놓기 위해 기억해 둡니다. */
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    // 열리면 확인 버튼으로 포커스를 옮겨 키보드만으로 처리할 수 있게 합니다.
    confirmRef.current?.focus();

    return () => openerRef.current?.focus();
  }, [isOpen]);

  /**
   * 포커스를 모달 안에 가둡니다.
   *
   * 가두지 않으면 Tab 으로 뒤쪽 목록의 토글까지 갈 수 있어, 확인을 받으려고
   * 띄운 모달 뒤에서 다른 행을 그대로 바꿔버릴 수 있습니다.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      // 양 끝에서 넘어가려 하면 반대쪽으로 되돌려 순환시킵니다.
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (
        active instanceof Node &&
        !dialogRef.current?.contains(active)
      ) {
        // 어떤 이유로든 밖에 나가 있으면 다시 안으로 들입니다.
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.dialogOverlay}
      // 바깥을 눌러 닫는 건 취소로 봅니다. 확인은 버튼으로만 가능합니다.
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.dialogBody}>
          <h2 id={titleId} className={styles.dialogTitle}>
            {title}
          </h2>
          <p className={styles.dialogDescription}>{description}</p>
        </div>

        <div className={styles.dialogActions}>
          <Button onClick={onCancel} disabled={isPending}>
            취소
          </Button>
          <Button
            ref={confirmRef}
            tone={isDanger ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "처리 중…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
