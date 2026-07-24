import { useNavigate } from "react-router-dom";

import { RouteBox } from "@/shared/components/RouteBox";
import { Header } from "@/shared/components/header/Header";
import { pageContent } from "@/shared/styles/layout.css";

import * as styles from "./components/routeLayout.css";

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
  const navigate = useNavigate();

  const { data, isPending, isError } = useSavedRoutes();

  const updateCompleted = useUpdateSavedRouteCompleted();
  const deleteRoute = useDeleteSavedRoute();

  const routes = data?.routes ?? [];

  const calculatedSavingAmount = routes.reduce(
    (total, route) => total + (route.savingAmount ?? 0),
    0,
  );

  const totalSavingAmount = data?.totalSavingAmount ?? calculatedSavingAmount;

  // 상세보기 → 지도 상세 페이지로 이동
  const handleOpenMap = (routeId: number) => {
    navigate(`/map/${routeId}?source=saved`);
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
                onToggleExpanded={() => handleOpenMap(route.id)}
                onToggleCompleted={() =>
                  handleToggleCompleted(route.id, route.isCompleted)
                }
                onDelete={() => handleDelete(route.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
