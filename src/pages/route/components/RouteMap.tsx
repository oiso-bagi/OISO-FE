import { useEffect, useRef, useState } from "react";

import { loadKakaoMap } from "@/shared/lib/loadKakaoMap";

import * as styles from "./RouteMap.css";

interface RouteMapPoint {
  latitude: number;
  longitude: number;
}

interface RouteMapStop extends RouteMapPoint {
  order: number;
}

interface RouteMapProps {
  /** 선택된 코스의 경유지. 비어 있으면 부산 기본 지도만 표시합니다. */
  stops: RouteMapStop[];

  /**
   * 실제 도로/이동 경로 좌표. 백엔드 pathCoordinates 가 준비되면 전달합니다.
   * 없으면 경유지 좌표를 직선으로 연결합니다(Phase 1 임시).
   */
  path?: RouteMapPoint[];
}

// Polyline 은 CSS 변수를 못 받으므로 디자인 토큰 값을 직접 지정합니다.
const LINE_COLOR = "#FD1187"; // secondary500
const CASING_COLOR = "#000000";

// 경유지가 없을 때 기본 중심 (부산 시청 인근)
const BUSAN_CENTER = { latitude: 35.1798, longitude: 129.075 };

export function RouteMap({ stops, path }: RouteMapProps) {
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

    if (stops.length === 0) {
      map.setCenter(
        new kakao.maps.LatLng(BUSAN_CENTER.latitude, BUSAN_CENTER.longitude),
      );
      return;
    }

    // 경로선: 검정 케이싱(아래) + 핑크 실선(위)
    const linePoints = (path ?? stops).map(
      (point) => new kakao.maps.LatLng(point.latitude, point.longitude),
    );

    const casing = new kakao.maps.Polyline({
      path: linePoints,
      strokeWeight: 6,
      strokeColor: CASING_COLOR,
      strokeOpacity: 1,
      strokeStyle: "solid",
    });
    const line = new kakao.maps.Polyline({
      path: linePoints,
      strokeWeight: 4,
      strokeColor: LINE_COLOR,
      strokeOpacity: 1,
      strokeStyle: "solid",
    });
    casing.setMap(map);
    line.setMap(map);
    overlaysRef.current.push(casing, line);

    // 경유지 순번 마커
    stops.forEach((stop) => {
      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(stop.latitude, stop.longitude),
        content: `<div class="${styles.marker}">${stop.order}</div>`,
        xAnchor: 0.5,
        yAnchor: 0.5,
        zIndex: 3,
      });
      overlay.setMap(map);
      overlaysRef.current.push(overlay);
    });

    // 전체 경유지가 보이도록 범위 맞춤
    const bounds = new kakao.maps.LatLngBounds();
    stops.forEach((stop) =>
      bounds.extend(new kakao.maps.LatLng(stop.latitude, stop.longitude)),
    );
    map.setBounds(bounds);
  }, [stops, path, status]);

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
