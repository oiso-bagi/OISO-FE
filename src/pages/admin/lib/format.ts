export const formatNumber = (value: number) => value.toLocaleString("ko-KR");

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * `2026.09.30`
 *
 * `toLocaleDateString("ko-KR")` 은 `2026. 09. 30.` 처럼 공백이 섞여 표 안에서
 * 두 줄로 접힙니다. 자릿수가 고정된 형태가 세로로 훑기에도 낫습니다.
 */
export const formatDate = (iso: string) => {
  const date = new Date(iso);

  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
};

/** `2026.09.30 14:05` */
export const formatDateTime = (iso: string) => {
  const date = new Date(iso);

  return `${formatDate(iso)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/** 남은 시간을 "3분 20초" 형태로. 0 이하이면 null 입니다. */
export const formatRemaining = (untilMs: number, nowMs: number) => {
  const diff = untilMs - nowMs;

  if (diff <= 0) return null;

  const totalSeconds = Math.ceil(diff / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`;
};
