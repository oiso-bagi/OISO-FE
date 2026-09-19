import { toSeoulDateParts } from "@/shared/lib/seoulDate";

/**
 * 저장 날짜 표기. 예: "2026-05-18T03:00:00.000Z" → "2026. 5. 18."
 * 서버 시각은 UTC 라 한국 날짜로 바꿔 표기합니다.
 */
export const formatSavedDate = (isoDate: string): string => {
  const parts = toSeoulDateParts(isoDate);

  if (!parts) return "-";

  return `${parts.year}. ${Number(parts.month)}. ${Number(parts.day)}.`;
};

/**
 * 전단지 표기용 금액. `formatPrice` 의 "42,000원" 대신 "₩42,000" 으로 씁니다.
 *
 * 서버는 절약 금액을 양수로 주지만 `toSavingAmount` 가 화면 표기 규칙에 맞춰
 * 부호를 뒤집어 둡니다. 가격표에는 "₩-25,000" 이 아니라 값만 필요하므로
 * 절댓값을 씁니다.
 */
export const formatWonSign = (value: number | null): string => {
  if (value === null) return "-";

  return `₩${Math.abs(value).toLocaleString("ko-KR")}`;
};
