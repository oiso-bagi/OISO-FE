import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",

  width: "100%",

  padding: "8px 16px",

  backgroundColor: vars.color.white,

  border: `2px solid ${vars.color.black}`,
  boxShadow: `1.5px 1.5px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",
});

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const metaRow = style({
  display: "flex",
  gap: "20px",

  marginTop: "4px",
});
