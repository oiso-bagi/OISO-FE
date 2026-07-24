import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",

  paddingBlock: "10px",
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",

  width: "100%",
  minHeight: "132px",

  padding: "12px",

  backgroundColor: vars.color.white,

  border: `2px solid ${vars.color.black}`,
  boxShadow: `2px 2px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",
});

export const summaryRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "4px",

  marginTop: "6px",
});
