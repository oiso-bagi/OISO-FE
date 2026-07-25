import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const page = style({
  paddingBottom: "32px",
});

export const content = style({
  paddingTop: "0px",
});

export const summaryCard = style({
  marginTop: "8px",
  padding: "16px",
  backgroundColor: vars.color.primary500,
});

export const summaryLabel = style([typographyStyles.body4]);

export const totalSaving = style([
  typographyStyles.largeBody1,
  {
    display: "block",
    marginTop: "4px",
    fontSize: "42px",
    lineHeight: 1,
  },
]);

export const summaryDescription = style([
  typographyStyles.body7,
  {
    marginTop: "4px",
  },
]);

export const section = style({
  marginTop: "24px",
});

export const sectionTitle = style([typographyStyles.largeBody2]);

export const categoryGrid = style({
  marginTop: "12px",
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "12px",
});

export const categoryCard = style({
  minWidth: 0,
  minHeight: "70px",
  padding: "12px 12px",
  border: `2.5px solid ${vars.color.black}`,
  boxShadow: `4px 4px 0 ${vars.color.black}`,
  backgroundColor: vars.color.white,
});

export const categoryLabel = style([
  typographyStyles.body7,
  {
    color: vars.color.neutral500,
  },
]);

export const categoryAmount = style([
  typographyStyles.largeBody2,
  {
    margin: "4px 0 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
]);

export const contributionCard = style({
  marginTop: "12px",
  padding: "16px",
  backgroundColor: vars.color.primary100,
});

export const contributionTitle = style([typographyStyles.body4]);

export const progressTrack = style({
  width: "100%",
  height: "20px",
  marginTop: "8px",
  overflow: "hidden",
  border: `2.5px solid ${vars.color.black}`,
  backgroundColor: vars.color.white,
});

export const progressValue = style({
  display: "block",
  height: "100%",
  backgroundColor: vars.color.secondary500,
});

export const contributionInfo = style([
  typographyStyles.body9,
  {
    marginTop: "12px",
    color: vars.color.neutral500,
  },
]);

export const contributionRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const contributionPercent = style([
  typographyStyles.body4,
  {
    flexShrink: 0,
    color: vars.color.black,
  },
]);

export const contributionDescription = style({
  marginTop: "4px",
});

export const historyCard = style({
  marginTop: "12px",
  padding: "16px 12px",
});

export const historyItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,

  selectors: {
    "& + &": {
      marginTop: "14px",
    },
  },
});

export const historyTitle = style([typographyStyles.body4]);

export const historyDate = style([
  typographyStyles.body9,
  {
    display: "block",
    color: vars.color.neutral500,
  },
]);

export const historyAmount = style([
  typographyStyles.body4,
  {
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
]);
