/// <reference types="vite/client" />

/**
 * 프로젝트에서 사용하는 환경변수 선언.
 *
 * vite/client 의 ImportMetaEnv 에 index signature 가 있어 선언되지 않은 키도
 * any 로 통과합니다. 따라서 이 선언만으로 오타가 잡히지는 않습니다.
 * 환경변수는 `@/shared/config/env` 를 거쳐서만 읽어 주세요.
 */
interface ImportMetaEnv {
  /** 카카오 지도 JavaScript 키. 없으면 지도 로딩 시 에러로 처리합니다. */
  readonly VITE_KAKAO_MAP_KEY?: string;

  /** API base URL. 백엔드 `/api/v1` prefix 까지 포함합니다. */
  readonly VITE_API_BASE_URL?: string;

  /** mock 사용 여부. 미설정 시 base URL 유무로 판단합니다. */
  readonly VITE_USE_MOCK?: string;

  /** GA4 측정 ID(`G-` 로 시작). 없으면 수집하지 않습니다. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
