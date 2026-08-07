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

/**
 * mock 을 끈 채로 base URL 이 비어 있으면 즉시 실패시킵니다.
 *
 * 이 조합에서는 axios 가 baseURL 없이 `/home` 같은 상대 경로로 요청하게 되어
 * 프론트엔드 origin 으로 요청이 나갑니다. 배포 환경에는 SPA rewrite(vercel.json)
 * 가 걸려 있어 그 경로들이 200 과 함께 index.html 을 돌려주므로, 요청이 실패가
 * 아니라 "성공"으로 처리되고 HTML 이 응답 데이터로 캐시됩니다. 에러 처리에도
 * 걸리지 않아 원인을 찾기 어려우므로, 시작 시점에 끊는 편이 낫습니다.
 */
if (!USE_MOCK && !API_BASE_URL) {
  throw new Error(
    "VITE_USE_MOCK 이 false 인데 VITE_API_BASE_URL 이 비어 있습니다. " +
      ".env 또는 배포 환경변수를 확인해 주세요.",
  );
}
