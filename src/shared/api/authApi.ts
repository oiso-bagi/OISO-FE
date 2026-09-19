import type {
  AuthSessionResponseDto,
  AuthTokenResponseDto,
} from "@/shared/api/generated/types";
import { clearAccessToken, setAccessToken } from "@/shared/auth/accessToken";

import { getErrorStatus } from "./apiError";
import { http } from "./http";

let refreshPromise: Promise<AuthTokenResponseDto> | null = null;
let restoreSessionPromise: Promise<boolean> | null = null;

export const getAuthSession = () => {
  return http.get<AuthSessionResponseDto>("/auth/session");
};

export const postLogout = () => {
  return http.post<void>("/auth/logout");
};

export const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = http
    .post<AuthTokenResponseDto>("/auth/refresh")
    .then((tokenResponse) => {
      setAccessToken(tokenResponse.accessToken);

      return tokenResponse;
    })
    .catch((error: unknown) => {
      clearAccessToken();
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

export const restoreAuthSession = () => {
  if (restoreSessionPromise) return restoreSessionPromise;

  restoreSessionPromise = getAuthSession()
    .then(async ({ authenticated }) => {
      if (!authenticated) {
        clearAccessToken();
        return false;
      }

      try {
        await refreshAccessToken();
      } catch (error: unknown) {
        /**
         * 세션은 있다는데 재발급이 거절되면(토큰 폐기·만료, 계정 정지 등)
         * 새로고침해도 결과가 같습니다. 오류로 두면 "다시 시도" 화면에 갇히므로
         * 로그아웃 상태로 보고 로그인 화면으로 보냅니다.
         *
         * 서버는 이런 경우를 모두 401 로 돌려줍니다. 408·429 같은 일시적인
         * 거절과 네트워크 오류·5xx 는 다시 시도하면 풀릴 수 있어 오류로 둡니다.
         */
        if (getErrorStatus(error) === 401) {
          return false;
        }

        throw error;
      }

      return true;
    })
    .finally(() => {
      restoreSessionPromise = null;
    });

  return restoreSessionPromise;
};
