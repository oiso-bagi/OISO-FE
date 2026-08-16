import { useState } from "react";

import { Badge } from "../components/Badge";
import { ConfirmDialog } from "../components/ConfirmDialog";
import type { DataTableColumn } from "../components/DataTable";
import { DataTable } from "../components/DataTable";
import { FilterBar } from "../components/FilterBar";
import { PageHeader } from "../components/PageHeader";
import { Pagination } from "../components/Pagination";
import { Toggle } from "../components/Toggle";
import * as styles from "../components/ui.css";
import {
  useAdminUsers,
  useChangeUserRole,
  useToggleUserActive,
} from "../hooks/useAdminUsers";
import { toAdminErrorMessage } from "../lib/adminCache";
import { formatDate } from "../lib/format";
import { useDebouncedValue } from "../lib/useDebouncedValue";
import { useListQueryParams } from "../lib/useListQueryParams";
import type { AdminUser, AuthProvider, UserRole } from "../types";

/** 렌더마다 새 배열이 되지 않도록 모듈 상수로 둡니다. */
const FILTER_KEYS = ["provider", "isActive", "role"] as const;

const PROVIDER_OPTIONS = [
  { value: "", label: "제공자 전체" },
  { value: "KAKAO", label: "카카오" },
  { value: "GOOGLE", label: "구글" },
];

const ACTIVE_OPTIONS = [
  { value: "", label: "상태 전체" },
  { value: "true", label: "활성" },
  { value: "false", label: "정지" },
];

const ROLE_OPTIONS = [
  { value: "", label: "권한 전체" },
  { value: "USER", label: "일반" },
  { value: "ADMIN", label: "관리자" },
];

const PROVIDER_LABEL: Record<AuthProvider, string> = {
  KAKAO: "카카오",
  GOOGLE: "구글",
};

/** 확인 모달을 거쳐야 실행되는 동작 */
type PendingAction =
  | { kind: "active"; user: AdminUser; next: boolean }
  | { kind: "role"; user: AdminUser; next: UserRole };

const describeAction = (action: PendingAction) => {
  const who = `${action.user.nickname}(${action.user.email})`;

  if (action.kind === "active") {
    return action.next
      ? {
          title: "계정을 복구할까요?",
          description: `${who} 계정이 다시 활성화됩니다.`,
          confirmLabel: "복구",
          isDanger: false,
        }
      : {
          title: "계정을 정지할까요?",
          description: `${who} 계정이 정지되어 서비스를 이용할 수 없게 됩니다.`,
          confirmLabel: "정지",
          isDanger: true,
        };
  }

  return action.next === "ADMIN"
    ? {
        title: "관리자 권한을 부여할까요?",
        description: `${who} 님이 관리자 화면의 모든 기능을 사용할 수 있게 됩니다.`,
        confirmLabel: "권한 부여",
        isDanger: false,
      }
    : {
        title: "관리자 권한을 해제할까요?",
        description: `${who} 님이 관리자 화면에 접근할 수 없게 됩니다.`,
        confirmLabel: "권한 해제",
        isDanger: true,
      };
};

