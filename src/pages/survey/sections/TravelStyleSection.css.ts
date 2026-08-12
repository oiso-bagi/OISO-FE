import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const optionGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: vars.space.sm,
});

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
});

export const optionCard = style({
  height: "5.875rem",
  padding: "0.625rem",
  border: `0.15625rem solid ${vars.color.black}`,
  backgroundColor: vars.color.white,
  boxShadow: `0.25rem 0.25rem 0 ${vars.color.black}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xxs,
  color: vars.color.black,
  cursor: "pointer",

  selectors: {
    '&[aria-pressed="true"]': {
      backgroundColor: vars.color.primary500,
    },
    "&:active": {
      transform: "translate(0.125rem, 0.125rem)",
      boxShadow: `0.125rem 0.125rem 0 ${vars.color.black}`,
    },
  },
});

export const optionIcon = style({
  width: "1.5rem",
  height: "1.5rem",
  objectFit: "contain",
});

export const optionLabel = style({
  color: vars.color.black,
  textAlign: "center",
  wordBreak: "keep-all",
  ...typographyStyles.body4,
});

export const selectionNotice = style({
  minHeight: "2.75rem",
  padding: "0.625rem",
  border: `0.15625rem solid ${vars.color.black}`,
  backgroundColor: vars.color.primary400,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xxs,
  color: vars.color.black,
  ...typographyStyles.body3,
});

export const selectionCount = style({
  minWidth: "2.5rem",
  padding: `0.125rem ${vars.space.xxs}`,
  border: `0.15625rem solid ${vars.color.black}`,
  backgroundColor: vars.color.secondary500,
  color: vars.color.white,
  textAlign: "center",
  ...typographyStyles.body2,
});
