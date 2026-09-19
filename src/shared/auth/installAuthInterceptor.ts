import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

import { apiClient } from "@/shared/api/client";
import { refreshAccessToken } from "@/shared/api/authApi";
import { clearAccessToken } from "@/shared/auth/accessToken";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  hasRetriedAfterRefresh?: boolean;
};

/**
 * 401 을 받아도 토큰 재발급을 시도하지 않는 요청.
 *
 * 로그인 요청의 401 은 아이디·비밀번호가 틀렸다는 뜻이라 재발급해도 소용없고,
 * 재발급 실패로 로그인 화면에 튕겨 나가면 오류 문구를 보여줄 수 없습니다.
 */
const isAuthRequest = (url: string | undefined) =>
  (url?.endsWith("/auth/refresh") || url?.endsWith("/auth/login")) ?? false;

const redirectToLogin = () => {
  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};

export const installAuthInterceptor = () => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (!axios.isAxiosError(error) || error.response?.status !== 401) {
        throw error;
      }

      const originalRequest = error.config as
        RetryableRequestConfig | undefined;

      if (!originalRequest || isAuthRequest(originalRequest.url)) {
        throw error;
      }

      if (originalRequest.hasRetriedAfterRefresh) {
        clearAccessToken();
        redirectToLogin();
        throw error;
      }

      originalRequest.hasRetriedAfterRefresh = true;

      try {
        await refreshAccessToken();

        return apiClient(originalRequest);
      } catch (refreshError: unknown) {
        clearAccessToken();
        redirectToLogin();
        throw refreshError;
      }
    },
  );
};
