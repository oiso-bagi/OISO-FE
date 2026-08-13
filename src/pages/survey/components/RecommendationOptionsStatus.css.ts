import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const statusBox = style({
  minHeight: "4rem",
  padding: vars.space.sm,
  border: `0.15625rem solid ${vars.color.black}`,
  backgroundColor: vars.color.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  color: vars.color.neutral500,
  textAlign: "center",
  ...typographyStyles.body4,
});

export const retryButton = style({
  minHeight: "2rem",
  padding: `0.375rem ${vars.space.sm}`,
  border: `0.125rem solid ${vars.color.black}`,
  backgroundColor: vars.color.primary500,
  color: vars.color.black,
  cursor: "pointer",
  whiteSpace: "nowrap",
  ...typographyStyles.body7,

  ":focus-visible": {
    outline: `0.125rem solid ${vars.color.black}`,
    outlineOffset: vars.space.xxs,
  },
});
