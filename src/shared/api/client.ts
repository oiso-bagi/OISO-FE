import axios from "axios";

import { API_BASE_URL } from "@/shared/config/env";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/**
 * access token 을 읽어오는 함수.
 *
 * 토큰 저장소는 인증 모듈에 있으므로 client 가 해당 모듈을 직접 의존하지 않고
 * 함수를 주입받습니다. 등록 전에는 토큰 없이 요청합니다.
 *
 * 401 응답 처리(토큰 재발급 후 재시도)는 인증 모듈의 응답 인터셉터가
 * 담당합니다.
 */
let readAccessToken: () => string | null = () => null;

export const setAccessTokenReader = (reader: () => string | null) => {
  readAccessToken = reader;
};

apiClient.interceptors.request.use((config) => {
  const accessToken = readAccessToken();

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});
