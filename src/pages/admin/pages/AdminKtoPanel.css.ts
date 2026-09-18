import { style } from "@vanilla-extract/css";

import { NARROW } from "../components/ui.css";
import { admin } from "../styles/adminTheme.css";

/* KTO 공공데이터 적재 현황 카드. `AdminKtoPanel` 에서만 씁니다. */

/** API 카드(국문 관광정보·관광지 집중률)를 나란히 둡니다. */
export const ktoCards = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: admin.space.md,

  "@media": {
    // 버튼과 제목이 한 줄에 들어가지 않는 폭부터 위아래로 쌓습니다.
    [NARROW]: {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const ktoCard = style({
  display: "flex",
  flexDirection: "column",

  border: admin.border.thin,
  backgroundColor: admin.color.surface,
});

export const ktoCardHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: admin.space.sm,

  padding: admin.space.md,
  borderBottom: admin.border.thin,
});

export const ktoCardTitle = style({
  margin: 0,

  fontSize: admin.fontSize.md,
  fontWeight: admin.fontWeight.semibold,
});

export const ktoCardApi = style({
  color: admin.color.textMuted,
  fontFamily: admin.font.mono,
  fontSize: admin.fontSize.xs,
});

export const ktoCardBody = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: admin.space.md,

  padding: admin.space.md,
});

export const ktoCount = style({
  display: "flex",
  alignItems: "baseline",
  gap: admin.space.xs,

  margin: `${admin.space.xs} 0 0`,

  fontFamily: admin.font.mono,
  fontSize: admin.fontSize.xxl,
  fontWeight: admin.fontWeight.semibold,
  fontVariantNumeric: "tabular-nums",
});

export const ktoRows = style({
  display: "flex",
  flexDirection: "column",
  gap: admin.space.sm,

  margin: 0,
});

export const ktoRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: admin.space.sm,
});

export const ktoRowValue = style({
  margin: 0,

  fontFamily: admin.font.mono,
  fontSize: admin.fontSize.sm,
  fontVariantNumeric: "tabular-nums",
});

export const ktoFieldLabel = style({
  color: admin.color.textMuted,
  fontSize: admin.fontSize.sm,
});

export const ktoCardFooter = style({
  display: "flex",
  flexDirection: "column",
  gap: admin.space.xs,

  padding: `${admin.space.sm} ${admin.space.md}`,
  borderTop: admin.border.thin,
  backgroundColor: admin.color.canvas,
});

export const ktoNote = style({
  margin: 0,

  color: admin.color.textMuted,
  fontSize: admin.fontSize.sm,
});

/** 즉시 동기화 성공 안내 */
export const ktoDone = style({
  margin: 0,

  color: admin.color.success,
  fontSize: admin.fontSize.sm,
});
