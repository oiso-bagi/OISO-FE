import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RouteBox } from "@/shared/components/RouteBox";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog/ConfirmDialog";
import { EmptyState } from "@/shared/components/EmptyState";
import { Header } from "@/shared/components/header/Header";
import { RouteListSkeleton } from "@/shared/components/Skeleton/RouteCardSkeleton";
import { useToast } from "@/shared/components/Toast/toastContext";
import { toErrorMessage } from "@/shared/api/apiError";
import { trackEvent } from "@/shared/lib/analytics";

import { SavedRouteSummary } from "./components/SavedRouteSummary";
import { TransportationLabel } from "./components/TransportationLabel";
import {
  useDeleteSavedRoute,
  useSavedRoutes,
  useUpdateSavedRouteCompleted,
} from "./hooks/useSavedRoutes";
import { formatDistance, toRouteSummaryItems } from "./utils/routeFormat";

import { pageContent } from "@/shared/styles/layout.css";
import * as styles from "./components/routeLayout.css";

export function SavedRoutePage() {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useSavedRoutes();

  const updateCompleted = useUpdateSavedRouteCompleted();
  const deleteRoute = useDeleteSavedRoute();
  const showToast = useToast();

  // 삭제 확인 다이얼로그 대상 (null 이면 닫힘)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const routes = data?.routes ?? [];

  const deleteTarget = routes.find((route) => route.id === deleteTargetId);

  const isEmpty = !isPending && !isError && routes.length === 0;

  // 서버가 총액을 안 줄 때의 폴백. 절약액은 음수라 절댓값으로 합산합니다.
  const calculatedSavingAmount = routes.reduce(
    (total, route) => total + Math.abs(route.savingAmount ?? 0),
    0,
  );

  const totalSavingAmount = data?.totalSavingAmount ?? calculatedSavingAmount;

  // 상세보기 → 지도 상세 페이지로 이동
  const handleOpenMap = (routeId: string) => {
    navigate(`/map/${routeId}?source=saved`);
  };

  const handleToggleCompleted = (routeId: string, isCompleted: boolean) => {
    // 진행 중이면 중복 요청을 막습니다.
    if (updateCompleted.isPending) return;

    /**
     * `mutate` 의 호출별 콜백은 요청 중 화면을 벗어나면 실행되지 않아 이벤트가
     * 누락됩니다. 컴포넌트 수명과 무관한 `mutateAsync` 로 처리합니다.
     */
    updateCompleted
      .mutateAsync({ routeId, isCompleted: !isCompleted })
      .then(() => {
        // 요청이 실패하면 완료로 집계되지 않습니다.
        if (!isCompleted) {
          trackEvent("trip_complete", {
            route_id: routeId,
            from: "saved_list",
          });
        }
      })
      .catch((toggleError: unknown) =>
        showToast({
          message: toErrorMessage(
            toggleError,
            "상태를 변경하지 못했어요. 다시 시도해 주세요.",
          ),
        }),
      );
  };

  // 삭제는 되돌리기 어려우니 확인 다이얼로그를 거칩니다.
  const handleRequestDelete = (routeId: string) => {
    setDeleteTargetId(routeId);
  };

  const handleConfirmDelete = () => {
    // 진행 중이면 중복 삭제를 막습니다.
    if (deleteRoute.isPending) return;

    if (deleteTargetId !== null) {
      // 삭제 성공 토스트는 띄우지 않습니다(확인 다이얼로그로 이미 피드백을 줬음).
      // 실패했을 때만 알립니다.
      deleteRoute.mutate(deleteTargetId, {
        onError: (removeError) =>
          showToast({
            message: toErrorMessage(
              removeError,
              "삭제하지 못했어요. 잠시 후 다시 시도해 주세요.",
            ),
          }),
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
        {/* 담은 게 없는데 "누적 절약 0원" 까지 띄우면 빈 화면이 두 번 반복됩니다. */}
        {!isEmpty && (
          <SavedRouteSummary
            totalSavingAmount={isPending || isError ? null : totalSavingAmount}
          />
        )}

        {isPending && <RouteListSkeleton />}
        {isError && (
          <p className={styles.statusText}>
            {toErrorMessage(
              error,
              "루트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            )}
          </p>
        )}
        {isEmpty && (
          <EmptyState
            title="담은 코스가 없습니다!!"
            description="추천 코스에서 마음에 드는 걸 담아 보세요."
            actionLabel="추천 코스 보러 가기"
            actionTo="/route"
          />
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
                transportation={
                  <TransportationLabel types={route.transportationTypes} />
                }
                summaryItems={toRouteSummaryItems(route, "editable")}
                isCompleted={route.isCompleted}
                isDisabled={updateCompleted.isPending || deleteRoute.isPending}
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
        isOpen={deleteTarget !== undefined}
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
