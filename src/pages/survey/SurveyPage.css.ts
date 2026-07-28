import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const page = style({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.color.bg,
});

export const content = style({
  flex: "1 1 auto",
  minHeight: 0,
  padding: vars.space.md,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});
