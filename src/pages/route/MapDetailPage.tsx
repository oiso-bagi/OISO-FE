import { useEffect, useMemo, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import backIcon from "@/shared/assets/svg/back.svg";
import { Skeleton } from "@/shared/components/Skeleton/Skeleton";
import { useToast } from "@/shared/components/Toast/toastContext";
import { toErrorMessage } from "@/shared/api/apiError";
import { trackEvent } from "@/shared/lib/analytics";

import { RouteMap } from "./components/RouteMap";
import { RouteStopList } from "./components/RouteStopList";
import { useRecommendedRouteDetail } from "./hooks/useRecommendedRouteDetail";
import { useSavedRouteDetail } from "./hooks/useSavedRouteDetail";
import { CompletionBar } from "./components/CompletionBar";
import { DayTabs } from "./components/DayTabs";
import { MapResizeHandle } from "./components/MapResizeHandle";
import { useMapResize } from "./hooks/useMapResize";
import { useUpdateSavedRouteCompleted } from "./hooks/useSavedRoutes";
import type { SelectedDay } from "./types/day";

import * as styles from "./MapDetailPage.css";

/**
 * 코스 하나를 지도로 크게 보는 풀스크린 읽기전용 페이지.
 * /map/:id?source=recommended|saved
 * (저장/삭제/네비 기능은 P2)
 */
export function MapDetailPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const location = useLocation();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // 딥링크로 직접 진입(뒤로 갈 히스토리 없음)하면 저장 페이지로 보냅니다.
  const handleBack = () => {
    if (location.key === "default") {
      navigate("/saved");
    } else {
      navigate(-1);
    }
  };

  // 루트 id 는 "route_001" 형태의 문자열입니다. 숫자로 변환하면 안 됩니다.
  const routeId = id?.trim() ? id : null;
  // source 미지정/기타 값은 저장 루트로 간주 (현재 진입점이 저장 루트뿐)
  const isSaved = searchParams.get("source") !== "recommended";

  // 두 훅 모두 호출하되 source 에 맞는 쪽만 enabled
  const recommended = useRecommendedRouteDetail(isSaved ? null : routeId);
  const saved = useSavedRouteDetail(isSaved ? routeId : null);
  const {
    data: route,
    isPending,
    isError,
    error,
  } = isSaved ? saved : recommended;

  const isInvalid = routeId === null;

  /**
   * 완료 체크는 저장 목록에만 있었는데, 여행 중에 실제로 열어 두는 화면은
   * 여기입니다. 저장한 루트일 때만 노출합니다.
   */
  const updateCompleted = useUpdateSavedRouteCompleted();

  const handleToggleCompleted = () => {
    if (routeId === null || !saved.data || updateCompleted.isPending) return;

    const nextCompleted = !saved.data.isCompleted;

    updateCompleted.mutate(
      { routeId, isCompleted: nextCompleted },
      {
        // 요청이 실패해도 완료로 집계되지 않도록 성공한 뒤에만 보냅니다.
        onSuccess: () => {
          if (nextCompleted) {
            trackEvent("trip_complete", { route_id: routeId, from: "map" });
          }
        },

        onError: (toggleError) =>
          showToast({
            message: toErrorMessage(
              toggleError,
              "상태를 변경하지 못했어요. 다시 시도해 주세요.",
            ),
          }),
      },
    );
  };

  // 다일 코스일 때만 일차 선택 탭을 노출합니다. 기본값은 전체(All) 표시.
  const dayNumbers = useMemo(
    () =>
      Array.from(
        new Set((route?.stops ?? []).map((stop) => stop.dayNumber)),
      ).sort((a, b) => a - b),
    [route?.stops],
  );
  const isMultiDay = dayNumbers.length > 1;

  const [selectedDay, setSelectedDay] = useState<SelectedDay>("all");

  // 지도/목록 비율은 사용자가 손잡이로 조절합니다.
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const listAreaRef = useRef<HTMLDivElement>(null);
  const { mapStyle, resizeProps } = useMapResize(mapAreaRef, listAreaRef);

  // 다른 루트로 이동하거나 조회 대상이 변경되면 일차 선택을 전체로 초기화합니다.
  useEffect(() => {
    setSelectedDay("all");
  }, [routeId, isSaved]);

  // 지도 진입. 루트가 바뀔 때마다 한 번씩 보냅니다.
  useEffect(() => {
    if (routeId === null) return;

    trackEvent("map_view", {
      route_id: routeId,
      source: isSaved ? "saved" : "recommended",
    });
  }, [routeId, isSaved]);

  // 일차 탭에서 특정 일차를 선택하면 지도뿐 아니라 하단 경유지 리스트도 해당 일차만 표시합니다.
  const visibleStops =
    selectedDay === "all"
      ? (route?.stops ?? [])
      : (route?.stops ?? []).filter((stop) => stop.dayNumber === selectedDay);

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
          aria-label="이전 페이지로 이동"
        >
          <img src={backIcon} alt="" className={styles.backIcon} />
        </button>

        <h1 className={styles.title}>{route?.name ?? "루트 지도"}</h1>
      </header>

      {isSaved && saved.data && (
        <CompletionBar
          isCompleted={saved.data.isCompleted}
          isDisabled={updateCompleted.isPending}
          onToggle={handleToggleCompleted}
        />
      )}

      {isMultiDay && (
        <DayTabs
          dayNumbers={dayNumbers}
          selectedDay={selectedDay}
          onSelect={setSelectedDay}
        />
      )}

      <div
        id="map-detail-map-area"
        ref={mapAreaRef}
        className={styles.mapArea}
        style={mapStyle}
      >
        <RouteMap
          stops={route?.stops ?? []}
          selectedDay={selectedDay === "all" ? undefined : selectedDay}
        />
      </div>

      <MapResizeHandle controlsId="map-detail-map-area" {...resizeProps} />

      <div ref={listAreaRef} className={styles.listArea}>
        {!isInvalid && isPending && (
          <div className={styles.listSkeleton}>
            <Skeleton width="30%" height="18px" />
            <Skeleton width="100%" height="44px" />
            <Skeleton width="100%" height="44px" />
            <Skeleton width="100%" height="44px" />
          </div>
        )}

        {(isInvalid || isError) && (
          <p className={styles.statusText}>
            {isInvalid
              ? "루트를 찾을 수 없어요."
              : toErrorMessage(
                  error,
                  "루트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
                )}
          </p>
        )}

        {route && <RouteStopList stops={visibleStops} />}
      </div>
    </div>
  );
}
