import type { SelectedDay } from "../types/day";
import { DAY_COLOR_FOREGROUND, getDayColor } from "../utils/dayColor";

import * as styles from "./DayTabs.css";

interface DayTabsProps {
  /** 코스에 들어 있는 일차 목록. 오름차순으로 들어옵니다. */
  dayNumbers: number[];
  selectedDay: SelectedDay;
  onSelect: (day: SelectedDay) => void;
}

/** 다일 코스에서 볼 일차를 고르는 탭. 지도와 경유지 목록을 함께 걸러 냅니다. */
export function DayTabs({ dayNumbers, selectedDay, onSelect }: DayTabsProps) {
  return (
    /**
     * tablist/tab 역할은 탭 패널·방향키 이동·roving tabindex 를 함께 갖춰야
     * 보조 기술 사용자가 기대한 대로 쓸 수 있습니다. 이 탭은 패널을 여는 대신
     * 지도와 목록을 함께 거르는 토글 묶음이라 눌림 상태로 표현합니다.
     */
    <div className={styles.dayTabs} role="group" aria-label="일차 선택">
      <button
        type="button"
        aria-pressed={selectedDay === "all"}
        className={styles.dayTab}
        data-active={selectedDay === "all"}
        onClick={() => onSelect("all")}
      >
        전체
      </button>

      {/* 활성 탭은 지도 마커·경로선과 같은 색을 써 "1일차 = 1호선 주황" 을 맞춥니다. */}
      {dayNumbers.map((day) => (
        <button
          key={day}
          type="button"
          aria-pressed={selectedDay === day}
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
