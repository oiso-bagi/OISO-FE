import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ConfirmDialog } from "@/shared/components/ConfirmDialog/ConfirmDialog";
import { RouteBox } from "@/shared/components/RouteBox";
import { EmptyState } from "@/shared/components/EmptyState";
import { Header } from "@/shared/components/header/Header";
import { RouteListSkeleton } from "@/shared/components/Skeleton/RouteCardSkeleton";
import { useToast } from "@/shared/components/Toast/toastContext";
import { toErrorMessage } from "@/shared/api/apiError";
import { trackEvent } from "@/shared/lib/analytics";
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
import {
  useCreateSavedRoute,
  useDeleteSavedRoute,
  useSavedRoutes,
} from "./hooks/useSavedRoutes";
import type { SelectedDay } from "./types/day";
import { formatDistance, toRouteSummaryItems } from "./utils/routeFormat";

import * as styles from "./components/routeLayout.css";

/**
 * 저장·저장 취소 토스트 표시 시간.
 *
 * 기본 4초는 목록 위를 오래 가립니다. "저장 목록 바로가기" 를 누를 시간은
 * 남깁니다. 실패 토스트는 읽어야 할 내용이 있어 기본 시간을 씁니다.
 */
const SAVE_TOAST_DURATION_MS = 2500;

