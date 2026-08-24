import { Link } from "react-router-dom";

import MapIcon from "@/shared/assets/svg/map.svg?react";
import { formatDistance } from "@/pages/route/utils/routeFormat";

import type { HomeSavedRouteItem } from "../api/types/home";
import { formatSavedDate, formatWonSign } from "../utils/homeFormat";

import * as styles from "./SavedRouteSummaryCard.css";

interface SavedRouteSummaryCardProps {
  route: HomeSavedRouteItem;
}

export function SavedRouteSummaryCard({ route }: SavedRouteSummaryCardProps) {
  return (
    <Link
      to={`/map/${route.id}?source=saved`}
      className={styles.row}
      aria-label={`${route.name} 지도 보기`}
    >
      <span className={styles.body}>
        <span className={styles.titleLine}>
          <strong className={styles.name}>{route.name}</strong>
          <span className={styles.leader} aria-hidden />
          <span className={styles.price}>
            {formatWonSign(route.savingAmount)}
          </span>
        </span>

        <span className={styles.meta}>
          {formatSavedDate(route.savedAt)} · {formatDistance(route.distanceKm)}
        </span>
      </span>

      {/* 줄 전체가 지도로 가는 링크지만, 눌러야 할 곳을 눈에 보이게 둡니다. */}
      <span className={styles.mapButton} aria-hidden>
        <MapIcon className={styles.mapIcon} />
        <span className={styles.mapLabel}>지도</span>
      </span>
    </Link>
  );
}
