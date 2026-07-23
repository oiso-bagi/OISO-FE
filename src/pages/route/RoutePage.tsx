import { useState } from "react";

import { RouteBox } from "@/shared/components/RouteBox";
import { Header } from "@/shared/components/header/Header";
import { pageContent } from "@/shared/styles/layout.css";

import { RouteStopList } from "./components/RouteStopList";
import * as styles from "./components/routeLayout.css";
import { useRecommendedRouteDetail } from "./hooks/useRecommendedRouteDetail";
import { useRecommendedRoutes } from "./hooks/useRecommendedRoutes";
import { useCreateSavedRoute } from "./hooks/useSavedRoutes";
import {
  formatDistance,
  formatTransportation,
  toRouteSummaryItems,
} from "./utils/routeFormat";

export function RoutePage() {
  const [expandedRouteId, setExpandedRouteId] = useState<number | null>(null);

  const { data: routes, isPending, isError } = useRecommendedRoutes();
  // 카드를 펼쳤을 때만 이 쿼리가 켜지므로, isPending 은 "아직 결과 없음"과 같습니다.
  // isLoading 은 재시도 대기 중 false 가 되어 빈 화면이 생깁니다.
  const {
    data: routeDetail,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useRecommendedRouteDetail(expandedRouteId);

  const createSavedRoute = useCreateSavedRoute();

  const handleToggleExpanded = (routeId: number) => {
    setExpandedRouteId((prev) => (prev === routeId ? null : routeId));
  };

  const handleSave = (routeId: number) => {
    createSavedRoute.mutate(routeId);
  };

  return (
    <div>
      <Header backTo="/" title="추천 루트" />

      <div className={pageContent}>
        {isPending && <p className={styles.statusText}>루트를 불러오는 중…</p>}

        {isError && (
          <p className={styles.statusText}>
            루트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
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
                transportation={formatTransportation(route.transportationTypes)}
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
                        경유지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
                      </p>
                    )}

                    {routeDetail?.id === route.id && (
                      <RouteStopList
                        stops={routeDetail.stops}
                        onSave={
                          routeDetail.isSaved
                            ? undefined
                            : () => handleSave(route.id)
                        }
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
