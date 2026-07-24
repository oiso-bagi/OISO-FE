import type {
  RouteBoxProps,
  RouteSummaryItem,
} from "@/shared/components/RouteBox";

import type {
  CongestionLevel,
  TransportationType,
} from "../api/types/recommendedRoute";

export const formatPrice = (value: number | null): string => {
  if (value === null) return "-";

  return `${value.toLocaleString("ko-KR")}원`;
};

export const formatDuration = (value: number | null): string => {
  if (value === null) return "-";

  return `${value}분`;
};

export const formatDistance = (value: number): string => `${value}km`;

export const formatCongestion = (value: CongestionLevel): string => {
  const congestionMap: Record<CongestionLevel, string> = {
    LOW: "낮음",
    MEDIUM: "보통",
    HIGH: "높음",
    UNKNOWN: "-",
  };

  return congestionMap[value];
};

const transportationMap: Record<TransportationType, string> = {
  WALK: "도보",
  BUS: "버스",
  SUBWAY: "지하철",
  BICYCLE: "자전거",
  TAXI: "택시",
};

/** 루트 카드 상단 교통수단 표기. 예: "도보 + 지하철" */
export const formatTransportation = (values: TransportationType[]): string =>
  values.map((value) => transportationMap[value]).join(" + ");

/** 경유지 사이 이동 정보 표기. 예: "↓ 지하철 12분" */
export const formatStopTransportation = (value: TransportationType): string =>
  transportationMap[value];

/** 추천 루트 / 저장 루트가 공통으로 가지는 요약 필드 */
interface RouteSummarySource {
  totalCost: number | null;
  totalDurationMinutes: number | null;
  congestionLevel: CongestionLevel;
  savingAmount: number | null;
  savedAt?: string;
}

/** 저장일 짧은 표기. "2026-05-18" → "26.05.18" */
const formatSavedDateShort = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");

  return `${year.slice(2)}.${month}.${day}`;
};

/**
 * RouteBox 의 summaryItems(4칸 고정)로 변환합니다.
 * 세 번째 칸이 variant 에 따라 달라집니다.
 *
 * - default  : 비용 / 시간 / 혼잡도(primary100) / 절약(secondary100)
 * - editable : 비용 / 시간 / 저장일            / 절약(secondary100)
 *   (거리는 상단 정보 라인과 중복이라 저장일로 대체)
 */
export const toRouteSummaryItems = (
  route: RouteSummarySource,
  variant: RouteBoxProps["variant"] = "default",
): RouteBoxProps["summaryItems"] => {
  const thirdItem: RouteSummaryItem =
    variant === "editable"
      ? {
          label: "저장일",
          value: route.savedAt ? formatSavedDateShort(route.savedAt) : "-",
        }
      : {
          label: "혼잡도",
          value: formatCongestion(route.congestionLevel),
          variant: "primary",
        };

  return [
    { label: "비용", value: formatPrice(route.totalCost) },
    { label: "시간", value: formatDuration(route.totalDurationMinutes) },
    thirdItem,
    {
      label: "절약",
      value: formatPrice(route.savingAmount),
      variant: "secondary",
    },
  ];
};
