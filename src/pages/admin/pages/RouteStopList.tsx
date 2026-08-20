import { Fragment, useState } from "react";
import type { DragEvent } from "react";

import * as styles from "../components/ui.css";
import { MAX_DAY_NUMBER, TRANSPORT_OPTIONS } from "../constants";
import type { AdminRouteStop, TransportType } from "../types";

interface RouteStopListProps {
  stops: AdminRouteStop[];
  /** `toIndex` 는 배열 인덱스입니다. 서버 `sequence` 와 다릅니다. */
  onMove: (index: number, toIndex: number) => void;
  onChangeDay: (index: number, dayNumber: number) => void;
  onChangeNext: (
    index: number,
    patch: Partial<
      Pick<
        AdminRouteStop,
        "nextTransportType" | "nextTravelTimeMinutes" | "nextTravelCostWon"
      >
    >,
  ) => void;
  onRemove: (index: number) => void;
}

const DAY_OPTIONS = Array.from({ length: MAX_DAY_NUMBER }, (_, index) => ({
  value: index + 1,
  label: `${index + 1}일차`,
}));

/** 숫자 입력이 비면 0 으로 두고, 음수는 막습니다. */
const toNumber = (raw: string) => Math.max(0, Number(raw) || 0);

export function RouteStopList({
  stops,
  onMove,
  onChangeDay,
  onChangeNext,
  onRemove,
}: RouteStopListProps) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  /**
   * 손잡이만 draggable 로 둡니다. 행 전체에 걸면 안쪽 입력칸을 선택하려 할 때
   * 드래그가 시작돼 값을 고치기 어려워집니다.
   */
  const handleDragStart = (index: number) => (event: DragEvent) => {
    const row = (event.currentTarget as HTMLElement).closest("[data-stop-row]");

    // 손잡이만 끌리는 것처럼 보이지 않도록 행 전체를 드래그 이미지로 씁니다.
    if (row instanceof HTMLElement)
      event.dataTransfer.setDragImage(row, 12, 20);

    // Firefox 는 데이터가 있어야 드래그를 시작합니다.
    event.dataTransfer.setData("text/plain", String(index));
    event.dataTransfer.effectAllowed = "move";

    setDraggingIndex(index);
  };

  const handleDragOver = (index: number) => (event: DragEvent) => {
    if (draggingIndex === null) return;

    // preventDefault 를 해야 드롭이 허용됩니다.
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    setDropIndex(index);
  };

  const handleDrop = (index: number) => (event: DragEvent) => {
    event.preventDefault();

    if (draggingIndex !== null && draggingIndex !== index) {
      // 순서 입력과 같은 경로를 씁니다. 일차 따라가기·재정렬이 그대로 적용됩니다.
      onMove(draggingIndex, index);
    }

    setDraggingIndex(null);
    setDropIndex(null);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    setDropIndex(null);
  };

  if (stops.length === 0) {
    return (
      <section className={styles.panel}>
        <h2 className={styles.sectionTitle}>담은 경유지</h2>
        <p className={styles.tableStateCell}>
          왼쪽에서 장소를 검색해 코스에 담아 주세요.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>담은 경유지 {stops.length}곳</h2>

      <div className={styles.stopHeaderRow}>
        <span />
        <span>순서</span>
        <span>장소</span>
        <span>일차</span>
        <span>다음 이동</span>
        <span>소요(분)</span>
        <span>비용(원)</span>
        <span />
      </div>

      {stops.map((stop, index) => {
        const isLast = index === stops.length - 1;
        const previousDay = index === 0 ? null : stops[index - 1].dayNumber;
        const isDayStart = previousDay !== stop.dayNumber;

        const rowClassName = [
          styles.stopRow,
          isLast ? styles.stopRowLast : "",
          draggingIndex === index ? styles.stopRowDragging : "",
          dropIndex === index && draggingIndex !== index
            ? styles.stopRowDropTarget
            : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <Fragment key={stop.placeId}>
            {isDayStart && (
              <div className={styles.dayDivider}>{stop.dayNumber}일차</div>
            )}

            <div
              data-stop-row
              className={rowClassName}
              onDragOver={handleDragOver(index)}
              onDrop={handleDrop(index)}
            >
              <button
                type="button"
                draggable
                className={styles.dragHandle}
                aria-label={`${stop.placeName} 끌어서 순서 옮기기`}
                title="끌어서 순서를 옮깁니다"
                onDragStart={handleDragStart(index)}
                onDragEnd={handleDragEnd}
              >
                ⠿
              </button>

              {/*
               * 번호를 입력해도 같은 자리로 옮길 수 있습니다. 드래그가 어려운
               * 환경과 키보드만 쓰는 경우를 위해 둘 다 남겨 둡니다.
               *
               * 서버 `sequence` 는 0부터지만 "0번 경유지" 로 보이면 곤란해
               * 화면에서만 1부터로 표기하고, 입력값은 인덱스로 되돌립니다.
               */}
              <input
                type="number"
                className={styles.numberInput}
                value={index + 1}
                min={1}
                max={stops.length}
                aria-label={`${stop.placeName} 순서`}
                onChange={(event) =>
                  onMove(index, Number(event.target.value) - 1)
                }
              />

              <span className={styles.stopName}>
                <span>{stop.placeName}</span>
                <span className={`${styles.cellMuted} ${styles.cellEllipsis}`}>
                  {stop.address}
                </span>
              </span>

              <select
                className={`${styles.select} ${styles.stopSelect}`}
                value={stop.dayNumber}
                aria-label={`${stop.placeName} 일차`}
                onChange={(event) =>
                  onChangeDay(index, Number(event.target.value))
                }
              >
                {DAY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* 마지막 경유지는 다음 구간이 없어 입력을 막습니다. */}
              <select
                className={`${styles.select} ${styles.stopSelect}`}
                value={stop.nextTransportType ?? ""}
                disabled={isLast}
                aria-label={`${stop.placeName} 다음 이동수단`}
                onChange={(event) =>
                  onChangeNext(index, {
                    nextTransportType: event.target.value as TransportType,
                  })
                }
              >
                {isLast ? (
                  <option value="">—</option>
                ) : (
                  TRANSPORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                )}
              </select>

              <input
                type="number"
                className={styles.numberInput}
                value={stop.nextTravelTimeMinutes ?? ""}
                min={0}
                disabled={isLast}
                aria-label={`${stop.placeName} 다음 소요시간(분)`}
                onChange={(event) =>
                  onChangeNext(index, {
                    nextTravelTimeMinutes: toNumber(event.target.value),
                  })
                }
              />

              <input
                type="number"
                className={styles.numberInput}
                value={stop.nextTravelCostWon ?? ""}
                min={0}
                step={100}
                disabled={isLast}
                aria-label={`${stop.placeName} 다음 이동비용(원)`}
                onChange={(event) =>
                  onChangeNext(index, {
                    nextTravelCostWon: toNumber(event.target.value),
                  })
                }
              />

              <button
                type="button"
                className={styles.iconButton}
                aria-label={`${stop.placeName} 경유지에서 빼기`}
                onClick={() => onRemove(index)}
              >
                ✕
              </button>
            </div>
          </Fragment>
        );
      })}
    </section>
  );
}
