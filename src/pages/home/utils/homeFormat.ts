/**
 * 저장 날짜 표기. 예: "2026-05-18" → "2026. 5. 18."
 * timezone 영향을 피하려고 Date 파싱 대신 문자열을 직접 나눕니다.
 */
export const formatSavedDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("T")[0].split("-");

  if (!year || !month || !day) return "-";

  return `${year}. ${Number(month)}. ${Number(day)}.`;
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
