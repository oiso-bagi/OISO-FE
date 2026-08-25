import { useEffect, useRef, useState } from "react";

import { loadKakaoMap } from "@/shared/lib/loadKakaoMap";

import type { TransportationType } from "../api/types/recommendedRoute";
import { getDayColor } from "../utils/dayColor";

import * as styles from "./RouteMap.css";

interface RouteMapPoint {
  latitude: number;
  longitude: number;
}

/**
 * 좌표가 없는 장소가 섞여 들어올 수 있어 null 을 허용하고, 지도를 그릴 때
 * 걸러냅니다. 호출부마다 필터링하지 않도록 여기서 한 번에 처리합니다.
 */
interface RouteMapStop {
  latitude: number | null;
  longitude: number | null;
  sequence: number;
  /** 몇 일차 경유지인지. 일차별 마커/Polyline 색상 구분에 사용합니다. */
  dayNumber: number;

  /**
   * 이전 경유지에서 이 경유지까지의 실제 도로 좌표. 없으면 직선으로 잇습니다.
   * 일차의 첫 경유지가 들고 있는 값은 전날 마지막 경유지에서 넘어오는 구간이라
   * 쓰지 않습니다.
   */
  pathFromPrevious?: RouteMapPoint[];

  /** 이전 경유지에서 여기까지의 이동수단·소요시간. 경로선 위 라벨에 씁니다. */
  transportationFromPrevious?: TransportationType | null;
  durationFromPreviousMinutes?: number | null;
}

type PlottableStop = RouteMapStop & RouteMapPoint;

interface RouteMapProps {
  /** 선택된 코스의 경유지. 비어 있으면 부산 기본 지도만 표시합니다. */
  stops: RouteMapStop[];

  /** 지정한 일차의 경유지만 표시합니다. 생략하면 전체 일차를 함께 표시합니다. */
  selectedDay?: number;
}

// Polyline 은 CSS 변수를 못 받으므로 디자인 토큰 값을 직접 지정합니다.
const CASING_COLOR = "#FFFFFF";

// 경유지가 없을 때 기본 중심 (부산 시청 인근)
const BUSAN_CENTER = { latitude: 35.1798, longitude: 129.075 };

/**
 * 한 일차의 경로선을 이루는 좌표.
 *
 * 경유지마다 들어 있는 도로 좌표를 순서대로 이어 붙입니다. 도로 좌표의 끝점이
 * 경유지에서 10~20m 떨어져 있어, 선이 마커에 닿도록 경유지 좌표를 뒤에
 * 덧붙입니다.
 */
const toDayLinePoints = (dayStops: PlottableStop[]): RouteMapPoint[] => {
  const points: RouteMapPoint[] = [];

  dayStops.forEach((stop, index) => {
    // 첫 경유지의 구간은 전날에서 넘어오는 길이라 건너뜁니다.
    if (index > 0) points.push(...(stop.pathFromPrevious ?? []));

    points.push({ latitude: stop.latitude, longitude: stop.longitude });
  });

  return points;
};

export function RouteMap({ stops, selectedDay }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const overlaysRef = useRef<
    Array<kakao.maps.Polyline | kakao.maps.CustomOverlay>
  >([]);

  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  // 1) 지도 1회 생성
  useEffect(() => {
    let isCancelled = false;

    loadKakaoMap()
      .then((kakao) => {
        if (isCancelled || !containerRef.current || mapRef.current) return;

        mapRef.current = new kakao.maps.Map(containerRef.current, {
          center: new kakao.maps.LatLng(
            BUSAN_CENTER.latitude,
            BUSAN_CENTER.longitude,
          ),
          level: 6,
        });

        setStatus("ready");
      })
      .catch(() => {
        if (!isCancelled) setStatus("error");
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2) 선택된 코스에 맞춰 마커/경로만 갱신 (지도는 재사용)
  useEffect(() => {
    const map = mapRef.current;
    if (status !== "ready" || !map || !window.kakao?.maps) return;

    const { kakao } = window;

    // 이전 오버레이 제거
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];

    const plottableStops = stops.filter(
      (stop): stop is PlottableStop =>
        stop.latitude !== null && stop.longitude !== null,
    );

    const visibleStops =
      selectedDay === undefined
        ? plottableStops
        : plottableStops.filter((stop) => stop.dayNumber === selectedDay);

    if (visibleStops.length === 0) {
      map.setCenter(
        new kakao.maps.LatLng(BUSAN_CENTER.latitude, BUSAN_CENTER.longitude),
      );
      return;
    }

    const dayNumbers = Array.from(
      new Set(visibleStops.map((stop) => stop.dayNumber)),
    ).sort((a, b) => a - b);

    // 도로 경로가 경유지 바깥으로 나갈 수 있어 범위 계산에 함께 넣습니다.
    const linePointsForBounds: RouteMapPoint[] = [];

    // 일차별로 완전히 분리해서 경로선/마커를 그립니다 (서로 다른 일차는 연결하지 않음)
    dayNumbers.forEach((dayNumber) => {
      const dayStops = visibleStops
        .filter((stop) => stop.dayNumber === dayNumber)
        .sort((a, b) => a.sequence - b.sequence);

      const color = getDayColor(dayNumber);

      // 경로선: 검정 케이싱(아래) + 일차 색상 실선(위)
      const dayLinePoints = toDayLinePoints(dayStops);
      linePointsForBounds.push(...dayLinePoints);

      const linePoints = dayLinePoints.map(
        (point) => new kakao.maps.LatLng(point.latitude, point.longitude),
      );

      /**
       * 흰 케이싱이 지도 도로와 경로선을 갈라 줍니다. 검정으로 두면 케이싱이
       * 색 선을 거의 덮어 일차 색이 실루엣으로만 보였습니다.
       */
      const casing = new kakao.maps.Polyline({
        path: linePoints,
        strokeWeight: 5,
        strokeColor: CASING_COLOR,
        strokeOpacity: 1,
        strokeStyle: "solid",
      });
      const line = new kakao.maps.Polyline({
        path: linePoints,
        strokeWeight: 3.5,
        strokeColor: color,
        strokeOpacity: 1,
        strokeStyle: "solid",
      });
      casing.setMap(map);
      line.setMap(map);
      overlaysRef.current.push(casing, line);

      // 경유지 순번 마커 — 해당 일차 안에서의 방문 순서로 표시
      dayStops.forEach((stop, index) => {
        const overlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(stop.latitude, stop.longitude),
          content: `<div class="${styles.marker}" style="background-color:${color}">${index + 1}</div>`,
          xAnchor: 0.5,
          yAnchor: 0.5,
          zIndex: 3,
        });
        overlay.setMap(map);
        overlaysRef.current.push(overlay);
      });
    });

    // 화면에 보이는 경유지와 경로선 전체가 들어오도록 범위 맞춤
    const bounds = new kakao.maps.LatLngBounds();
    [...visibleStops, ...linePointsForBounds].forEach((point) =>
      bounds.extend(new kakao.maps.LatLng(point.latitude, point.longitude)),
    );
    map.setBounds(bounds);
  }, [stops, status, selectedDay]);

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.map} />

      {status === "loading" && (
        <p className={styles.overlayText}>지도를 불러오는 중…</p>
      )}

      {status === "error" && (
        <p className={styles.overlayText}>지도를 불러오지 못했어요.</p>
      )}
    </div>
  );
}
