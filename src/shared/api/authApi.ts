import type {
  AuthSessionResponseDto,
  AuthTokenResponseDto,
} from "@/shared/api/generated/types";
import { clearAccessToken, setAccessToken } from "@/shared/auth/accessToken";

import { http } from "./http";

let refreshPromise: Promise<AuthTokenResponseDto> | null = null;
let restoreSessionPromise: Promise<boolean> | null = null;

export const getAuthSession = () => {
  return http.get<AuthSessionResponseDto>("/auth/session");
};

export const logout = () => {
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

      await refreshAccessToken();
      return true;
    })
    .finally(() => {
      restoreSessionPromise = null;
    });

  return restoreSessionPromise;
};
