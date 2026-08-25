import SaveIcon from "@/shared/assets/svg/save.svg?react";

import type { RecommendedRouteStop } from "../api/types/recommendedRoute";
import { formatDuration, formatStopTransportation } from "../utils/routeFormat";

import * as styles from "./RouteStopList.css";

interface RouteStopListProps {
  stops: RecommendedRouteStop[];

  /** 전달하면 목록 하단에 저장 버튼을 노출합니다. */
  onSave?: () => void;
  /** 저장 진행 중이면 버튼을 비활성화해 중복 저장을 막습니다. */
  isSaving?: boolean;
}

/** 다일 코스일 때만 일차별로 묶습니다. 단일 일차는 기존처럼 평면 리스트로 표시합니다. */
const groupStopsByDay = (stops: RecommendedRouteStop[]) => {
  const dayNumbers = Array.from(new Set(stops.map((stop) => stop.dayNumber)));
  if (dayNumbers.length <= 1) return [{ dayNumber: null, stops }];

  return dayNumbers
    .sort((a, b) => a - b)
    .map((dayNumber) => ({
      dayNumber,
      stops: stops.filter((stop) => stop.dayNumber === dayNumber),
    }));
};

export function RouteStopList({ stops, onSave, isSaving }: RouteStopListProps) {
  const dayGroups = groupStopsByDay(stops);

  return (
    <section className={styles.stopSection}>
      <h4 className={styles.stopSectionTitle}>경유지</h4>

      {stops.length === 0 && (
        <p className={styles.stopEmptyText}>등록된 경유지가 없어요.</p>
      )}

      {dayGroups.map((group, groupIndex) => (
        <div key={group.dayNumber ?? "single"} className={styles.dayGroup}>
          {group.dayNumber !== null && (
            <p
              className={
                groupIndex === 0
                  ? styles.dayLabel
                  : `${styles.dayLabel} ${styles.dayLabelSpaced}`
              }
            >
              {group.dayNumber}일차
            </p>
          )}

          <ol className={styles.stopList}>
            {group.stops.map((stop, index) => {
              /**
               * 구간 정보(이동수단·소요시간)는 도착하는 경유지가 들고 있습니다.
               * 그래서 이 경유지와 다음 경유지 사이 연결선에는 다음 경유지의
               * 값을 그립니다.
               */
              const nextStop = group.stops[index + 1];

              return (
                <li key={stop.sequence} className={styles.stopListItem}>
                  <div className={styles.stopBox}>
                    <span className={styles.stopOrder}>{stop.sequence}</span>

                    <div className={styles.stopContent}>
                      <strong className={styles.stopName}>
                        {stop.placeName}
                      </strong>

                      <div className={styles.stopTagList}>
                        {stop.category && (
                          <span className={styles.stopTag}>
                            {stop.category}
                          </span>
                        )}

                        <span className={styles.stopTag}>
                          {stop.operatingHours ?? "운영시간 정보 없음"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {nextStop?.transportationFromPrevious && (
                    <div className={styles.stopConnection}>
                      <span aria-hidden>↓</span>

                      <span>
                        {formatStopTransportation(
                          nextStop.transportationFromPrevious,
                        )}{" "}
                        {formatDuration(nextStop.durationFromPreviousMinutes)}
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      ))}

      {onSave && (
        <button
          type="button"
          className={styles.saveButton}
          onClick={onSave}
          disabled={isSaving}
        >
          <SaveIcon className={styles.saveIcon} aria-hidden />
          저장
        </button>
      )}
    </section>
  );
}
