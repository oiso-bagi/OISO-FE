import type {
  AuthSessionResponseDto,
  AuthTokenResponseDto,
  LocalLoginRequestDto,
} from "@/shared/api/generated/types";
import { clearAccessToken, setAccessToken } from "@/shared/auth/accessToken";

import { getErrorStatus } from "./apiError";
import { apiClient } from "./client";
import { http } from "./http";

let refreshPromise: Promise<AuthTokenResponseDto> | null = null;
let restoreSessionPromise: Promise<boolean> | null = null;

const LOCAL_LOGIN_PATH = "/auth/login";

/** 내 컴퓨터 안에서만 오가는 주소. 개발 서버처럼 평문이어도 밖으로 나가지 않습니다. */
const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * 비밀번호를 보내기 전에 요청이 암호화된 연결로만 나가는지 확인합니다.
 *
 * - 요청 주소: `API_BASE_URL` 은 절대 주소일 수도, 배포처럼 `/api/v1` 같은
 *   상대 주소일 수도 있어 페이지 주소를 기준으로 풀어서 봅니다.
 * - 리디렉션: 브라우저 XHR 은 리디렉션을 따라가는 걸 막을 수 없습니다. 대신
 *   페이지가 안전한 컨텍스트(HTTPS)면 브라우저가 HTTP 로 내려가는 리디렉션을
 *   혼합 콘텐츠로 막으므로, 페이지도 함께 확인합니다.
 */
const assertSecureLocalLogin = () => {
  const url = new URL(
    apiClient.getUri({ url: LOCAL_LOGIN_PATH }),
    window.location.href,
  );
  const isSecureUrl =
    url.protocol === "https:" || LOOPBACK_HOSTNAMES.has(url.hostname);

  if (!window.isSecureContext || !isSecureUrl) {
    throw new Error("비밀번호는 HTTPS 연결로만 보낼 수 있습니다.");
  }
};

export const getAuthSession = () => {
  return http.get<AuthSessionResponseDto>("/auth/session");
};

export const postLogout = () => {
  return http.post<void>("/auth/logout");
};

/**
 * 아이디·비밀번호 로그인. 심사위원 전용 계정에만 씁니다(회원가입 없음).
 *
 * 요청 필드 이름은 `email` 이지만, 백엔드는 이메일이 아닌 로그인 아이디도
 * 받습니다(Swagger 설명: "로컬 계정 로그인 아이디").
 *
 * 성공하면 서버가 refresh token 쿠키도 함께 심어 줍니다.
 */
export const postLocalLogin = async (loginRequest: LocalLoginRequestDto) => {
  assertSecureLocalLogin();

  const tokenResponse = await http.post<AuthTokenResponseDto>(
    LOCAL_LOGIN_PATH,
    loginRequest,
  );

  setAccessToken(tokenResponse.accessToken);

  return tokenResponse;
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
