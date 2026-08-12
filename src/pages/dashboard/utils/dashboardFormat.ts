export const formatWon = (amount: number) =>
  `${amount.toLocaleString("ko-KR")}원`;

export const formatDisplayDate = (isoDate: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(isoDate))
    .replaceAll(". ", ".")
    .replace(/\.$/, "");
