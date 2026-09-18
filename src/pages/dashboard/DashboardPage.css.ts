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

export const historyStatusCard = style([
  statusCard,
  { marginTop: vars.space.sm },
]);

export const historyItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,

  selectors: {
    "& + &": {
      marginTop: vars.space.xs,
    },
  },
});

/** 금액과 그 아래 상세 보기 링크. 오른쪽 끝에 맞춥니다. */
export const historyAmountColumn = style({
  display: "flex",
  flexShrink: 0,
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "2px",
});

/**
 * 지난 여행을 지도로 여는 링크.
 *
 * 기록은 저장을 지운 뒤에도 남아, 여기가 그 코스에 닿는 유일한 통로입니다.
 */
export const historyDetailLink = style([
  typographyStyles.body9,
  {
    padding: 0,

    color: vars.color.neutral500,
    background: "none",
    border: 0,

    textDecoration: "underline",
    textUnderlineOffset: "2px",
    whiteSpace: "nowrap",

    cursor: "pointer",
  },
]);

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

export const historyLoadMore = style([
  typographyStyles.body9,
  {
    minHeight: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: vars.color.neutral500,
    textAlign: "center",
  },
]);

export const historyLoadMoreError = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const historyLoadMoreRetryButton = style([
  typographyStyles.body8,
  {
    padding: `${vars.space.xxs} ${vars.space.xs}`,
    border: `2px solid ${vars.color.black}`,
    backgroundColor: vars.color.white,
    color: vars.color.black,
    cursor: "pointer",
  },
]);

export const scrollToTopButton = style({
  position: "fixed",
  right: "max(16px, calc((100vw - 430px) / 2 + 16px))",
  bottom: "calc(88px + env(safe-area-inset-bottom, 0px))",
  zIndex: 90,

  width: "48px",
  height: "48px",
  padding: 0,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  border: `2.5px solid ${vars.color.black}`,
  borderRadius: vars.radius.full,
  boxShadow: `3px 3px 0 ${vars.color.black}`,
  backgroundColor: vars.color.primary500,
  color: vars.color.black,
  cursor: "pointer",

  selectors: {
    "&:hover": {
      backgroundColor: vars.color.primary400,
    },
    "&:focus-visible": {
      outline: `3px solid ${vars.color.secondary500}`,
      outlineOffset: "3px",
    },
    "&:active": {
      transform: "translate(2px, 2px)",
      boxShadow: `1px 1px 0 ${vars.color.black}`,
    },
  },
});

export const scrollToTopIcon = style({
  width: "24px",
  height: "24px",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});
