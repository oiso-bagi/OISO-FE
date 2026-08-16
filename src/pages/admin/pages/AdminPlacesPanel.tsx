import { useState } from "react";

import { Badge } from "../components/Badge";
import { ConfirmDialog } from "../components/ConfirmDialog";
import type { DataTableColumn } from "../components/DataTable";
import { DataTable } from "../components/DataTable";
import { FilterBar } from "../components/FilterBar";
import { Pagination } from "../components/Pagination";
import { Toggle } from "../components/Toggle";
import * as styles from "../components/ui.css";
import {
  useAdminPlaces,
  useTogglePlaceActive,
} from "../hooks/useAdminContents";
import { toAdminErrorMessage } from "../lib/adminCache";
import { useDebouncedValue } from "../lib/useDebouncedValue";
import { useListQueryParams } from "../lib/useListQueryParams";
import type { AdminPlace, PlaceCategory } from "../types";

const FILTER_KEYS = ["category", "isActive"] as const;

const CATEGORY_LABEL: Record<PlaceCategory, string> = {
  MARKET: "전통시장",
  CAFE: "카페",
  FOOD: "식당",
  CULTURE: "문화",
  NATURE: "자연",
  EXPERIENCE: "체험",
  VIEWPOINT: "전망",
  ETC: "기타",
};

const CATEGORY_OPTIONS = [
  { value: "", label: "카테고리 전체" },
  ...Object.entries(CATEGORY_LABEL).map(([value, label]) => ({ value, label })),
];

const ACTIVE_OPTIONS = [
  { value: "", label: "노출 전체" },
  { value: "true", label: "노출 중" },
  { value: "false", label: "노출 중지" },
];

interface PendingAction {
  place: AdminPlace;
  next: boolean;
}

export function AdminPlacesPanel() {
  const { page, size, q, filters, setPage, setQ, setFilter } =
    useListQueryParams({ filterKeys: FILTER_KEYS, prefix: "place" });

  const debouncedQ = useDebouncedValue(q);

  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );

  const placesQuery = useAdminPlaces({
    page,
    size,
    q: debouncedQ || undefined,
    category: (filters.category || undefined) as PlaceCategory | undefined,
    isActive: filters.isActive === "" ? undefined : filters.isActive === "true",
  });

  const toggleActive = useTogglePlaceActive();

  const columns: DataTableColumn<AdminPlace>[] = [
    {
      key: "place",
      header: "장소",
      render: (place) => (
        <div className={styles.cellStack}>
          <span>{place.name}</span>
          <span className={`${styles.cellMuted} ${styles.cellEllipsis}`}>
            {place.address}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      header: "카테고리",
      width: "110px",
      render: (place) =>
        place.category ? (
          <Badge>{CATEGORY_LABEL[place.category]}</Badge>
        ) : (
          // 기존 응답에서 카테고리는 nullable 입니다.
          <span className={styles.cellMuted}>미분류</span>
        ),
    },
    {
      key: "tpiScore",
      header: "TPI",
      width: "80px",
      numeric: true,
      render: (place) => place.tpiScore?.toFixed(2) ?? "—",
    },
    {
      key: "coords",
      header: "좌표",
      width: "150px",
      numeric: true,
      render: (place) => (
        <span className={styles.cellMuted}>
          {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
        </span>
      ),
    },
    {
      key: "isActive",
      header: "노출",
      width: "150px",
      render: (place) => (
        <div className={styles.cellActions}>
          <Toggle
            isOn={place.isActive}
            isDisabled={
              toggleActive.isPending &&
              toggleActive.variables?.placeId === place.id
            }
            label={`${place.name} 노출`}
            onChange={(next) => setPendingAction({ place, next })}
          />
          <Badge tone={place.isActive ? "success" : "neutral"}>
            {place.isActive ? "노출 중" : "중지"}
          </Badge>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.panel}>
      <FilterBar
        searchValue={q}
        onSearchChange={setQ}
        searchPlaceholder="장소명 또는 주소 검색"
        selects={[
          {
            key: "category",
            label: "카테고리",
            value: filters.category,
            options: CATEGORY_OPTIONS,
            onChange: (value) => setFilter("category", value),
          },
          {
            key: "isActive",
            label: "노출 상태",
            value: filters.isActive,
            options: ACTIVE_OPTIONS,
            onChange: (value) => setFilter("isActive", value),
          },
        ]}
      />

      {toggleActive.error && (
        <p className={styles.inlineError} role="alert">
          {toAdminErrorMessage(toggleActive.error, "변경하지 못했어요.")}
        </p>
      )}

      <DataTable
        columns={columns}
        rows={placesQuery.data?.items ?? []}
        getRowId={(place) => place.id}
        isPending={placesQuery.isPending}
        isError={placesQuery.isError}
        errorMessage="장소 목록을 불러오지 못했어요."
        emptyMessage="조건에 맞는 장소가 없어요."
      />

      <Pagination
        page={placesQuery.data?.page ?? page}
        size={placesQuery.data?.size ?? size}
        totalCount={placesQuery.data?.totalCount ?? 0}
        onChange={setPage}
      />

      <ConfirmDialog
        isOpen={pendingAction !== null}
        /**
         * Soft Delete 는 데이터가 남는 동작입니다. "삭제" 로 적으면 복구가
         * 안 된다고 오해할 수 있어 "노출 중지" 로 부릅니다.
         */
        title={pendingAction?.next ? "다시 노출할까요?" : "노출을 중지할까요?"}
        description={
          pendingAction
            ? pendingAction.next
              ? `${pendingAction.place.name}이(가) 다시 서비스에 노출됩니다.`
              : `${pendingAction.place.name}이(가) 서비스에서 보이지 않게 됩니다. 데이터는 지워지지 않아 언제든 다시 노출할 수 있어요.`
            : ""
        }
        confirmLabel={pendingAction?.next ? "노출" : "노출 중지"}
        isDanger={pendingAction?.next === false}
        onConfirm={() => {
          if (!pendingAction) return;

          toggleActive.mutate({
            placeId: pendingAction.place.id,
            isActive: pendingAction.next,
          });
          setPendingAction(null);
        }}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
}
