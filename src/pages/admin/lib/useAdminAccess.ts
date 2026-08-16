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

export type UserRole = "USER" | "ADMIN";

/**
 * 서버가 아직 `GET /me` 응답에 `role` 을 내려주지 않습니다.
 *
 * `generated/types.ts` 는 Swagger 에서 자동 생성되므로 직접 고치지 않고,
 * 추가 예정 필드를 여기서 선택적으로 얹어 둡니다. 서버에 `role` 이 반영되면
 * 이 타입과 아래 목 모드 폴백을 함께 지우고 생성 타입을 그대로 쓰면 됩니다.
 */
type CurrentUserWithRole = CurrentUserResponseDto & { role?: UserRole };

const hasAdminRole = (user: CurrentUserWithRole | undefined) =>
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
  const { data: user, isPending, isError } = useCurrentUser();

  if (USE_MOCK) return "allowed";

  if (authStatus === "checking") return "checking";
  if (authStatus === "unauthenticated") return "unauthenticated";
  if (authStatus === "error") return "error";

  if (isPending) return "checking";
  if (isError) return "error";

  return hasAdminRole(user) ? "allowed" : "forbidden";
};
