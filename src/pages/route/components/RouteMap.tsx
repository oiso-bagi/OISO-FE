import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { loadKakaoMap } from "@/shared/lib/loadKakaoMap";

import type { RecommendedRouteStop } from "../api/types/recommendedRoute";
import { getDayColor } from "../utils/dayColor";

import { StopCallout } from "./StopCallout";
import * as styles from "./RouteMap.css";

interface RouteMapPoint {
  latitude: number;
  longitude: number;
}

type PlottableStop = RecommendedRouteStop & RouteMapPoint;

interface RouteMapProps {
  /**
   * 선택된 코스의 경유지. 비어 있으면 부산 기본 지도만 표시합니다.
   *
   * 좌표가 없는 장소가 섞여 들어올 수 있어, 호출부마다 거르지 않도록 지도를
   * 그릴 때 한 번에 제외합니다.
   */
  stops: RecommendedRouteStop[];

  /** 지정한 일차의 경유지만 표시합니다. 생략하면 전체 일차를 함께 표시합니다. */
  selectedDay?: number;

  /** 장소 정보를 띄울 경유지의 sequence. 그 핀 위에 정보 태그를 붙입니다. */
  selectedStopSequence?: number | null;

  /**
   * 핀을 누르면 그 경유지의 sequence 로, 정보를 닫으면(닫기 버튼·빈 지도·Esc)
   * null 로 호출합니다.
   */
  onSelectStop?: (sequence: number | null) => void;
}

interface MarkerEntry {
  stop: PlottableStop;
  element: HTMLButtonElement;
  overlay: kakao.maps.CustomOverlay;
}

const MARKER_Z_INDEX = 3;
const SELECTED_MARKER_Z_INDEX = 4;
const CALLOUT_Z_INDEX = 10;

/** 정보 태그가 지도 가장자리에 붙지 않게 남기는 여백 */
const CALLOUT_EDGE_PADDING = 12;

const isPlottable = (stop: RecommendedRouteStop): stop is PlottableStop =>
  stop.latitude !== null && stop.longitude !== null;

/** 한 일차의 경유지를 방문 순서대로. 핀 번호가 이 순서입니다. */
const toDayStops = (stops: PlottableStop[], dayNumber: number) =>
  stops
    .filter((stop) => stop.dayNumber === dayNumber)
    .sort((a, b) => a.sequence - b.sequence);

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

