import type { AxiosRequestConfig } from "axios";

import { apiClient } from "./client";

/**
 * apiClient(axios) 얇은 래퍼
 * - AxiosResponse 를 벗겨 응답 본문만 반환합니다.
 */
export const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const { data } = await apiClient.get<T>(url, config);

    return data;
  },

  post: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig) => {
    const { data } = await apiClient.post<T>(url, body, config);

    return data;
  },

  patch: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig) => {
    const { data } = await apiClient.patch<T>(url, body, config);

    return data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const { data } = await apiClient.delete<T>(url, config);

    return data;
  },
};
