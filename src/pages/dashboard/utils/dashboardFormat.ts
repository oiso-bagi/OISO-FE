export const formatWon = (amount: number) =>
  `${amount.toLocaleString("ko-KR")}원`;

export const normalizePercent = (percent: number) => {
  if (!Number.isFinite(percent)) return 0;

  return Math.min(100, Math.max(0, percent));
};

const percentFormatter = new Intl.NumberFormat("ko-KR", {
  maximumFractionDigits: 1,
});

export const formatPercent = (percent: number) =>
  `${percentFormatter.format(normalizePercent(percent))}%`;

export const formatDisplayDate = (isoDate: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(isoDate))
    .replaceAll(". ", ".")
    .replace(/\.$/, "");
