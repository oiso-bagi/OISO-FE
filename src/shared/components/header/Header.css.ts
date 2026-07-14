import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css.ts";

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%",
  minHeight: "54px",
  padding: "0 16px",
});

export const left = style({
  display: "flex",
  alignItems: "center",
  minWidth: 0,
  gap: "12px",
});

export const backButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  flexShrink: 0,
  width: "24px",
  height: "24px",

  border: 0,
  background: "transparent",
  textDecoration: "none",
  cursor: "pointer",
});

export const backIcon = style({
  display: "block",
  width: "24px",
  height: "24px",
});

export const title = style({
  margin: 0,
  color: vars.color.black,
  whiteSpace: "nowrap",
});

export const right = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flexShrink: 0,
  marginLeft: "16px",
});
