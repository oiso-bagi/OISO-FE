import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

import { apiClient } from "@/shared/api/client";
import { refreshAccessToken } from "@/shared/api/authApi";
import { clearAccessToken } from "@/shared/auth/accessToken";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  hasRetriedAfterRefresh?: boolean;
};

const isRefreshRequest = (url: string | undefined) =>
  url?.endsWith("/auth/refresh") ?? false;

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

      if (!originalRequest || isRefreshRequest(originalRequest.url)) {
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
