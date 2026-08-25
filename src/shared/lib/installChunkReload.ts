/**
 * 배포 직후 열려 있던 탭에서 화면 이동이 실패하는 문제를 복구합니다.
 *
 * 화면은 `lazy` 로 나눠 받는데, 새로 배포하면 청크 파일 이름의 해시가 바뀌어
 * 이전 파일이 사라집니다. 그 사이 열려 있던 탭은 옛 이름을 요청하다 실패하고,
 * 라우터 에러 화면이 뜹니다.
 *
 * Vite 는 이때 `vite:preloadError` 를 던지므로, 받아서 한 번만 새로고침합니다.
 * 새로고침하면 최신 `index.html` 을 받아 정상 동작합니다.
 */

const RELOAD_AT_KEY = "oiso:chunk-reload-at";

/** 이 시간 안에 또 실패하면 새로고침 대신 에러 화면을 보여 줍니다. */
const RELOAD_COOLDOWN_MS = 10_000;

const readLastReloadAt = () => {
  try {
    return Number(window.sessionStorage.getItem(RELOAD_AT_KEY)) || 0;
  } catch {
    // 시크릿 모드 등에서 접근이 막히면 새로고침 자체를 포기합니다.
    return Number.NaN;
  }
};

export const installChunkReload = () => {
  window.addEventListener("vite:preloadError", (event) => {
    const lastReloadAt = readLastReloadAt();

    // 배포가 깨졌거나 네트워크가 계속 실패하면 새로고침이 무한 반복됩니다.
    if (Number.isNaN(lastReloadAt)) return;
    if (Date.now() - lastReloadAt < RELOAD_COOLDOWN_MS) return;

    try {
      window.sessionStorage.setItem(RELOAD_AT_KEY, String(Date.now()));
    } catch {
      return;
    }

    // 기본 동작(에러 전파)을 막고 최신 번들로 다시 받습니다.
    event.preventDefault();
    window.location.reload();
  });
};
