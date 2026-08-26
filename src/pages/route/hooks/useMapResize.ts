import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
} from "react";

import type { MapResizeHandlers } from "../types/mapResize";

/** 접지 않은 상태에서 지도가 가질 수 있는 가장 작은 높이 */
const MIN_HEIGHT = 140;

/** 손잡이를 이 높이 아래로 끌어내리면 지도를 완전히 접습니다. */
const COLLAPSE_THRESHOLD = 90;

/** 지도가 차지할 수 있는 화면 최대 비율 */
const MAX_RATIO = 0.7;

/** 지도를 최대로 키워도 목록에 남겨 두는 높이. 카드 한 장은 보여야 합니다. */
const MIN_LIST_HEIGHT = 160;

/** 방향키 한 번에 움직이는 양 */
const KEY_STEP = 40;

/** 이 거리 안에서 손을 떼면 드래그가 아니라 탭(접기/펼치기)으로 봅니다. */
const TAP_SLOP = 4;

/**
 * 지도와 목록의 비율을 사용자가 조절하게 합니다.
 *
 * 높이는 사용자가 손대기 전까지 `null` 로 두어 CSS 기본값(45dvh)을 그대로
 * 씁니다. 처음부터 px 로 고정하면 화면 회전이나 주소창 등장에 따라오지
 * 못합니다.
 *
 * @param mapRef  높이를 잴 지도 영역. 드래그 시작 높이를 여기서 읽습니다.
 * @param listRef 지도가 밀어낼 목록 영역. 상한을 재는 데 씁니다.
 */
export function useMapResize(
  mapRef: RefObject<HTMLElement | null>,
  listRef: RefObject<HTMLElement | null>,
) {
  const [height, setHeight] = useState<number | null>(null);

  /**
   * 지도가 커질 수 있는 한계.
   *
   * 화면 비율만으로 자르면 짧은 화면에서 목록이 0px 이 됩니다. 추천 화면의
   * 부모는 높이가 고정이고 헤더·일차 탭·손잡이는 줄지 않아, 지도가 늘어난
   * 만큼 목록이 그대로 깎이기 때문입니다. 부모의 실제 높이에서 줄지 않는
   * 영역과 목록 최소 높이를 빼 상한을 구하고, 화면 비율과 비교해 작은 쪽을
   * 씁니다.
   *
   * 지도와 목록의 현재 높이 대신 부모와 고정 영역을 재는 이유는, 진입 시점에
   * 이미 넘칠 수 있어(45dvh 가 부모보다 큰 경우) 현재 높이를 기준으로 삼으면
   * 상한이 함께 틀어지기 때문입니다.
   *
   * 지도 상세 화면처럼 목록이 페이지와 함께 흐르는 경우에는 부모가 내용만큼
   * 커져 화면 비율 쪽이 걸립니다.
   */
  const maxHeight = useCallback(() => {
    const ratioLimit = Math.round(window.innerHeight * MAX_RATIO);

    const mapElement = mapRef.current;
    const listElement = listRef.current;
    const parent = mapElement?.parentElement;
    if (!mapElement || !listElement || !parent) return ratioLimit;

    // 헤더·일차 탭·손잡이처럼 지도가 커져도 줄지 않는 형제들.
    const fixedHeight = Array.from(parent.children)
      .filter((child) => child !== mapElement && child !== listElement)
      .reduce(
        (total, child) => total + child.getBoundingClientRect().height,
        0,
      );

    const available = parent.clientHeight - fixedHeight - MIN_LIST_HEIGHT;

    return Math.max(MIN_HEIGHT, Math.min(ratioLimit, available));
  }, [listRef, mapRef]);

  const clampSize = useCallback(
    (value: number) => Math.min(Math.max(value, MIN_HEIGHT), maxHeight()),
    [maxHeight],
  );

  /** 드래그는 아주 작게 줄였을 때 접힌 상태로 넘어갑니다. */
  const clampDrag = useCallback(
    (value: number) => (value <= COLLAPSE_THRESHOLD ? 0 : clampSize(value)),
    [clampSize],
  );

  /** 접기 직전 높이. 다시 펼칠 때 그대로 되돌립니다. */
  const restoreHeightRef = useRef<number | null>(null);

  const dragRef = useRef<{
    startY: number;
    startHeight: number;
    hasMoved: boolean;
  } | null>(null);

  const isCollapsed = height === 0;

  /** 지금 높이. 아직 손대지 않았으면 실제 렌더된 높이를 잽니다. */
  const currentHeight = useCallback(
    () => height ?? mapRef.current?.getBoundingClientRect().height ?? 0,
    [height, mapRef],
  );

  /** 접기 전 높이를 기억해 두고 적용합니다. */
  const applyHeight = useCallback((next: number) => {
    if (next !== 0) restoreHeightRef.current = next;
    setHeight(next);
  }, []);

  const toggle = useCallback(
    (fallbackHeight: number) => {
      setHeight((previous) => {
        const now = previous ?? fallbackHeight;
        if (now !== 0) return 0;

        // 손대기 전에 접었으면 기억해 둔 높이가 없어 CSS 기본값으로 돌아갑니다.
        const restored = restoreHeightRef.current;
        return restored === null ? null : clampSize(restored);
      });
    },
    [clampSize],
  );

  // 화면이 작아지면 고정해 둔 높이가 최대치를 넘길 수 있습니다.
  useEffect(() => {
    const handleResize = () =>
      setHeight((previous) =>
        previous === null || previous === 0 ? previous : clampSize(previous),
      );

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [clampSize]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const element = mapRef.current;
      if (!element) return;

      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = {
        startY: event.clientY,
        startHeight: element.getBoundingClientRect().height,
        hasMoved: false,
      };
    },
    [mapRef],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const drag = dragRef.current;
      if (!drag) return;

      const delta = event.clientY - drag.startY;
      if (Math.abs(delta) > TAP_SLOP) drag.hasMoved = true;
      if (!drag.hasMoved) return;

      applyHeight(clampDrag(drag.startHeight + delta));
    },
    [applyHeight, clampDrag],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLElement>, shouldToggleOnTap: boolean) => {
      const drag = dragRef.current;
      if (!drag) return;

      dragRef.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      // 움직이지 않았으면 손잡이를 누른 것이므로 접기/펼치기로 처리합니다.
      if (shouldToggleOnTap && !drag.hasMoved) toggle(drag.startHeight);
    },
    [toggle],
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => endDrag(event, true),
    [endDrag],
  );

  const onPointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => endDrag(event, false),
    [endDrag],
  );

  /**
   * 위/아래 방향키로도 조절합니다. 접힌 상태에서는 방향키가 최소 높이로
   * 펼치고, 접기는 Enter/Space 가 맡습니다.
   */
  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const step = event.key === "ArrowUp" ? -KEY_STEP : KEY_STEP;
        applyHeight(clampSize(currentHeight() + step));
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle(currentHeight());
      }
    },
    [applyHeight, clampSize, currentHeight, toggle],
  );

  /**
   * 접힌 지도는 0px 이어야 하는데 CSS 에 `min-height` 가 걸려 있어 함께
   * 풀어 줍니다.
   */
  const mapStyle: CSSProperties | undefined =
    height === null ? undefined : { height: `${height}px`, minHeight: 0 };

  return {
    mapStyle,
    isCollapsed,
    resizeProps: {
      isCollapsed,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onKeyDown,
    } satisfies MapResizeHandlers,
  };
}
