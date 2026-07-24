/**
 * 카카오맵 SDK 동적 로더.
 * - VITE_KAKAO_MAP_KEY 로 스크립트를 주입하고 kakao 네임스페이스를 반환합니다.
 * - 여러 번 호출해도 스크립트는 한 번만 로드됩니다.
 */
const KAKAO_SDK_URL = "https://dapi.kakao.com/v2/maps/sdk.js";

let loadPromise: Promise<typeof kakao> | null = null;

export function loadKakaoMap(): Promise<typeof kakao> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const appKey = import.meta.env.VITE_KAKAO_MAP_KEY;

    if (!appKey) {
      reject(
        new Error(
          "VITE_KAKAO_MAP_KEY 가 설정되지 않았습니다. .env 를 확인해 주세요.",
        ),
      );
      return;
    }

    if (window.kakao?.maps) {
      resolve(window.kakao);
      return;
    }

    const script = document.createElement("script");
    script.src = `${KAKAO_SDK_URL}?appkey=${appKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      // autoload=false 이므로 maps.load 로 실제 로딩을 기다립니다.
      window.kakao.maps.load(() => resolve(window.kakao));
    };
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("카카오맵 SDK 로드에 실패했습니다."));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}
