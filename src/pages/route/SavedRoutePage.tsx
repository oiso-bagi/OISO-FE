import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RouteBox } from "@/shared/components/RouteBox";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog/ConfirmDialog";
import { Header } from "@/shared/components/header/Header";
import { RouteListSkeleton } from "@/shared/components/Skeleton/RouteCardSkeleton";
import { useToast } from "@/shared/components/Toast/toastContext";
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
  const showToast = useToast();

  // 삭제 확인 다이얼로그 대상 (null 이면 닫힘)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const routes = data?.routes ?? [];

  const deleteTarget = routes.find((route) => route.id === deleteTargetId);

  // 서버가 총액을 안 줄 때의 폴백. 절약액은 음수라 절댓값으로 합산합니다.
  const calculatedSavingAmount = routes.reduce(
    (total, route) => total + Math.abs(route.savingAmount ?? 0),
    0,
  );

  const totalSavingAmount = data?.totalSavingAmount ?? calculatedSavingAmount;

  // 상세보기 → 지도 상세 페이지로 이동
  const handleOpenMap = (routeId: number) => {
    navigate(`/map/${routeId}?source=saved`);
  };

  const handleToggleCompleted = (routeId: number, isCompleted: boolean) => {
    updateCompleted.mutate(
      { routeId, isCompleted: !isCompleted },
      {
        onError: () =>
          showToast({ message: "상태를 변경하지 못했어요. 다시 시도해 주세요." }),
      },
    );
  };

  // 삭제는 되돌리기 어려우니 확인 다이얼로그를 거칩니다.
  const handleRequestDelete = (routeId: number) => {
    setDeleteTargetId(routeId);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId !== null) {
      // 삭제 성공 토스트는 띄우지 않습니다(확인 다이얼로그로 이미 피드백을 줬음).
      // 실패했을 때만 알립니다.
      deleteRoute.mutate(deleteTargetId, {
        onError: () =>
          showToast({ message: "삭제하지 못했어요. 잠시 후 다시 시도해 주세요." }),
      });
    }
    setDeleteTargetId(null);
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

        {isPending && <RouteListSkeleton />}
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
                onDelete={() => handleRequestDelete(route.id)}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== undefined}
        title={
          deleteTarget
            ? `'${deleteTarget.name}'을(를) 삭제할까요?`
            : "루트를 삭제할까요?"
        }
        description="삭제한 루트는 되돌릴 수 없어요."
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
