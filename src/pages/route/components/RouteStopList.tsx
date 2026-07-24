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

export function RouteStopList({ stops, onSave, isSaving }: RouteStopListProps) {
  return (
    <section className={styles.stopSection}>
      <h4 className={styles.stopSectionTitle}>경유지</h4>

      {stops.length === 0 && (
        <p className={styles.stopEmptyText}>등록된 경유지가 없어요.</p>
      )}

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
