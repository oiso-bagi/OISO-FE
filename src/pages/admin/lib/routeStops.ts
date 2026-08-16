import { SEQUENCE_BASE } from "../constants";
import type { AdminPlace, AdminRouteStop, TransportType } from "../types";

/** 코스로 저장하려면 최소 이만큼은 있어야 합니다. */
export const MIN_STOPS = 2;

/** 경유지를 새로 담거나 마지막에서 벗어났을 때 채워 넣을 구간 정보 */
const DEFAULT_NEXT = {
  nextTransportType: "WALKING" as TransportType,
  nextTravelTimeMinutes: 10,
  nextTravelCostWon: 0,
};

/**
 * 목록 순서를 확정하고 `sequence` 를 다시 매깁니다.
 *
 * 정렬은 일차 우선이고, 같은 일차 안에서는 현재 배열 순서를 유지합니다.
 * `sequence` 는 일차별로 초기화되지 않고 전체를 통산합니다. 서비스가 이미
 * 쓰고 있는 경유지 데이터가 그런 형태입니다(2일차가 3·4, 3일차가 5·6).
 *
 * 순서를 입력받는 대신 여기서 매번 다시 매기므로, 번호가 겹치거나 비는
 * 상태 자체가 만들어지지 않습니다.
 */
export const renumberStops = (stops: AdminRouteStop[]): AdminRouteStop[] => {
  const sorted = [...stops].sort((a, b) => a.dayNumber - b.dayNumber);

  return sorted.map((stop, index) => {
    const sequence = SEQUENCE_BASE + index;

    // 마지막 경유지는 다음 구간이 없습니다.
    if (index === sorted.length - 1) {
      return {
        ...stop,
        sequence,
        nextTransportType: null,
        nextTravelTimeMinutes: null,
        nextTravelCostWon: null,
      };
    }

    // 마지막이었다가 뒤에 경유지가 붙으면 구간 정보를 다시 채워 줍니다.
    return {
      ...stop,
      sequence,
      nextTransportType:
        stop.nextTransportType ?? DEFAULT_NEXT.nextTransportType,
      nextTravelTimeMinutes:
        stop.nextTravelTimeMinutes ?? DEFAULT_NEXT.nextTravelTimeMinutes,
      nextTravelCostWon:
        stop.nextTravelCostWon ?? DEFAULT_NEXT.nextTravelCostWon,
    };
  });
};

export const addStop = (
  stops: AdminRouteStop[],
  place: AdminPlace,
): AdminRouteStop[] =>
  renumberStops([
    ...stops,
    {
      // renumberStops 가 다시 매깁니다.
      sequence: 0,
      // 새 경유지는 직전 경유지와 같은 일차에 붙입니다.
      dayNumber: stops.at(-1)?.dayNumber ?? 1,
      placeId: place.id,
      placeName: place.name,
      address: place.address,
      ...DEFAULT_NEXT,
    },
  ]);

export const removeStop = (stops: AdminRouteStop[], index: number) =>
  renumberStops(stops.filter((_, current) => current !== index));

export const setStopDay = (
  stops: AdminRouteStop[],
  index: number,
  dayNumber: number,
) =>
  renumberStops(
    stops.map((stop, current) =>
      current === index ? { ...stop, dayNumber } : stop,
    ),
  );

/**
 * 순서 번호를 입력해 경유지를 그 자리로 옮깁니다.
 *
 * 끼어드는 자리의 일차를 따라가게 해서, 번호 입력만으로 일차 사이를 오갈 수
 * 있게 합니다. 그렇게 하지 않으면 다른 일차의 번호를 넣어도 정렬에서 제자리로
 * 돌아와 아무 일도 일어나지 않는 것처럼 보입니다.
 */
export const moveStop = (
  stops: AdminRouteStop[],
  fromIndex: number,
  toSequence: number,
): AdminRouteStop[] => {
  const lastSequence = SEQUENCE_BASE + stops.length - 1;
  const target = Math.min(Math.max(SEQUENCE_BASE, toSequence), lastSequence);
  const toIndex = target - SEQUENCE_BASE;

  if (toIndex === fromIndex) return stops;

  const moved = stops[fromIndex];
  const rest = stops.filter((_, current) => current !== fromIndex);
  const anchor = rest[Math.min(toIndex, rest.length - 1)];

  rest.splice(toIndex, 0, {
    ...moved,
    dayNumber: anchor?.dayNumber ?? moved.dayNumber,
  });

  return renumberStops(rest);
};

export const updateStopNext = (
  stops: AdminRouteStop[],
  index: number,
  patch: Partial<
    Pick<
      AdminRouteStop,
      "nextTransportType" | "nextTravelTimeMinutes" | "nextTravelCostWon"
    >
  >,
) =>
  stops.map((stop, current) =>
    current === index ? { ...stop, ...patch } : stop,
  );

export interface RouteFormErrors {
  name?: string;
  theme?: string;
  stops?: string;
}

export const validateRouteForm = (values: {
  name: string;
  theme: string;
  stops: AdminRouteStop[];
}): RouteFormErrors => {
  const errors: RouteFormErrors = {};

  if (!values.name.trim()) errors.name = "코스명을 입력해 주세요.";
  if (!values.theme) errors.theme = "테마를 선택해 주세요.";
  if (values.stops.length < MIN_STOPS) {
    errors.stops = `경유지를 ${MIN_STOPS}곳 이상 담아 주세요.`;
  }

  return errors;
};