export function RoutePage() {
  const navigate = useNavigate();

  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<SelectedDay>("all");

  /**
   * 지도 핀 위에 장소 정보를 띄운 경유지. 지도와 경유지 목록이 함께 씁니다.
   * 같은 경유지를 다시 누르면 닫습니다.
   */
  const [selectedStopSequence, setSelectedStopSequence] = useState<
    number | null
  >(null);

  const handleSelectStop = (sequence: number | null) => {
    setSelectedStopSequence((previous) =>
      sequence !== null && previous === sequence ? null : sequence,
    );
  };

  // 일차를 바꾸면 보던 장소가 지도에서 사라질 수 있어 정보를 닫습니다.
  const handleSelectDay = (day: SelectedDay) => {
    setSelectedDay(day);
    setSelectedStopSequence(null);
  };

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
   * 어떤 조건으로 찾은 결과인지 화면에 남깁니다. 설문을 마치기 전이거나 새
   * 기기라 없을 수 있어, 없으면 추천 대신 설문 안내를 그립니다.
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
  const deleteSavedRoute = useDeleteSavedRoute();
  const isSaveRequestPending =
    createSavedRoute.isPending || deleteSavedRoute.isPending;
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
   * 방금 저장하거나 취소한 결과. 서버 목록·상세만 보면 재조회가 끝날 때까지
   * 버튼이 이전 상태로 남아 눌리지 않은 것처럼 보입니다. 요청을 보내는 순간
   * 먼저 반영하고 실패하면 지워 서버 값으로 되돌립니다.
   */
  const [saveOverrides, setSaveOverrides] = useState<
    ReadonlyMap<string, boolean>
  >(new Map());

  const setSaveOverride = (routeId: string, isSaved: boolean | null) => {
    setSaveOverrides((previous) => {
      const next = new Map(previous);

      if (isSaved === null) {
        next.delete(routeId);
      } else {
        next.set(routeId, isSaved);
      }

      return next;
    });
  };

  const isRouteSaved = (routeId: string) =>
    saveOverrides.get(routeId) ??
    (savedRouteIds.has(routeId) ||
      (routeDetail?.id === routeId && routeDetail.isSaved));

  // 저장 취소 확인 다이얼로그 대상 (null 이면 닫힘)
  const [cancelSaveTargetId, setCancelSaveTargetId] = useState<string | null>(
    null,
  );
  const cancelSaveTarget = routes?.find(
    (route) => route.id === cancelSaveTargetId,
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
    // 접는 건 관심 신호가 아니라 펼칠 때만 보냅니다.
    if (expandedRouteId !== routeId) {
      const rank = (routes ?? []).findIndex((route) => route.id === routeId);

      trackEvent("route_expand", { route_id: routeId, rank: rank + 1 });
    }

    setExpandedRouteId((prev) => (prev === routeId ? null : routeId));
    // 다른 코스를 펼치면 이전 코스에서 고른 일차·장소는 의미가 없습니다.
    setSelectedDay("all");
    setSelectedStopSequence(null);
  };

  /**
   * 서버는 같은 루트를 두 번 저장해도 목록에 하나만 남깁니다(저장 목록 응답의
   * 식별자가 routeId 하나뿐이라 중복을 표현할 수 없습니다). 그래서 이미 저장한
   * 코스는 다시 저장하지 않고, 누르면 저장을 취소합니다.
   */
  const handleToggleSave = (routeId: string) => {
    if (isSaveRequestPending) return;

    if (!isRouteSaved(routeId)) {
      saveRoute(routeId);
      return;
    }

    /**
     * 완료한 여행은 대시보드 절약 기록에 들어가 있어, 저장을 취소하면 그 기록도
     * 함께 사라집니다. 이때만 한 번 확인받습니다. 저장 목록을 아직 못 받아
     * 완료 여부를 모르면 안전하게 확인받습니다.
     */
    const savedRoute = savedRouteList?.routes.find(
      (route) => route.id === routeId,
    );

    if (!savedRouteList || savedRoute?.isCompleted) {
      setCancelSaveTargetId(routeId);
      return;
    }

    cancelSave(routeId);
  };

  /**
   * `mutate` 의 호출별 콜백은 요청 중 화면을 벗어나면 실행되지 않아, 저장하고
   * 바로 다른 탭으로 가면 `route_save` 이벤트와 결과 토스트가 빠집니다.
   * 컴포넌트 수명과 무관한 `mutateAsync` 로 처리합니다.
   *
   * 성공·실패 처리는 `then` 의 두 인자로 나눕니다. `.catch` 로 받으면 성공
   * 뒤 이벤트 전송이나 토스트에서 난 오류까지 요청 실패로 보고, 서버에는
   * 저장됐는데 화면을 되돌리고 실패 토스트를 띄웁니다.
   */
  const saveRoute = (routeId: string) => {
    setSaveOverride(routeId, true);

    createSavedRoute.mutateAsync(routeId).then(
      () => {
        trackEvent("route_save", { route_id: routeId });

        // 저장하고 나면 할 일이 없어 흐름이 끊깁니다. 토스트에서 바로 넘어갑니다.
        showToast({
          message: "저장되었습니다",
          duration: SAVE_TOAST_DURATION_MS,
          actionLabel: "저장 목록 바로가기",
          onAction: () => navigate("/saved"),
        });
      },
      (saveError: unknown) => {
        // 실패했으면 다시 누를 수 있도록 되돌립니다.
        setSaveOverride(routeId, null);

        showToast({
          message: toErrorMessage(
            saveError,
            "저장하지 못했어요. 잠시 후 다시 시도해 주세요.",
          ),
        });
      },
    );
  };

  const cancelSave = (routeId: string) => {
    setSaveOverride(routeId, false);

    deleteSavedRoute.mutateAsync(routeId).then(
      () => {
        showToast({
          message: "저장이 취소되었습니다",
          duration: SAVE_TOAST_DURATION_MS,
        });
      },
      (cancelError: unknown) => {
        setSaveOverride(routeId, null);

        showToast({
          message: toErrorMessage(
            cancelError,
            "저장을 취소하지 못했어요. 잠시 후 다시 시도해 주세요.",
          ),
        });
      },
    );
  };

  const handleConfirmCancelSave = () => {
    if (cancelSaveTargetId !== null) {
      cancelSave(cancelSaveTargetId);
    }

    setCancelSaveTargetId(null);
  };

  /**
   * 조건이 없으면 추천을 만들 수 없어 설문으로 안내합니다. 설문으로 바로
   * 보내지 않는 이유는 설문에 하단 네비가 없어, 탭만 눌렀던 사용자가 다른
   * 화면으로 돌아갈 길을 잃기 때문입니다.
   */
  if (!conditions) {
    return (
      <div className={styles.page}>
        <div className={styles.headerArea}>
          <Header backTo="/" title="추천 루트" />
        </div>

        <div className={styles.listArea}>
          <EmptyState
            className={styles.noConditionsState}
            title="아직 고른 조건이 없습니다!!"
            description="설문에 답하면 조건에 맞는 코스를 추천해 드려요."
            actionLabel="코스 짜러 가기"
            actionTo="/survey"
          />
        </div>
      </div>
    );
  }

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

      <ConditionSummary
        durationDays={conditions.durationDays}
        dailyBudgetWon={conditions.dailyBudgetWon}
        travelStyleNames={travelStyleNames}
        // 여기서 들어온 설문만 이전 답을 채웁니다.
        editTo="/survey?mode=edit"
      />

      {isMultiDay && (
        <DayTabs
          dayNumbers={dayNumbers}
          selectedDay={selectedDay}
          onSelect={handleSelectDay}
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
          selectedStopSequence={selectedStopSequence}
          onSelectStop={handleSelectStop}
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
          <EmptyState
            title="조건에 맞는 코스가 없습니다!!"
            description="조건을 바꾸면 다른 코스가 나올 수 있어요."
            actionLabel="조건 바꿔서 다시 찾기"
            actionTo="/survey?mode=edit"
          />
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
                        selectedStopSequence={selectedStopSequence}
                        onSelectStop={handleSelectStop}
                        onToggleSave={() => handleToggleSave(route.id)}
                        isSaved={isRouteSaved(route.id)}
                        isSaving={isSaveRequestPending}
                      />
                    )}
                  </>
                )}
              </RouteBox>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={cancelSaveTargetId !== null}
        title={
          cancelSaveTarget
            ? `'${cancelSaveTarget.name}' 저장을 취소할까요?`
            : "저장을 취소할까요?"
        }
        description="여행 완료로 기록한 코스는 대시보드의 절약 기록도 함께 사라져요."
        confirmLabel="저장 취소"
        cancelLabel="닫기"
        onCancel={() => setCancelSaveTargetId(null)}
        onConfirm={handleConfirmCancelSave}
      />
    </div>
  );
}
