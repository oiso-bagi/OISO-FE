import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";

import {
  getAdminUsers,
  patchAdminUserActive,
  patchAdminUserRole,
} from "../api/adminUsersApi";
import { replaceItemInLists } from "../lib/adminCache";
import type { AdminUser, AdminUsersQuery, UserRole } from "../types";

/**
 * 회원 목록.
 *
 * `keepPreviousData` 로 페이지를 넘길 때 표가 비었다 다시 그려지지 않게 합니다.
 * 행 높이가 출렁이면 연속으로 페이지를 넘기기 어렵습니다.
 */
export const useAdminUsers = (query: AdminUsersQuery) =>
  useQuery({
    queryKey: queryKeys.admin.users.list(query),
    queryFn: () => getAdminUsers(query),
    placeholderData: keepPreviousData,
  });

interface ToggleActiveVariables {
  userId: string;
  isActive: boolean;
}

/** 계정 정지 / 복구 */
export const useToggleUserActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, isActive }: ToggleActiveVariables) =>
      patchAdminUserActive(userId, isActive),
    onSuccess: (updated: AdminUser) =>
      replaceItemInLists(queryClient, queryKeys.admin.users.all, updated),
  });
};

interface ChangeRoleVariables {
  userId: string;
  role: UserRole;
}

/** 관리자 권한 부여 / 해제 */
export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: ChangeRoleVariables) =>
      patchAdminUserRole(userId, role),
    onSuccess: (updated: AdminUser) =>
      replaceItemInLists(queryClient, queryKeys.admin.users.all, updated),
  });
};
