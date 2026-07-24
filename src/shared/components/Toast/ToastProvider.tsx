import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";

import { Toast } from "./Toast";
import {
  ToastContext,
  type ShowToast,
  type ShowToastOptions,
} from "./toastContext";

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * 앱 전역 토스트. 어디서든 useToast()로 호출합니다.
 *   const showToast = useToast();
 *   showToast({ message: "저장되었습니다" });
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ShowToastOptions | null>(null);
  // 연속 호출 시 Toast 를 remount 해 자동 종료 타이머를 리셋합니다.
  const keyRef = useRef(0);

  const showToast = useCallback<ShowToast>((options) => {
    keyRef.current += 1;
    setToast(options);
  }, []);

  // onClose 를 안정적으로 유지해 Toast 의 자동 종료 타이머가 리셋되지 않게 합니다.
  const close = useCallback(() => setToast(null), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      {toast && (
        <Toast
          key={keyRef.current}
          isOpen
          message={toast.message}
          duration={toast.duration}
          actionLabel={toast.actionLabel}
          onAction={
            toast.onAction
              ? () => {
                  toast.onAction?.();
                  close();
                }
              : undefined
          }
          onClose={close}
        />
      )}
    </ToastContext.Provider>
  );
}