export function AdminUsersPage() {
  const { page, size, q, filters, setPage, setQ, setFilter } =
    useListQueryParams({ filterKeys: FILTER_KEYS });

  /**
   * 입력값은 URL 이 그대로 들고 있어 즉시 보이고, 조회에 쓰는 값만 늦춥니다.
   * 로컬 상태를 따로 두면 뒤로가기 했을 때 입력창과 URL 이 어긋나므로
   * URL 하나만 기준으로 둡니다.
   */
  const debouncedQ = useDebouncedValue(q);

  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );

  const usersQuery = useAdminUsers({
    page,
    size,
    q: debouncedQ || undefined,
    provider: (filters.provider || undefined) as AuthProvider | undefined,
    isActive: filters.isActive === "" ? undefined : filters.isActive === "true",
    role: (filters.role || undefined) as UserRole | undefined,
  });

  const toggleActive = useToggleUserActive();
  const changeRole = useChangeUserRole();

  const isRowPending = (userId: string) =>
    (toggleActive.isPending && toggleActive.variables?.userId === userId) ||
    (changeRole.isPending && changeRole.variables?.userId === userId);

  const actionError = toggleActive.error ?? changeRole.error;

  const runPendingAction = () => {
    if (!pendingAction) return;

    if (pendingAction.kind === "active") {
      toggleActive.mutate({
        userId: pendingAction.user.id,
        isActive: pendingAction.next,
      });
    } else {
      changeRole.mutate({
        userId: pendingAction.user.id,
        role: pendingAction.next,
      });
    }

    setPendingAction(null);
  };

  const columns: DataTableColumn<AdminUser>[] = [
    {
      key: "user",
      header: "회원",
      render: (user) => (
        <div className={styles.cellStack}>
          <span>{user.nickname}</span>
          <span className={styles.cellMuted}>{user.email}</span>
        </div>
      ),
    },
    {
      key: "provider",
      header: "소셜",
      width: "96px",
      render: (user) => <Badge>{PROVIDER_LABEL[user.provider]}</Badge>,
    },
    {
      key: "createdAt",
      header: "가입일",
      width: "120px",
      numeric: true,
      render: (user) => formatDate(user.createdAt),
    },
    {
      key: "role",
      header: "관리자 권한",
      width: "150px",
      render: (user) => (
        <div className={styles.cellActions}>
          <Toggle
            isOn={user.role === "ADMIN"}
            isDisabled={isRowPending(user.id)}
            label={`${user.nickname} 관리자 권한`}
            onChange={(next) =>
              setPendingAction({
                kind: "role",
                user,
                next: next ? "ADMIN" : "USER",
              })
            }
          />
          {user.role === "ADMIN" && <Badge tone="accent">관리자</Badge>}
        </div>
      ),
    },
    {
      key: "isActive",
      header: "계정 상태",
      width: "140px",
      render: (user) => (
        <div className={styles.cellActions}>
          <Toggle
            isOn={user.isActive}
            isDisabled={isRowPending(user.id)}
            label={`${user.nickname} 계정 활성`}
            onChange={(next) =>
              setPendingAction({ kind: "active", user, next })
            }
          />
          <Badge tone={user.isActive ? "success" : "danger"}>
            {user.isActive ? "활성" : "정지"}
          </Badge>
        </div>
      ),
    },
  ];

  const dialog = pendingAction ? describeAction(pendingAction) : null;

  return (
    <>
      <PageHeader
        title="회원 관리"
        description="회원 계정 상태와 권한을 관리합니다."
      />

      <div className={styles.panel}>
        <FilterBar
          searchValue={q}
          onSearchChange={setQ}
          searchPlaceholder="이메일 또는 닉네임 검색"
          selects={[
            {
              key: "provider",
              label: "소셜 제공자",
              value: filters.provider,
              options: PROVIDER_OPTIONS,
              onChange: (value) => setFilter("provider", value),
            },
            {
              key: "isActive",
              label: "계정 상태",
              value: filters.isActive,
              options: ACTIVE_OPTIONS,
              onChange: (value) => setFilter("isActive", value),
            },
            {
              key: "role",
              label: "권한",
              value: filters.role,
              options: ROLE_OPTIONS,
              onChange: (value) => setFilter("role", value),
            },
          ]}
        />

        {actionError && (
          <p className={styles.inlineError} role="alert">
            {toAdminErrorMessage(actionError, "변경하지 못했어요.")}
          </p>
        )}

        <DataTable
          columns={columns}
          rows={usersQuery.data?.items ?? []}
          getRowId={(user) => user.id}
          isPending={usersQuery.isPending}
          isError={usersQuery.isError}
          errorMessage="회원 목록을 불러오지 못했어요."
          emptyMessage="조건에 맞는 회원이 없어요."
        />

        <Pagination
          page={usersQuery.data?.page ?? page}
          size={usersQuery.data?.size ?? size}
          totalCount={usersQuery.data?.totalCount ?? 0}
          onChange={setPage}
        />
      </div>

      <ConfirmDialog
        isOpen={dialog !== null}
        title={dialog?.title ?? ""}
        description={dialog?.description ?? ""}
        confirmLabel={dialog?.confirmLabel}
        isDanger={dialog?.isDanger}
        onConfirm={runPendingAction}
        onCancel={() => setPendingAction(null)}
      />
    </>
  );
}
