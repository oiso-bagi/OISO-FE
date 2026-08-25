import type { MapResizeHandleProps } from "../hooks/useMapResize";

import * as styles from "./MapResizeHandle.css";

interface Props extends MapResizeHandleProps {
  /** 이 손잡이가 조절하는 지도 영역의 id */
  controlsId: string;
}

/**
 * 지도 크기를 조절하는 손잡이.
 *
 * 끌면 비율이 바뀌고, 그냥 누르면 접거나 펼칩니다. 드래그만 두면 손잡이가
 * 있는지 알기 어렵고 키보드로는 아예 쓸 수 없어 두 방식을 함께 답니다.
 */
export function MapResizeHandle({
  controlsId,
  isCollapsed,
  ...handlers
}: Props) {
  return (
    <button
      type="button"
      className={styles.handle}
      aria-label={isCollapsed ? "지도 펼치기" : "지도 접기"}
      aria-expanded={!isCollapsed}
      aria-controls={controlsId}
      {...handlers}
    >
      <span className={styles.grip} />
    </button>
  );
}
