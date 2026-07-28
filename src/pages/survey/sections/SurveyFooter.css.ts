import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const footer = style({
  padding: vars.space.md,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: vars.space.xs,
  flexShrink: 0,
});
