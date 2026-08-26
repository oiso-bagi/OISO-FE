import bicycleIcon from "@/shared/assets/svg/bicycle.svg";
import busIcon from "@/shared/assets/svg/bus.svg";
import subwayIcon from "@/shared/assets/svg/subway.svg";
import walkingIcon from "@/shared/assets/svg/walking.svg";

import type { TransportationType } from "../api/types/recommendedRoute";

/** 자동차·택시는 아직 아이콘이 없어 글자만 보여 줍니다. */
export const TRANSPORTATION_ICONS: Partial<Record<TransportationType, string>> =
  {
    WALKING: walkingIcon,
    BUS: busIcon,
    SUBWAY: subwayIcon,
    BIKING: bicycleIcon,
  };
