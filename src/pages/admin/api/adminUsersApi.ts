import type {
  AdminToggleUserActiveDto,
  AdminUpdateUserRoleDto,
  AdminUserListItemDto,
  AdminUserPageResponseDto,
} from "@/shared/api/generated/types";
import { http } from "@/shared/api/http";

import type {
  AdminUser,
  AdminUsersQuery,
  AuthProvider,
  PaginatedResponse,
  UserRole,
} from "../types";

const toAuthProvider = (provider: string): AuthProvider => {
  const normalized = provider.toUpperCase();

  if (normalized === "KAKAO") return "KAKAO";
  if (normalized === "GOOGLE") return "GOOGLE";

  return "LOCAL";
};

const toAdminUser = (user: AdminUserListItemDto): AdminUser => ({
  id: user.id,
  email: user.email,
  nickname: user.nickname,
  provider: toAuthProvider(user.provider),
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
});

const toAdminUserPage = (
  response: AdminUserPageResponseDto,
): PaginatedResponse<AdminUser> => ({
  items: response.items.map(toAdminUser),
  page: response.page,
  size: response.size,
  totalCount: response.totalCount,
  totalPages: response.totalPages,
});

export const getAdminUsers = async (
  query: AdminUsersQuery,
): Promise<PaginatedResponse<AdminUser>> => {
  const response = await http.get<AdminUserPageResponseDto>("/admin/users", {
    params: query,
  });

  return toAdminUserPage(response);
};

export const patchAdminUserActive = async (
  userId: string,
  isActive: boolean,
): Promise<AdminUser> => {
  const body: AdminToggleUserActiveDto = { isActive };
  const response = await http.patch<AdminUserListItemDto>(
    `/admin/users/${userId}/active`,
    body,
  );

  return toAdminUser(response);
};

export const patchAdminUserRole = async (
  userId: string,
  role: UserRole,
): Promise<AdminUser> => {
  const body: AdminUpdateUserRoleDto = { role };
  const response = await http.patch<AdminUserListItemDto>(
    `/admin/users/${userId}/role`,
    body,
  );

  return toAdminUser(response);
};
