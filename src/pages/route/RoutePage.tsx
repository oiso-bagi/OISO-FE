import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RouteBox } from "@/shared/components/RouteBox";
import { Header } from "@/shared/components/header/Header";
import { RouteListSkeleton } from "@/shared/components/Skeleton/RouteCardSkeleton";
import { useToast } from "@/shared/components/Toast/toastContext";
import { toErrorMessage } from "@/shared/api/apiError";
import { readRecommendationConditions } from "@/shared/lib/recommendationConditions";
import { useRecommendationOptions } from "@/pages/survey/hooks/useRecommendationOptions";

import { ConditionSummary } from "./components/ConditionSummary";
import { DayTabs } from "./components/DayTabs";
import { MapResizeHandle } from "./components/MapResizeHandle";
import { RouteMap } from "./components/RouteMap";
import { RouteStopList } from "./components/RouteStopList";
import { TransportationLabel } from "./components/TransportationLabel";

import { useMapResize } from "./hooks/useMapResize";
import { useRecommendedRouteDetail } from "./hooks/useRecommendedRouteDetail";
import { useRecommendedRoutes } from "./hooks/useRecommendedRoutes";
import { useCreateSavedRoute, useSavedRoutes } from "./hooks/useSavedRoutes";
import type { SelectedDay } from "./types/day";
import { formatDistance, toRouteSummaryItems } from "./utils/routeFormat";

import * as styles from "./components/routeLayout.css";

export function RoutePage() {
  const navigate = useNavigate();

  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<SelectedDay>("all");

  /**
   * 첫 카드 자동 펼침은 화면당 한 번만 합니다. 이 값이 없으면 사용자가 접은
   * 뒤에도 다시 펼쳐집니다.
   */
  const hasAutoExpandedRef = useRef(false);

  // 지도/목록 비율은 사용자가 손잡이로 조절합니다.
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const listAreaRef = useRef<HTMLDivElement>(null);
  const { mapStyle, resizeProps } = useMapResize(mapAreaRef, listAreaRef);

  /**
   * 어떤 조건으로 찾은 결과인지 화면에 남깁니다. 설문을 마쳐야 이 화면에
   * 닿으므로 보통 값이 있지만, 저장이 막힌 환경을 대비해 없을 수 있게 둡니다.
   */
  const conditions = readRecommendationConditions();

  /**
   * 여행 테마를 한글로 보여 줍니다.
   *
   * 설문이 이름을 함께 저장하기 전에 조건을 정한 사용자는 slug 만 갖고 있어
   * "nature-walk" 처럼 보입니다. 그때만 옵션 API 로 이름을 채웁니다.
   */
  const hasSavedStyleLabels = conditions?.travelStyleLabels !== undefined;
  const { data: recommendationOptions } = useRecommendationOptions(
    conditions !== null && !hasSavedStyleLabels,
  );

  const travelStyleNames =
    conditions === null
      ? []
      : (conditions.travelStyleLabels ??
        conditions.travelStyleSlugs.map(
          (slug) =>
            recommendationOptions?.travelStyles.find(
              (style) => style.id === slug,
            )?.label ?? slug,
        ));

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
   * 이미 저장한 코스인지 판단합니다.
   *
   * 저장 목록의 id 는 추천 루트 id 와 같아서 목록만으로 알 수 있습니다.
   * 목록을 아직 못 받았을 때를 대비해 서버가 주는 `isSaved` 도 함께 봅니다.
   */
  const { data: savedRouteList } = useSavedRoutes();
  const savedRouteIds = useMemo(
    () => new Set((savedRouteList?.routes ?? []).map((route) => route.id)),
    [savedRouteList],
  );

  /**
   * 방금 저장한 id. 서버 목록만 보면 재조회가 끝날 때까지 버튼이 "저장" 으로
   * 남아, 저장이 안 된 것처럼 보입니다. 요청을 보내는 순간 먼저 반영하고
   * 실패하면 되돌립니다.
   */
  const [justSavedIds, setJustSavedIds] = useState<ReadonlySet<string>>(
    new Set(),
  );

  const isRouteSaved = (routeId: string) =>
    justSavedIds.has(routeId) ||
    savedRouteIds.has(routeId) ||
    (routeDetail?.id === routeId && routeDetail.isSaved);

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

  /**
   * 서버는 같은 루트를 두 번 저장해도 목록에 하나만 남깁니다(저장 목록 응답의
   * 식별자가 routeId 하나뿐이라 중복을 표현할 수 없습니다). 그래서 이미 저장한
   * 코스는 버튼을 "저장됨" 으로 굳히고 요청 자체를 보내지 않습니다.
   */
  const handleSave = (routeId: string) => {
    if (createSavedRoute.isPending || isRouteSaved(routeId)) return;

    setJustSavedIds((previous) => new Set(previous).add(routeId));

    createSavedRoute.mutate(routeId, {
      onSuccess: () => showToast({ message: "저장되었습니다" }),
      onError: (saveError) => {
        // 실패했으면 다시 누를 수 있도록 되돌립니다.
        setJustSavedIds((previous) => {
          const next = new Set(previous);
          next.delete(routeId);
          return next;
        });

        showToast({
          message: toErrorMessage(
            saveError,
            "저장하지 못했어요. 잠시 후 다시 시도해 주세요.",
          ),
        });
      },
    });
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

      {conditions && (
        <ConditionSummary
          durationDays={conditions.durationDays}
          dailyBudgetWon={conditions.dailyBudgetWon}
          travelStyleNames={travelStyleNames}
          // 여기서 들어온 설문만 이전 답을 채웁니다.
          onEdit={() => navigate("/survey?mode=edit")}
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

      <div ref={listAreaRef} className={styles.listArea}>
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
                        onSave={() => handleSave(route.id)}
                        isSaved={isRouteSaved(route.id)}
                        onViewSavedList={() => navigate("/saved")}
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
    </div>
  );
}
