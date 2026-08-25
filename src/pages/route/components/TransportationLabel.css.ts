import { style } from "@vanilla-extract/css";

export const list = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",

  minWidth: 0,
});

export const item = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",

  whiteSpace: "nowrap",
});

export const icon = style({
  width: "16px",
  height: "16px",
  flexShrink: 0,
  display: "block",
});

export const separator = style({
  flexShrink: 0,
});
