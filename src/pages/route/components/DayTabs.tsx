import { DAY_COLOR_FOREGROUND, getDayColor } from "../utils/dayColor";

import * as styles from "./DayTabs.css";

export type SelectedDay = number | "all";

interface DayTabsProps {
  /** 코스에 들어 있는 일차 목록. 오름차순으로 들어옵니다. */
  dayNumbers: number[];
  selectedDay: SelectedDay;
  onSelect: (day: SelectedDay) => void;
}

/** 다일 코스에서 볼 일차를 고르는 탭. 지도와 경유지 목록을 함께 걸러 냅니다. */
export function DayTabs({ dayNumbers, selectedDay, onSelect }: DayTabsProps) {
  return (
    <div className={styles.dayTabs} role="tablist" aria-label="일차 선택">
      <button
        type="button"
        role="tab"
        aria-selected={selectedDay === "all"}
        className={styles.dayTab}
        data-active={selectedDay === "all"}
        onClick={() => onSelect("all")}
      >
        전체
      </button>

      {/* 활성 탭은 지도 마커·경로선과 같은 색을 써 "1일차 = 파랑" 을 맞춥니다. */}
      {dayNumbers.map((day) => (
        <button
          key={day}
          type="button"
          role="tab"
          aria-selected={selectedDay === day}
          className={styles.dayTab}
          data-active={selectedDay === day}
          style={
            selectedDay === day
              ? {
                  backgroundColor: getDayColor(day),
                  color: DAY_COLOR_FOREGROUND,
                }
              : undefined
          }
          onClick={() => onSelect(day)}
        >
          {day}일차
        </button>
      ))}
    </div>
  );
}
