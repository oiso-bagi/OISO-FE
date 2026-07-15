import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const card = style({
  width: "100%",
  padding: "18px 16px 12px",

  backgroundColor: vars.color.white,
  border: `3px solid ${vars.color.black}`,
  boxShadow: `6px 6px 0 ${vars.color.black}`,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: vars.space.sm,
});

export const title = style({
  margin: 0,
  fontFamily: vars.font.heading,
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.regular,
  lineHeight: "28px",
});

export const deleteButton = style({
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  fontSize: vars.fontSize.xl,
  lineHeight: 1,
});

export const meta = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,

  marginTop: vars.space.sm,

  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
});

export const infoList = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: vars.space.xs,

  marginTop: vars.space.md,
});

export const infoBox = style({
  border: `2px solid ${vars.color.black}`,
  backgroundColor: vars.color.white,

  padding: "6px 4px",
  textAlign: "center",
});

export const savingBox = style([
  infoBox,
  {
    backgroundColor: vars.color.secondary500, // 임시 수정
  },
]);

export const infoLabel = style({
  display: "block",

  fontFamily: vars.font.body,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
});

export const infoValue = style({
  display: "block",
  marginTop: "4px",

  fontFamily: vars.font.body,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",

  marginTop: vars.space.sm,
});

export const detailLink = style({
  color: vars.color.black,

  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,

  textDecoration: "none",
});

export const detailButton = style({
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",

  color: vars.color.black,

  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
});
