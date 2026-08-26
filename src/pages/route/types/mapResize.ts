import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

/**
 * `useMapResize` 가 만들어 손잡이에 그대로 넘기는 핸들러 묶음.
 *
 * 훅과 컴포넌트 양쪽에서 쓰이므로 어느 한쪽에 두지 않습니다.
 */
export interface MapResizeHandlers {
  isCollapsed: boolean;
  onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void;
}
