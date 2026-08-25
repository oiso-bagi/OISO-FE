import { Fragment } from "react";

import bicycleIcon from "@/shared/assets/svg/bicycle.svg";
import busIcon from "@/shared/assets/svg/bus.svg";
import subwayIcon from "@/shared/assets/svg/subway.svg";
import walkingIcon from "@/shared/assets/svg/walking.svg";

import type { TransportationType } from "../api/types/recommendedRoute";
import { formatStopTransportation } from "../utils/routeFormat";

import * as styles from "./TransportationLabel.css";

/** 자동차·택시는 아직 아이콘이 없어 글자만 보여 줍니다. */
const TRANSPORTATION_ICONS: Partial<Record<TransportationType, string>> = {
  WALKING: walkingIcon,
  BUS: busIcon,
  SUBWAY: subwayIcon,
  BIKING: bicycleIcon,
};

interface TransportationLabelProps {
  types: TransportationType[];
}

/** 루트 카드 상단 교통수단 표기. 예: 🚶도보 + 🚇지하철 */
export function TransportationLabel({ types }: TransportationLabelProps) {
  return (
    <span className={styles.list}>
      {types.map((type, index) => {
        const icon = TRANSPORTATION_ICONS[type];

        return (
          <Fragment key={type}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden>
                +
              </span>
            )}

            <span className={styles.item}>
              {icon && <img className={styles.icon} src={icon} alt="" />}
              {formatStopTransportation(type)}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}
