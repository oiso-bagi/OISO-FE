import { useEffect, useMemo, useRef, useState } from "react";

import { RouteBox } from "@/shared/components/RouteBox";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog/ConfirmDialog";
import { Header } from "@/shared/components/header/Header";
import { RouteListSkeleton } from "@/shared/components/Skeleton/RouteCardSkeleton";
import { useToast } from "@/shared/components/Toast/toastContext";
import { toErrorMessage } from "@/shared/api/apiError";

import { DayTabs } from "./components/DayTabs";
import type { SelectedDay } from "./components/DayTabs";
import { MapResizeHandle } from "./components/MapResizeHandle";
import { RouteMap } from "./components/RouteMap";
import { RouteStopList } from "./components/RouteStopList";
import { TransportationLabel } from "./components/TransportationLabel";

import { useRecommendedRouteDetail } from "./hooks/useRecommendedRouteDetail";
import { useRecommendedRoutes } from "./hooks/useRecommendedRoutes";
import { useMapResize } from "./hooks/useMapResize";
import { useCreateSavedRoute, useSavedRoutes } from "./hooks/useSavedRoutes";
import { formatDistance, toRouteSummaryItems } from "./utils/routeFormat";

import * as styles from "./components/routeLayout.css";

export function RoutePage() {
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<SelectedDay>("all");

  /**
   * 첫 카드 자동 펼침은 화면당 한 번만 합니다. 이 값이 없으면 사용자가 접은
   * 뒤에도 다시 펼쳐집니다.
   */
  const hasAutoExpandedRef = useRef(false);

  // 지도/목록 비율은 사용자가 손잡이로 조절합니다.
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const { mapStyle, resizeProps } = useMapResize(mapAreaRef);

  const { data: routes, isPending, isError, error } = useRecommendedRoutes();
  // 카드를 펼쳤을 때만 이 쿼리가 켜지므로, isPending 은 "아직 결과 없음"과 같습니다.
  // isLoading 은 재시도 대기 중 false 가 되어 빈 화면이 생깁니다.
  const {
    data: routeDetail,
    isPending: isDetailPending,
    isError: isDetailError,
    error: detailError,
  } = useRecommendedRouteDetail(expandedRouteId);

  const createSavedRoute = useCreateSavedRoute();
  const showToast = useToast();

  /**
   * 같은 코스를 두 번 저장하기 전에 한 번 묻습니다.
   *
   * 저장 목록의 id 는 추천 루트 id 와 같아서 목록만으로 중복을 알 수 있습니다.
   * 목록을 아직 못 받았을 때를 대비해 서버가 주는 `isSaved` 도 함께 봅니다.
   */
  const { data: savedRouteList } = useSavedRoutes();
  const savedRouteIds = useMemo(
    () => new Set((savedRouteList?.routes ?? []).map((route) => route.id)),
    [savedRouteList],
  );

  const [duplicateTargetId, setDuplicateTargetId] = useState<string | null>(
    null,
  );

  /**
   * 지도가 화면의 45% 를 차지하는데 들어오자마자 비어 있어, 첫 추천 코스를
   * 펼쳐 둡니다.
   */
  useEffect(() => {
    if (hasAutoExpandedRef.current) return;
    if (!routes || routes.length === 0) return;

    hasAutoExpandedRef.current = true;
    setExpandedRouteId(routes[0].id);
  }, [routes]);

  const handleToggleExpanded = (routeId: string) => {
    setExpandedRouteId((prev) => (prev === routeId ? null : routeId));
    // 다른 코스를 펼치면 이전 코스에서 고른 일차는 의미가 없습니다.
    setSelectedDay("all");
  };

  const saveRoute = (routeId: string) => {
    if (createSavedRoute.isPending) return;

    createSavedRoute.mutate(routeId, {
      onSuccess: () => showToast({ message: "저장되었습니다" }),
      onError: (saveError) =>
        showToast({
          message: toErrorMessage(
            saveError,
            "저장하지 못했어요. 잠시 후 다시 시도해 주세요.",
          ),
        }),
    });
  };

  const handleSave = (routeId: string) => {
    const isAlreadySaved =
      savedRouteIds.has(routeId) ||
      (routeDetail?.id === routeId && routeDetail.isSaved);

    if (isAlreadySaved) {
      setDuplicateTargetId(routeId);
      return;
    }

    saveRoute(routeId);
  };

  const handleConfirmDuplicateSave = () => {
    if (duplicateTargetId !== null) saveRoute(duplicateTargetId);
    setDuplicateTargetId(null);
  };

  // 펼쳐진 코스의 경유지를 상단 지도에 표시 (없으면 부산 기본 지도)
  const mapStops =
    expandedRouteId !== null && routeDetail?.id === expandedRouteId
      ? routeDetail.stops
      : [];

  const dayNumbers = Array.from(
    new Set(mapStops.map((stop) => stop.dayNumber)),
  ).sort((a, b) => a - b);
  const isMultiDay = dayNumbers.length > 1;

  // 일차를 고르면 지도와 경유지 목록을 함께 걸러 냅니다.
  const visibleStops =
    selectedDay === "all"
      ? mapStops
      : mapStops.filter((stop) => stop.dayNumber === selectedDay);

  return (
    <div className={styles.page}>
      <div className={styles.headerArea}>
        <Header backTo="/" title="추천 루트" />
      </div>

      {isMultiDay && (
        <DayTabs
          dayNumbers={dayNumbers}
          selectedDay={selectedDay}
          onSelect={setSelectedDay}
        />
      )}

      <div
        id="route-map-area"
        ref={mapAreaRef}
        className={styles.mapArea}
        style={mapStyle}
      >
        <RouteMap
          stops={mapStops}
          selectedDay={selectedDay === "all" ? undefined : selectedDay}
        />
      </div>

      <MapResizeHandle controlsId="route-map-area" {...resizeProps} />

      <div className={styles.listArea}>
        {isPending && <RouteListSkeleton />}

        {isError && (
          <p className={styles.statusText}>
            {toErrorMessage(
              error,
              "루트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            )}
          </p>
        )}

        {routes && routes.length === 0 && (
          <p className={styles.statusText}>추천할 수 있는 루트가 없어요.</p>
        )}

        {routes && routes.length > 0 && (
          <div className={styles.routeList}>
            {routes.map((route) => (
              <RouteBox
                key={route.id}
                variant="default"
                title={route.name}
                placeCount={route.stopCount}
                distance={formatDistance(route.distanceKm)}
                transportation={
                  <TransportationLabel types={route.transportationTypes} />
                }
                summaryItems={toRouteSummaryItems(route)}
                recommendationRate={route.recommendationScore}
                isRecommended={route.isRecommended}
                isExpanded={expandedRouteId === route.id}
                onToggleExpanded={() => handleToggleExpanded(route.id)}
              >
                {expandedRouteId === route.id && (
                  <>
                    {isDetailPending && (
                      <p className={styles.detailStatusText}>
                        경유지를 불러오는 중…
                      </p>
                    )}

                    {isDetailError && (
                      <p className={styles.detailStatusText}>
                        {toErrorMessage(
                          detailError,
                          "경유지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
                        )}
                      </p>
                    )}

                    {routeDetail?.id === route.id && (
                      <RouteStopList
                        stops={visibleStops}
                        // 이미 저장한 코스에서도 눌러야 확인 모달이 뜹니다.
                        onSave={() => handleSave(route.id)}
                        isSaving={createSavedRoute.isPending}
                      />
                    )}
                  </>
                )}
              </RouteBox>
            ))}
          </div>
        )}
      </div>

      {/* 어느 코스인지는 방금 누른 카드라 분명해서 이름은 넣지 않습니다. */}
      <ConfirmDialog
        isOpen={duplicateTargetId !== null}
        title="이미 저장한 코스예요"
        description="저장 목록에 똑같은 코스가 하나 더 생겨요."
        confirmLabel="저장"
        onCancel={() => setDuplicateTargetId(null)}
        onConfirm={handleConfirmDuplicateSave}
      />
    </div>
  );
}
