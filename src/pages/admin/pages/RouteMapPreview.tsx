import { useMemo, useState } from "react";

import type { RecommendedRouteStop } from "@/pages/route/api/types/recommendedRoute";
import { RouteMap } from "@/pages/route/components/RouteMap";

import * as styles from "../components/ui.css";
import { toRouteMapStops } from "../lib/routeMapStops";
import type { AdminRouteStop } from "../types";

interface RouteMapPreviewProps {
  stops: AdminRouteStop[];
  /** 목록과 함께 강조할 경유지 */
  selectedPlaceId: string | null;
  /** 핀을 누르면 그 장소 id 로, 빈 지도를 누르면 null 로 호출합니다. */
  onSelectPlace: (placeId: string | null) => void;
}

type DayFilter = number | "all";

/**
 * 코스 등록·수정 화면의 지도 미리보기.
 *
 * 서비스 추천 루트와 같은 지도를 써서, 등록한 코스가 사용자에게 어떻게 보일지
 * 담으면서 바로 확인합니다. 저장 전 코스는 실제 도로 좌표가 없어 경유지를
 * 점선으로 잇습니다.
 */
export function RouteMapPreview({
  stops,
  selectedPlaceId,
  onSelectPlace,
}: RouteMapPreviewProps) {
  const [dayFilter, setDayFilter] = useState<DayFilter>("all");

  /**
   * 구간 소요시간·비용을 고칠 때마다 경유지 배열이 새로 만들어집니다. 그대로
   * 넘기면 지도가 입력할 때마다 범위를 다시 맞춰 계속 튑니다. 지도에 쓰는 값만
   * 문자열로 비교해, 순서·일차·좌표가 바뀔 때만 새 배열을 만듭니다.
   */
  const mapStopsJson = JSON.stringify(toRouteMapStops(stops));
  const mapStops = useMemo(
    () => JSON.parse(mapStopsJson) as RecommendedRouteStop[],
    [mapStopsJson],
  );

  const dayNumbers = Array.from(
    new Set(stops.map((stop) => stop.dayNumber)),
  ).sort((a, b) => a - b);
  const isMultiDay = dayNumbers.length > 1;

  // 경유지를 옮기다 고른 일차가 사라지면 전체로 돌아갑니다.
  const activeDay =
    dayFilter !== "all" && dayNumbers.includes(dayFilter) ? dayFilter : "all";

  const selectedIndex = stops.findIndex(
    (stop) => stop.placeId === selectedPlaceId,
  );

  const handleSelectDay = (day: DayFilter) => {
    setDayFilter(day);
    onSelectPlace(null);
  };

  return (
    <section className={`${styles.panel} ${styles.builderSection}`}>
      <div className={styles.mapPreviewHeader}>
        <h2 className={styles.mapPreviewTitle}>코스 미리보기</h2>

        {isMultiDay && (
          <div
            className={styles.mapDayFilter}
            role="group"
            aria-label="지도에 표시할 일차"
          >
            {(["all", ...dayNumbers] as DayFilter[]).map((day) => (
              <button
                key={day}
                type="button"
                className={styles.mapDayButton}
                aria-pressed={activeDay === day}
                onClick={() => handleSelectDay(day)}
              >
                {day === "all" ? "전체" : `${day}일차`}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.mapPreviewArea}>
        <RouteMap
          stops={mapStops}
          selectedDay={activeDay === "all" ? undefined : activeDay}
          selectedStopSequence={selectedIndex === -1 ? null : selectedIndex + 1}
          onSelectStop={(sequence) =>
            onSelectPlace(
              sequence === null ? null : (stops[sequence - 1]?.placeId ?? null),
            )
          }
          showCallout={false}
          pathStyle="dashed"
        />
      </div>

      <p className={styles.mapPreviewNote}>
        {stops.length === 0
          ? "장소를 담으면 방문 순서대로 지도에 표시됩니다."
          : "경유지 사이는 순서를 보여 주는 점선입니다. 실제 이동 경로와 다를 수 있습니다. 핀을 누르면 아래 목록에서 해당 경유지를 찾아 줍니다."}
      </p>
    </section>
  );
}
