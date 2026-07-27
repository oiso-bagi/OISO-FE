import { style } from "@vanilla-extract/css";

export const footer = style({
  padding: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0.5rem",
  flexShrink: 0,
});
