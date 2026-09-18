import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const page = style({
  width: "100%",
  minHeight: "100vh",
  paddingBottom: vars.space.xl,
  backgroundColor: vars.color.bg,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const introduction = style({
  padding: vars.space.md,
  border: `2.5px solid ${vars.color.black}`,
  boxShadow: `4px 4px 0 ${vars.color.black}`,
  backgroundColor: vars.color.primary300,
});

export const introductionTitle = style([
  typographyStyles.body1,
  {
    margin: 0,
    wordBreak: "keep-all",
  },
]);

export const summary = style([
  typographyStyles.body6,
  {
    margin: `${vars.space.sm} 0 0`,
    color: vars.color.neutral900,
    wordBreak: "keep-all",
  },
]);

export const sourceList = style({
  margin: 0,
  padding: 0,
  listStyle: "none",

  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const sourceCard = style({
  padding: vars.space.md,
  border: `2.5px solid ${vars.color.black}`,
  backgroundColor: vars.color.white,
});

export const providerBadge = style([
  typographyStyles.body7,
  {
    display: "inline-block",
    padding: "2px 6px",
    border: `2px solid ${vars.color.black}`,
    backgroundColor: vars.color.primary100,
  },
]);

export const sourceName = style([
  typographyStyles.body2,
  {
    margin: `${vars.space.xs} 0 0`,
    wordBreak: "keep-all",
  },
]);

export const description = style([
  typographyStyles.body6,
  {
    margin: `${vars.space.xxs} 0 0`,
    color: vars.color.neutral900,
    wordBreak: "keep-all",
  },
]);

export const usageLabel = style([
  typographyStyles.body8,
  {
    margin: `${vars.space.sm} 0 0`,
    color: vars.color.neutral500,
  },
]);

export const usageList = style([
  typographyStyles.body6,
  {
    margin: `${vars.space.xxs} 0 0`,
    paddingLeft: "20px",
    color: vars.color.neutral900,
    listStyleType: "disc",
    wordBreak: "keep-all",
  },
]);

/** 출처 표기·이용 조건. 인용문의 긴 URL 이 카드를 넘지 않게 끊습니다. */
export const license = style([
  typographyStyles.body9,
  {
    margin: `${vars.space.sm} 0 0`,
    paddingTop: vars.space.xs,
    borderTop: `1px solid ${vars.color.neutral100}`,

    color: vars.color.neutral500,
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
]);

export const otherServices = style({
  padding: vars.space.md,
  border: `2px solid ${vars.color.neutral100}`,
  backgroundColor: vars.color.white,
});

export const otherServicesTitle = style([
  typographyStyles.body4,
  {
    margin: 0,
  },
]);

export const notice = style([
  typographyStyles.body9,
  {
    margin: 0,
    color: vars.color.neutral500,
    wordBreak: "keep-all",
  },
]);
