import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const page = style({
  paddingBottom: vars.space.xl,
});

export const content = style({
  paddingTop: 0,
});

export const statusCard = style([
  typographyStyles.body6,
  {
    marginTop: vars.space.xs,
    padding: vars.space.lg,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: vars.space.sm,
    color: vars.color.neutral500,
    textAlign: "center",
  },
]);

export const retryButton = style([
  typographyStyles.body4,
  {
    padding: `${vars.space.xs} ${vars.space.md}`,
    border: `2px solid ${vars.color.black}`,
    backgroundColor: vars.color.white,
    cursor: "pointer",
  },
]);

export const emptySection = style({
  marginTop: vars.space.sm,
});

export const summaryCard = style({
  marginTop: vars.space.xs,
  padding: vars.space.md,
  backgroundColor: vars.color.primary500,
});

export const summaryLabel = style([typographyStyles.body4]);

export const totalSaving = style([
  typographyStyles.largeBody1,
  {
    display: "block",
    marginTop: vars.space.xxs,
    lineHeight: 1,
  },
]);

export const summaryDescription = style([
  typographyStyles.body7,
  {
    marginTop: vars.space.xxs,
  },
]);

export const section = style({
  marginTop: vars.space.lg,
});

export const sectionTitle = style([typographyStyles.largeBody2]);

export const categoryGrid = style({
  marginTop: vars.space.sm,
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: vars.space.sm,
});

export const categoryCard = style({
  minWidth: 0,
  minHeight: "70px",
  padding: vars.space.sm,
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
    margin: `${vars.space.xxs} 0 0`,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
]);

export const contributionCard = style({
  marginTop: vars.space.sm,
  padding: vars.space.md,
  backgroundColor: vars.color.primary100,
});

export const contributionTitle = style([typographyStyles.body4]);

export const progressTrack = style({
  width: "100%",
  height: "20px",
  marginTop: vars.space.xs,
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
    marginTop: vars.space.sm,
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
  marginTop: vars.space.xxs,
});

export const historyCard = style({
  marginTop: vars.space.sm,
  padding: `${vars.space.md} ${vars.space.sm}`,
});

export const historyItem = style({
  selectors: {
    "& + &": {
      marginTop: vars.space.xs,
    },
  },
});

/**
 * 기록 한 줄 전체를 누르면 그 코스를 지도로 봅니다.
 *
 * 저장을 지운 뒤에도 남는 기록이라 여기가 지난 여행에 닿는 유일한 통로입니다.
 */
export const historyButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,

  width: "100%",
  padding: `${vars.space.xs} ${vars.space.xxs}`,

  background: "none",
  border: 0,

  cursor: "pointer",
  textAlign: "left",

  selectors: {
    "&:active": {
      backgroundColor: vars.color.primary100,
    },
  },
});

export const historyTitle = style([
  typographyStyles.body4,
  {
    display: "block",
  },
]);

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
