import type { RecommendedRouteStop } from "@/pages/route/api/types/recommendedRoute";

import type { AdminRouteStop } from "../types";

/**
 * 관리자 경유지를 서비스 지도(`RouteMap`)가 받는 모양으로 바꿉니다.
 *
 * 지도의 `sequence` 는 목록 순서(1부터)입니다. 관리자 경유지는 `renumberStops`
 * 로 항상 일차 순으로 정렬되어 있어 배열 순서가 곧 방문 순서입니다.
 *
 * 지도는 순서·일차·좌표·이름만 씁니다. 이동수단이나 운영시간은 그리지 않아
 * 비워 둡니다.
 */
export const toRouteMapStops = (
  stops: AdminRouteStop[],
): RecommendedRouteStop[] =>
  stops.map((stop, index) => ({
    sequence: index + 1,
    dayNumber: stop.dayNumber,
    placeName: stop.placeName,
    category: null,
    operatingHours: null,
    latitude: stop.latitude,
    longitude: stop.longitude,
    transportationFromPrevious: null,
    durationFromPreviousMinutes: null,
  }));
