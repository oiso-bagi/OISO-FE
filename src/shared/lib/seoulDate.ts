const seoulDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

type DateParts = {
  year: string;
  /** 두 자리. 예: "05" */
  month: string;
  /** 두 자리. 예: "08" */
  day: string;
};

/**
 * ISO 날짜를 한국 날짜 기준 연·월·일로 나눕니다.
 *
 * 서버는 저장 시각을 UTC("2026-08-01T20:00:00.000Z")로 줍니다. 문자열을 `T`
 * 에서 잘라 쓰면 한국 시간 00~09시에 저장한 코스가 전날 날짜로 보여, 한국
 * 시간대로 바꾼 뒤 나눕니다. 시각이 없는 날짜("2026-08-01")는 그대로 씁니다.
 */
export const toSeoulDateParts = (isoDate: string): DateParts | null => {
  if (!isoDate.includes("T")) {
    const [year, month, day] = isoDate.split("-");

    return year && month && day ? { year, month, day } : null;
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) return null;

  const parts = seoulDateFormatter.formatToParts(date);
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return { year: pick("year"), month: pick("month"), day: pick("day") };
};
