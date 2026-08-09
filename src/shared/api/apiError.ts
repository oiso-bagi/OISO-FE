import axios from "axios";

export interface ApiError {
  /** HTTP status. 네트워크 실패 등 응답 자체가 없으면 undefined 입니다. */
  status?: number;

  /** 사용자에게 그대로 노출할 수 있는 메시지 */
  message: string;
}

const NETWORK_MESSAGE = "네트워크 연결을 확인해 주세요.";
const DEFAULT_MESSAGE =
  "일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.";

const MESSAGE_BY_STATUS: Record<number, string> = {
  400: "요청 내용을 다시 확인해 주세요.",
  401: "로그인이 필요해요.",
  403: "접근 권한이 없어요.",
  404: "요청한 정보를 찾을 수 없어요.",
  409: "이미 처리된 요청이에요.",
  429: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
};

/** 응답이 있으면 HTTP status 를, 없으면 undefined 를 반환합니다. */
export const getErrorStatus = (error: unknown) =>
  axios.isAxiosError(error) ? error.response?.status : undefined;

/**
 * 에러를 화면 노출용으로 변환합니다.
 *
 * 서버 응답 본문의 메시지에는 내부 정보가 섞일 수 있어 사용하지 않고,
 * status 기준으로 미리 정한 문구만 내보냅니다.
 */
export const toApiError = (error: unknown): ApiError => {
  const status = getErrorStatus(error);

  if (status === undefined) {
    const isNetworkError = axios.isAxiosError(error);

    return { message: isNetworkError ? NETWORK_MESSAGE : DEFAULT_MESSAGE };
  }

  return { status, message: MESSAGE_BY_STATUS[status] ?? DEFAULT_MESSAGE };
};

/**
 * 화면에 띄울 문구를 고릅니다.
 *
 * 원인이 특정되는 에러(401·403·404·네트워크 등)는 그 문구가 훨씬 도움이 되고,
 * 원인을 모르거나 서버 오류(5xx)일 때는 "저장하지 못했어요" 처럼 화면 맥락이
 * 담긴 문구가 낫습니다. 그래서 후자는 호출부가 준 fallback 을 씁니다.
 */
export const toErrorMessage = (error: unknown, fallback: string): string => {
  const { message } = toApiError(error);

  return message === DEFAULT_MESSAGE ? fallback : message;
};
