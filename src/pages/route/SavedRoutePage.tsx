import { useState } from "react";

import { RouteBox } from "@/shared/components/RouteBox";
import { Header } from "@/shared/components/header/Header";
import { pageContent } from "@/shared/styles/layout.css";

import { RouteStopList } from "./components/RouteStopList";
import * as styles from "./components/routeLayout.css";
import { useSavedRouteDetail } from "./hooks/useSavedRouteDetail";
import {
  useDeleteSavedRoute,
  useSavedRoutes,
  useUpdateSavedRouteCompleted,
} from "./hooks/useSavedRoutes";
import {
  formatDistance,
  formatTransportation,
  toRouteSummaryItems,
} from "./utils/routeFormat";
import { SavedRouteSummary } from "./components/SavedRouteSummary";

export function SavedRoutePage() {
  const [expandedRouteId, setExpandedRouteId] = useState<number | null>(null);

  const { data, isPending, isError } = useSavedRoutes();
  // 카드를 펼쳤을 때만 이 쿼리가 켜지므로, isPending 은 "아직 결과 없음"과 같습니다.
  // isLoading 은 재시도 대기 중 false 가 되어 빈 화면이 생깁니다.
  const {
    data: routeDetail,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useSavedRouteDetail(expandedRouteId);

  const updateCompleted = useUpdateSavedRouteCompleted();
  const deleteRoute = useDeleteSavedRoute();

  const routes = data?.routes ?? [];

  const calculatedSavingAmount = routes.reduce(
    (total, route) => total + (route.savingAmount ?? 0),
    0,
  );

  const totalSavingAmount = data?.totalSavingAmount ?? calculatedSavingAmount;

  const handleToggleExpanded = (routeId: number) => {
    setExpandedRouteId((prev) => (prev === routeId ? null : routeId));
  };

  const handleToggleCompleted = (routeId: number, isCompleted: boolean) => {
    updateCompleted.mutate({ routeId, isCompleted: !isCompleted });
  };

  const handleDelete = (routeId: number) => {
    deleteRoute.mutate(routeId);
  };

  return (
    <div>
      <Header
        backTo="/"
        title="저장한 루트"
        rightText={`${routes.length}개`}
        rightVariant="count"
      />

      <div className={pageContent}>
        <SavedRouteSummary
          totalSavingAmount={isPending || isError ? null : totalSavingAmount}
        />

        {isPending && <p className={styles.statusText}>루트를 불러오는 중…</p>}
        {isError && (
          <p className={styles.statusText}>
            루트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </p>
        )}
        {routes && routes.length === 0 && (
          <p className={styles.statusText}>아직 저장한 루트가 없어요.</p>
        )}
        {routes && routes.length > 0 && (
          <div className={styles.routeList}>
            {routes.map((route) => (
              <RouteBox
                key={route.id}
                variant="editable"
                title={route.name}
                placeCount={route.stopCount}
                distance={formatDistance(route.distanceKm)}
                transportation={formatTransportation(route.transportationTypes)}
                summaryItems={toRouteSummaryItems(route, "editable")}
                isCompleted={route.isCompleted}
                isExpanded={expandedRouteId === route.id}
                onToggleExpanded={() => handleToggleExpanded(route.id)}
                onToggleCompleted={() =>
                  handleToggleCompleted(route.id, route.isCompleted)
                }
                onDelete={() => handleDelete(route.id)}
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
                        경유지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
                      </p>
                    )}

                    {routeDetail?.id === route.id && (
                      <RouteStopList stops={routeDetail.stops} />
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
