import SaveIcon from "@/shared/assets/svg/save.svg?react";

import type { RecommendedRouteStop } from "../api/types/recommendedRoute";
import { formatDuration, formatStopTransportation } from "../utils/routeFormat";

import * as styles from "./RouteStopList.css";

interface RouteStopListProps {
  stops: RecommendedRouteStop[];

  /** 전달하면 목록 하단에 저장 버튼을 노출합니다. */
  onSave?: () => void;
}

export function RouteStopList({ stops, onSave }: RouteStopListProps) {
  return (
    <section className={styles.stopSection}>
      <h4 className={styles.stopSectionTitle}>경유지</h4>

      <ol className={styles.stopList}>
        {stops.map((stop, index) => (
          <li key={stop.id} className={styles.stopListItem}>
            <div className={styles.stopBox}>
              <span className={styles.stopOrder}>{stop.order}</span>

              <div className={styles.stopContent}>
                <strong className={styles.stopName}>{stop.name}</strong>

                <div className={styles.stopTagList}>
                  <span className={styles.stopTag}>{stop.category}</span>

                  <span className={styles.stopTag}>
                    {stop.operatingHours ?? "운영시간 정보 없음"}
                  </span>
                </div>
              </div>
            </div>

            {index < stops.length - 1 && stop.transportationToNext && (
              <div className={styles.stopConnection}>
                <span aria-hidden>↓</span>

                <span>
                  {formatStopTransportation(stop.transportationToNext)}{" "}
                  {formatDuration(stop.durationToNextMinutes)}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>

      {onSave && (
        <button type="button" className={styles.saveButton} onClick={onSave}>
          <SaveIcon className={styles.saveIcon} aria-hidden />
          저장
        </button>
      )}
    </section>
  );
}

export default RouteStopList;
