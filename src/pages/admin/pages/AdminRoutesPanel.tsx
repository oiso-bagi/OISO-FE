import { useState } from "react";
import { Link } from "react-router-dom";

import { Badge } from "../components/Badge";
import { ConfirmDialog } from "../components/ConfirmDialog";
import type { DataTableColumn } from "../components/DataTable";
import { DataTable } from "../components/DataTable";
import { FilterBar } from "../components/FilterBar";
import { Pagination } from "../components/Pagination";
import { Toggle } from "../components/Toggle";
import * as styles from "../components/ui.css";
import {
  useAdminRoutes,
  useToggleRoutePublished,
} from "../hooks/useAdminContents";
import { toAdminErrorMessage } from "../lib/adminCache";
import { formatDate } from "../lib/format";
import { useDebouncedValue } from "../lib/useDebouncedValue";
import { ROUTE_THEMES } from "../constants";
import { useListQueryParams } from "../lib/useListQueryParams";
import type { AdminRoute } from "../types";

const FILTER_KEYS = ["theme", "isPublished"] as const;

const THEME_OPTIONS = [{ value: "", label: "테마 전체" }, ...ROUTE_THEMES];

const PUBLISHED_OPTIONS = [
  { value: "", label: "게시 전체" },
  { value: "true", label: "게시 중" },
  { value: "false", label: "미게시" },
];

interface PendingAction {
  route: AdminRoute;
  next: boolean;
}

export function AdminRoutesPanel() {
  const { page, size, q, filters, setPage, setQ, setFilter } =
    useListQueryParams({ filterKeys: FILTER_KEYS, prefix: "route" });

  const debouncedQ = useDebouncedValue(q);

  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );

  const routesQuery = useAdminRoutes({
    page,
    size,
    q: debouncedQ || undefined,
    theme: filters.theme || undefined,
    isPublished:
      filters.isPublished === "" ? undefined : filters.isPublished === "true",
  });

  const togglePublished = useToggleRoutePublished();

  const columns: DataTableColumn<AdminRoute>[] = [
    {
      key: "route",
      header: "코스",
      render: (route) => (
        <div className={styles.cellStack}>
          <span>{route.name}</span>
          <span className={styles.cellMuted}>{route.id}</span>
        </div>
      ),
    },
    {
      key: "theme",
      header: "테마",
      width: "130px",
      render: (route) => <Badge>{route.themeLabel}</Badge>,
    },
    {
      key: "stopCount",
      header: "경유지",
      width: "80px",
      numeric: true,
      render: (route) => `${route.stopCount}곳`,
    },
    {
      key: "totalDistanceKm",
      header: "총 거리",
      width: "90px",
      numeric: true,
      render: (route) => `${route.totalDistanceKm}km`,
    },
    {
      key: "createdAt",
      header: "등록일",
      width: "110px",
      numeric: true,
      render: (route) => formatDate(route.createdAt),
    },
    {
      key: "isPublished",
      header: "게시",
      width: "140px",
      render: (route) => (
        <div className={styles.cellActions}>
          <Toggle
            isOn={route.isPublished}
            isDisabled={
              togglePublished.isPending &&
              togglePublished.variables?.routeId === route.id
            }
            label={`${route.name} 게시`}
            onChange={(next) => setPendingAction({ route, next })}
          />
          <Badge tone={route.isPublished ? "success" : "neutral"}>
            {route.isPublished ? "게시 중" : "미게시"}
          </Badge>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "64px",
      render: (route) => (
        <Link
          to={`/admin/routes/${route.id}/edit`}
          className={styles.tableLink}
          aria-label={`${route.name} 수정`}
        >
          수정
        </Link>
      ),
    },
  ];

  return (
    <div className={styles.panel}>
      <FilterBar
        searchValue={q}
        onSearchChange={setQ}
        searchPlaceholder="코스명 검색"
        selects={[
          {
            key: "theme",
            label: "테마",
            value: filters.theme,
            options: THEME_OPTIONS,
            onChange: (value) => setFilter("theme", value),
          },
          {
            key: "isPublished",
            label: "게시 상태",
            value: filters.isPublished,
            options: PUBLISHED_OPTIONS,
            onChange: (value) => setFilter("isPublished", value),
          },
        ]}
        action={
          <Link to="/admin/routes/new" className={styles.linkButton}>
            + 코스 등록
          </Link>
        }
      />

      {togglePublished.error && (
        <p className={styles.inlineError} role="alert">
          {toAdminErrorMessage(togglePublished.error, "변경하지 못했어요.")}
        </p>
      )}

      <DataTable
        columns={columns}
        rows={routesQuery.data?.items ?? []}
        getRowId={(route) => route.id}
        isPending={routesQuery.isPending}
        isError={routesQuery.isError}
        errorMessage="코스 목록을 불러오지 못했어요."
        emptyMessage="조건에 맞는 코스가 없어요."
      />

      <Pagination
        page={routesQuery.data?.page ?? page}
        size={routesQuery.data?.size ?? size}
        totalCount={routesQuery.data?.totalCount ?? 0}
        onChange={setPage}
      />

      <ConfirmDialog
        isOpen={pendingAction !== null}
        title={pendingAction?.next ? "코스를 게시할까요?" : "게시를 내릴까요?"}
        // 게시 전환은 서비스 사용자에게 즉시 보이므로 영향 범위를 적어 둡니다.
        description={
          pendingAction
            ? pendingAction.next
              ? `${pendingAction.route.name}이(가) 서비스 추천 목록에 바로 노출됩니다.`
              : `${pendingAction.route.name}이(가) 서비스 추천 목록에서 즉시 내려갑니다.`
            : ""
        }
        confirmLabel={pendingAction?.next ? "게시" : "게시 내리기"}
        isDanger={pendingAction?.next === false}
        onConfirm={() => {
          if (!pendingAction) return;

          togglePublished.mutate({
            routeId: pendingAction.route.id,
            isPublished: pendingAction.next,
          });
          setPendingAction(null);
        }}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
}