export function RouteMap({
  stops,
  selectedDay,
  selectedStopSequence = null,
  onSelectStop,
}: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const overlaysRef = useRef<
    Array<kakao.maps.Polyline | kakao.maps.CustomOverlay>
  >([]);
  const markersRef = useRef(new Map<number, MarkerEntry>());

  /**
   * 핀 클릭 핸들러는 마커를 만들 때 한 번 붙습니다. 콜백이 바뀔 때마다 마커를
   * 다시 그리면 지도 범위도 다시 맞춰져 보던 위치가 튀므로 최신 값을 ref 로
   * 읽습니다.
   */
  const onSelectStopRef = useRef(onSelectStop);
  useEffect(() => {
    onSelectStopRef.current = onSelectStop;
  }, [onSelectStop]);

  /**
   * 정보 태그를 그릴 자리. 카카오 오버레이는 DOM 요소를 받으므로, 요소 하나를
   * 만들어 두고 React 컴포넌트를 portal 로 그립니다.
   */
  const [calloutContainer] = useState(() => document.createElement("div"));
  const calloutOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null);

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

  /**
   * 2) 지도 영역의 크기가 바뀌면 다시 배치합니다.
   *
   * 사용자가 손잡이로 높이를 줄이면 카카오 지도는 이전 크기를 그대로 들고
   * 있어 타일이 잘리거나 빈 칸이 생깁니다. `relayout()` 이 중심을 옮기므로
   * 앞뒤로 중심을 저장했다 되돌립니다.
   */
  useEffect(() => {
    const map = mapRef.current;
    const element = containerRef.current;
    if (status !== "ready" || !map || !element) return;

    const observer = new ResizeObserver(() => {
      // 접혀서 크기가 0 이면 중심 계산이 무너지므로 건너뜁니다.
      if (element.clientWidth === 0 || element.clientHeight === 0) return;

      const center = map.getCenter();
      map.relayout();
      map.setCenter(center);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [status]);

  // 3) 선택된 코스에 맞춰 마커/경로만 갱신 (지도는 재사용)
  useEffect(() => {
    const map = mapRef.current;
    if (status !== "ready" || !map || !window.kakao?.maps) return;

    const { kakao } = window;

    // 이전 오버레이 제거
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];

    markersRef.current.clear();

    const plottableStops = stops.filter(isPlottable);

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
      const dayStops = toDayStops(visibleStops, dayNumber);

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
        const markerNumber = index + 1;

        const element = document.createElement("button");
        element.type = "button";
        element.className = styles.marker;
        element.style.backgroundColor = color;
        element.textContent = String(markerNumber);
        element.setAttribute(
          "aria-label",
          `${markerNumber}번 ${stop.placeName} 장소 정보 보기`,
        );
        element.addEventListener("click", () =>
          onSelectStopRef.current?.(stop.sequence),
        );

        const overlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(stop.latitude, stop.longitude),
          content: element,
          xAnchor: 0.5,
          yAnchor: 0.5,
          zIndex: MARKER_Z_INDEX,
          // 핀을 눌렀을 때 아래 지도 클릭(정보 닫기)이 함께 일어나지 않게 합니다.
          clickable: true,
        });
        overlay.setMap(map);
        overlaysRef.current.push(overlay);
        markersRef.current.set(stop.sequence, { stop, element, overlay });
      });
    });

    // 화면에 보이는 경유지와 경로선 전체가 들어오도록 범위 맞춤
    const bounds = new kakao.maps.LatLngBounds();
    [...visibleStops, ...linePointsForBounds].forEach((point) =>
      bounds.extend(new kakao.maps.LatLng(point.latitude, point.longitude)),
    );
    map.setBounds(bounds);
  }, [stops, status, selectedDay]);

  /**
   * 4) 선택한 경유지의 핀을 강조하고 그 위에 정보 태그를 붙입니다.
   *
   * 마커를 다시 그린 뒤에도 강조가 남도록 경유지·일차가 바뀔 때도 실행합니다.
   * 선택한 경유지가 지금 보이는 핀에 없으면(다른 일차, 좌표 없음) 태그를
   * 내립니다.
   */
  useEffect(() => {
    const map = mapRef.current;
    if (status !== "ready" || !map || !window.kakao?.maps) return;

    const { kakao } = window;

    markersRef.current.forEach(({ element, overlay }, sequence) => {
      const isSelected = sequence === selectedStopSequence;

      element.dataset.selected = String(isSelected);
      element.setAttribute("aria-pressed", String(isSelected));
      overlay.setZIndex(isSelected ? SELECTED_MARKER_Z_INDEX : MARKER_Z_INDEX);
    });

    const selected =
      selectedStopSequence === null
        ? undefined
        : markersRef.current.get(selectedStopSequence);

    if (!selected) {
      calloutOverlayRef.current?.setMap(null);
      return;
    }

    const position = new kakao.maps.LatLng(
      selected.stop.latitude,
      selected.stop.longitude,
    );

    if (calloutOverlayRef.current) {
      calloutOverlayRef.current.setPosition(position);
    } else {
      calloutOverlayRef.current = new kakao.maps.CustomOverlay({
        position,
        content: calloutContainer,
        xAnchor: 0.5,
        yAnchor: 1,
        zIndex: CALLOUT_Z_INDEX,
        clickable: true,
      });
    }

    calloutOverlayRef.current.setMap(map);

    /**
     * 가장자리 핀이면 태그가 지도 밖으로 잘립니다. 태그가 그려진 뒤 크기를 재서
     * 잘린 만큼 지도를 옮깁니다. 범위를 다시 맞추지 않아 코스 전체 모양은
     * 그대로 둡니다.
     */
    const frame = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const mapRect = container.getBoundingClientRect();
      const calloutRect = calloutContainer.getBoundingClientRect();

      const overflowLeft =
        mapRect.left + CALLOUT_EDGE_PADDING - calloutRect.left;
      const overflowRight =
        calloutRect.right - (mapRect.right - CALLOUT_EDGE_PADDING);
      const overflowTop = mapRect.top + CALLOUT_EDGE_PADDING - calloutRect.top;
      const overflowBottom =
        calloutRect.bottom - (mapRect.bottom - CALLOUT_EDGE_PADDING);

      // panBy 는 지도 중심을 옮깁니다. 중심이 위로 가야 태그가 아래로 내려옵니다.
      const dx = overflowLeft > 0 ? -overflowLeft : Math.max(overflowRight, 0);
      const dy = overflowTop > 0 ? -overflowTop : Math.max(overflowBottom, 0);

      if (dx !== 0 || dy !== 0) map.panBy(dx, dy);
    });

    return () => cancelAnimationFrame(frame);
  }, [calloutContainer, selectedStopSequence, status, stops, selectedDay]);

  /** 5) 빈 지도를 누르면 정보를 닫습니다. 핀·태그는 clickable 이라 해당하지 않습니다. */
  useEffect(() => {
    const map = mapRef.current;
    if (status !== "ready" || !map || !window.kakao?.maps) return;

    const { kakao } = window;
    const handleMapClick = () => onSelectStopRef.current?.(null);

    kakao.maps.event.addListener(map, "click", handleMapClick);
    return () => kakao.maps.event.removeListener(map, "click", handleMapClick);
  }, [status]);

  // 6) Esc 로 닫습니다.
  useEffect(() => {
    if (selectedStopSequence === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onSelectStopRef.current?.(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedStopSequence]);

  /**
   * 태그에 그릴 경유지. 핀 번호와 색을 태그에도 그대로 써야 하므로 마커와 같은
   * 규칙(좌표 있는 경유지, 일차 안 순서)으로 구합니다.
   */
  const plottableStops = stops.filter(isPlottable);
  const selectedStop = plottableStops.find(
    (stop) =>
      stop.sequence === selectedStopSequence &&
      (selectedDay === undefined || stop.dayNumber === selectedDay),
  );
  const isMultiDay =
    new Set(plottableStops.map((stop) => stop.dayNumber)).size > 1;

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.map} />

      {status === "loading" && (
        <p className={styles.overlayText}>지도를 불러오는 중…</p>
      )}

      {status === "error" && (
        <p className={styles.overlayText}>지도를 불러오지 못했어요.</p>
      )}

      {status === "ready" &&
        selectedStop &&
        createPortal(
          <StopCallout
            stop={selectedStop}
            markerNumber={
              toDayStops(plottableStops, selectedStop.dayNumber).indexOf(
                selectedStop,
              ) + 1
            }
            markerColor={getDayColor(selectedStop.dayNumber)}
            isMultiDay={isMultiDay}
            onClose={() => onSelectStop?.(null)}
          />,
          calloutContainer,
        )}
    </div>
  );
}
