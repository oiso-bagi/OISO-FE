/**
 * 환경변수 단일 진입점.
 *
 * `import.meta.env` 는 이 파일에서만 읽습니다. 다른 파일은 여기서 내보낸 값을
 * 가져다 쓰므로, 키 이름이 흩어지지 않고 타입도 여기서 확정됩니다.
 *
 * Vite 는 `import.meta.env.VITE_X` 를 빌드 시점에 정적 치환하므로
 * 구조 분해나 동적 접근이 아닌 직접 접근으로만 읽어야 합니다.
 */

const normalize = (value: string | undefined) => value?.trim() ?? "";

/** API base URL. 백엔드 `/api/v1` prefix 까지 포함합니다. */
export const API_BASE_URL = normalize(import.meta.env.VITE_API_BASE_URL);

/** 카카오 지도 JavaScript 키 */
export const KAKAO_MAP_KEY = normalize(import.meta.env.VITE_KAKAO_MAP_KEY);

const rawUseMock = normalize(import.meta.env.VITE_USE_MOCK);

/**
 * mock 데이터 사용 여부.
 *
 * `VITE_USE_MOCK` 이 비어 있으면 base URL 유무로 판단합니다. `.env` 를 아직
 * 받지 않은 로컬에서 기존 동작(주소 없음 = mock)이 그대로 유지되도록 하기
 * 위한 fallback 입니다.
 */
export const USE_MOCK =
  rawUseMock === "" ? !API_BASE_URL : rawUseMock === "true";
