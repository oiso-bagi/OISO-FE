import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const progressSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const progressText = style({
  color: vars.color.neutral500,
  ...typographyStyles.body7,
});

export const progressBars = style({
  display: "grid",
  gridTemplateColumns: "repeat(var(--survey-total-step, 2), minmax(0, 1fr))",
  gap: "0.25rem",
});

const progressBar = style({
  height: "0.625rem",
  border: `0.09375rem solid ${vars.color.black}`,
});

export const activeProgressBar = style([
  progressBar,
  {
    backgroundColor: vars.color.primary500,
  },
]);

export const inactiveProgressBar = style([
  progressBar,
  {
    backgroundColor: vars.color.neutral100,
  },
]);
