import { setAccessTokenReader } from "@/shared/api/client";

let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (nextAccessToken: string) => {
  accessToken = nextAccessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};

/**
 * 로그인한 사용자 ID. 서버가 액세스 토큰의 `sub` 에 넣어 줍니다.
 *
 * 서명은 서버가 검증하므로 여기서는 읽기만 합니다. 기기에 남기는 값을
 * 사용자별로 나누는 데만 쓰고, 권한 판단에는 쓰지 않습니다.
 */
export const getAccessTokenUserId = (): string | null => {
  const payload = accessToken?.split(".")[1];
  if (!payload) return null;

  try {
    const { sub } = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as { sub?: unknown };

    return typeof sub === "string" && sub !== "" ? sub : null;
  } catch {
    return null;
  }
};

setAccessTokenReader(getAccessToken);
