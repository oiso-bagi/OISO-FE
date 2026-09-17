import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

import CheckIcon from "@/shared/assets/svg/check.svg?react";
import SaveIcon from "@/shared/assets/svg/save.svg?react";

import type { RecommendedRouteStop } from "../api/types/recommendedRoute";
import { formatDuration, formatStopTransportation } from "../utils/routeFormat";

import { StopDetailSheet } from "./StopDetailSheet";
import * as styles from "./RouteStopList.css";

interface RouteStopListProps {
  stops: RecommendedRouteStop[];

  /**
   * 전달하면 목록 하단에 저장 버튼을 노출합니다. 저장하지 않은 코스는 저장,
   * 저장한 코스는 저장 취소로 누릅니다.
   */
  onToggleSave?: () => void;
  /** 저장·취소 요청 중이면 버튼을 비활성화해 중복 요청을 막습니다. */
  isSaving?: boolean;
  /** 이미 저장한 코스면 버튼을 "저장됨" 상태로 보여 줍니다. */
  isSaved?: boolean;
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

export function RouteStopList({
  stops,
  onToggleSave,
  isSaving,
  isSaved,
}: RouteStopListProps) {
  const dayGroups = groupStopsByDay(stops);
  const isMultiDay = dayGroups[0]?.dayNumber !== null;

  // 장소 정보 시트에 띄운 경유지 (null 이면 닫힘)
  const [selectedStop, setSelectedStop] = useState<RecommendedRouteStop | null>(
    null,
  );

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
                  {/* 버튼 안에는 div 를 둘 수 없어 span 으로 묶습니다. */}
                  <button
                    type="button"
                    className={`${styles.stopBox} ${styles.stopButton}`}
                    aria-haspopup="dialog"
                    onClick={() => setSelectedStop(stop)}
                  >
                    <span className={styles.stopOrder}>{stop.sequence}</span>

                    <span className={styles.stopContent}>
                      <strong className={styles.stopName}>
                        {stop.placeName}
                      </strong>

                      <span className={styles.stopTagList}>
                        {stop.category && (
                          <span className={styles.stopTag}>
                            {stop.category}
                          </span>
                        )}

                        <span className={styles.stopTag}>
                          {stop.operatingHours ?? "운영시간 정보 없음"}
                        </span>
                      </span>
                    </span>

                    <FaChevronRight
                      className={styles.stopChevron}
                      aria-hidden="true"
                    />
                  </button>

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

      {onToggleSave && (
        <button
          type="button"
          className={styles.saveButton}
          data-saved={isSaved}
          aria-pressed={isSaved}
          onClick={onToggleSave}
          disabled={isSaving}
        >
          {isSaved ? (
            <CheckIcon className={styles.saveIcon} aria-hidden />
          ) : (
            <SaveIcon
              className={`${styles.saveIcon} ${styles.saveIconSolid}`}
              aria-hidden
            />
          )}
          {isSaved ? "저장됨" : "저장"}
        </button>
      )}

      {selectedStop && (
        <StopDetailSheet
          stop={selectedStop}
          isMultiDay={isMultiDay}
          onClose={() => setSelectedStop(null)}
        />
      )}
    </section>
  );
}
