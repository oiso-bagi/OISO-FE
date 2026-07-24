import { Link } from "react-router-dom";

import DownIcon from "@/shared/assets/svg/down.svg?react";
import MapIcon from "@/shared/assets/svg/map.svg?react";
import NavigationIcon from "@/shared/assets/svg/home_location.svg?react";
import { formatDistance, formatPrice } from "@/pages/route/utils/routeFormat";

import type { HomeSavedRouteItem } from "../api/types/home";
import { formatSavedDate } from "../utils/homeFormat";

import * as styles from "./SavedRouteSummaryCard.css";

interface SavedRouteSummaryCardProps {
  route: HomeSavedRouteItem;
}

export function SavedRouteSummaryCard({ route }: SavedRouteSummaryCardProps) {
  return (
    <Link
      to={`/map/${route.id}?source=saved`}
      className={styles.card}
      aria-label={`${route.name} 지도 보기`}
    >
      <div className={styles.header}>
        <strong className={styles.name}>{route.name}</strong>

        <MapIcon className={styles.mapIcon} aria-hidden />
      </div>

      <span className={styles.date}>{formatSavedDate(route.savedAt)}</span>

      <div className={styles.divider} />

      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          <DownIcon className={styles.savingIcon} aria-hidden />
          {formatPrice(route.savingAmount)}
        </span>

        <span className={styles.metaItem}>
          <NavigationIcon className={styles.distanceIcon} aria-hidden />
          {formatDistance(route.distanceKm)}
        </span>
      </div>
    </Link>
  );
}
