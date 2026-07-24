import { createContext, useContext } from "react";

export interface ShowToastOptions {
  message: string;
  duration?: number;

  /** 전달하면 오른쪽에 액션 버튼(예: 실행취소)을 노출합니다. */
  actionLabel?: string;
  onAction?: () => void;
}

export type ShowToast = (options: ShowToastOptions) => void;

export const ToastContext = createContext<ShowToast>(() => {});

export const useToast = () => useContext(ToastContext);
