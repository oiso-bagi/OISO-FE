import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const questionSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
});

export const questionIndex = style({
  color: vars.color.neutral500,
  ...typographyStyles.detail1,
});

export const questionTitle = style({
  color: vars.color.black,
  ...typographyStyles.title1,
});

export const questionHint = style({
  color: vars.color.neutral500,
  ...typographyStyles.detail1,
});
