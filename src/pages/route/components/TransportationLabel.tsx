import { Fragment } from "react";

import type { TransportationType } from "../api/types/recommendedRoute";
import { formatStopTransportation } from "../utils/routeFormat";
import { TRANSPORTATION_ICONS } from "../utils/transportationIcon";

import * as styles from "./TransportationLabel.css";

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
