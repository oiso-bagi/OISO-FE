/**
 * 저장 날짜 표기. 예: "2026-05-18" → "2026. 5. 18."
 * timezone 영향을 피하려고 Date 파싱 대신 문자열을 직접 나눕니다.
 */
export const formatSavedDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");

  return `${year}. ${Number(month)}. ${Number(day)}.`;
};
