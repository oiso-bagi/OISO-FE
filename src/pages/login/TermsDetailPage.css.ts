import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import {
  body1,
  body2,
  body6,
  body7,
  body9,
} from "@/shared/styles/typography.css";

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

export const titleRow = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const documentTitle = style([
  body1,
  {
    margin: 0,
    wordBreak: "keep-all",
  },
]);

export const typeBadge = style([
  body7,
  {
    minWidth: "38px",
    flexShrink: 0,
    padding: "2px 4px",
    border: `2px solid ${vars.color.black}`,
    backgroundColor: vars.color.white,
    textAlign: "center",
  },
]);

export const requiredBadge = style({
  backgroundColor: vars.color.neutral100,
});

export const summary = style([
  body6,
  {
    margin: `${vars.space.sm} 0 0`,
    color: vars.color.neutral900,
    wordBreak: "keep-all",
  },
]);

export const version = style([
  body9,
  {
    margin: `${vars.space.sm} 0 0`,
    color: vars.color.neutral500,
  },
]);

export const documentBody = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  border: `2.5px solid ${vars.color.black}`,
  boxShadow: `4px 4px 0 ${vars.color.black}`,
  backgroundColor: vars.color.white,
});

export const section = style({
  paddingBlock: vars.space.md,

  selectors: {
    "&:not(:first-child)": {
      borderTop: `2px solid ${vars.color.neutral100}`,
    },
  },
});

export const sectionTitle = style([
  body2,
  {
    margin: 0,
    color: vars.color.black,
    wordBreak: "keep-all",
  },
]);

export const paragraph = style([
  body6,
  {
    margin: `${vars.space.xs} 0 0`,
    color: vars.color.neutral900,
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
]);

export const list = style([
  body6,
  {
    margin: `${vars.space.xs} 0 0`,
    paddingLeft: "20px",
    color: vars.color.neutral900,
    listStylePosition: "outside",
    listStyleType: "disc",
    wordBreak: "keep-all",
  },
]);

export const listItem = style({
  selectors: {
    "&:not(:first-child)": {
      marginTop: vars.space.xs,
    },
  },
});

export const notice = style([
  body6,
  {
    margin: `${vars.space.sm} 0 ${vars.space.md}`,
    padding: vars.space.sm,
    border: `2px solid ${vars.color.black}`,
    backgroundColor: vars.color.primary100,
    color: vars.color.neutral900,
    wordBreak: "keep-all",
  },
]);

export const attribution = style({
  marginTop: vars.space.lg,
  paddingInline: vars.space.md,
});
