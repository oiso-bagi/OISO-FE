import { useState } from "react";

import RouteBox from "@/shared/components/RouteBox";
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

export function SavedRoutePage() {
  const [expandedRouteId, setExpandedRouteId] = useState<number | null>(null);

  const { data, isPending, isError } = useSavedRoutes();
  const { data: routeDetail } = useSavedRouteDetail(expandedRouteId);

  const updateCompleted = useUpdateSavedRouteCompleted();
  const deleteRoute = useDeleteSavedRoute();

  const routes = data?.routes;

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
        right={routes && <span>{routes.length}개</span>}
      />

      <div className={pageContent}>
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
                {routeDetail?.id === route.id && (
                  <RouteStopList stops={routeDetail.stops} />
                )}
              </RouteBox>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
