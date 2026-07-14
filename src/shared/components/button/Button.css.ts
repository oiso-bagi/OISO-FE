import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const button = style({
  width: "100%",
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.primary500,
  color: vars.color.white,
  fontSize: "16px",
  fontWeight: 600,
});
