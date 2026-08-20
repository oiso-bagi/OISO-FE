import { useCurrentUser } from "@/pages/dashboard/hooks/useCurrentUser";
import type { CurrentUserResponseDto } from "@/shared/api/generated/types";
import { useAuthStatus } from "@/shared/auth/authContext";
import { USE_MOCK } from "@/shared/config/env";

export type AdminAccess =
  /** 세션 확인 또는 사용자 조회 중 */
  | "checking"
  /** 로그인하지 않음 → 로그인 화면으로 안내 */
  | "unauthenticated"
  /** 로그인했지만 관리자가 아님 → 권한 없음 화면 */
  | "forbidden"
  /** 관리자 */
  | "allowed"
  /** 세션 또는 사용자 정보를 가져오지 못함 */
  | "error";

const hasAdminRole = (user: CurrentUserResponseDto | undefined) =>
  user?.role === "ADMIN";

/**
 * 관리자 페이지 접근 가능 여부.
 *
 * 프론트 가드는 화면 흐름을 위한 것이고 실제 방어는 서버 인가입니다.
 * 관리자 API 는 서버에서 반드시 권한을 검사해야 합니다.
 *
 * 목 모드에서는 인증 서버 없이 화면을 개발할 수 있도록 통과시킵니다.
 * 실 서버 모드에서는 `role` 을 확인할 수 없으면 접근을 막습니다.
 */
export const useAdminAccess = (): AdminAccess => {
  const authStatus = useAuthStatus();
  const {
    data: user,
    isPending,
    isError,
  } = useCurrentUser(!USE_MOCK && authStatus === "authenticated");

  if (USE_MOCK) return "allowed";

  if (authStatus === "checking") return "checking";
  if (authStatus === "unauthenticated") return "unauthenticated";
  if (authStatus === "error") return "error";

  if (isPending) return "checking";
  if (isError) return "error";

  return hasAdminRole(user) ? "allowed" : "forbidden";
};
