import { globalStyle, keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideUp = keyframes({
  from: { transform: "translateY(24px)" },
  to: { transform: "translateY(0)" },
});

/** 하단 네비(z-index 100) 위로 올라와야 합니다. */
export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 150,

  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",

  backgroundColor: "rgba(0, 0, 0, 0.45)",

  animation: `${fadeIn} 120ms ease`,
});

export const sheet = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,

  width: "100%",
  maxWidth: "430px",
  maxHeight: "85dvh",
  overflowY: "auto",
  // 시트 끝까지 스크롤해도 뒤 페이지가 따라 스크롤되지 않게 합니다.
  overscrollBehavior: "contain",

  padding: `${vars.space.xs} ${vars.space.md} calc(${vars.space.lg} + env(safe-area-inset-bottom, 0px))`,

  backgroundColor: vars.color.bg,
  borderTop: `3px solid ${vars.color.black}`,

  boxSizing: "border-box",

  animation: `${slideUp} 160ms ease`,
});

export const handle = style({
  flexShrink: 0,
  alignSelf: "center",

  width: "40px",
  height: "4px",
  marginBottom: vars.space.xxs,

  backgroundColor: vars.color.neutral100,
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.xs,
});

/** 목록의 순서 배지와 같은 모양입니다. */
export const order = style([
  typo.body7,
  {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",

    width: "24px",
    height: "24px",
    marginTop: "1px",

    color: vars.color.black,
    backgroundColor: vars.color.primary500,
    border: `1.5px solid ${vars.color.black}`,

    boxSizing: "border-box",
  },
]);

export const titleArea = style({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  gap: vars.space.xxs,

  minWidth: 0,
});

export const title = style([
  typo.body1,
  {
    margin: 0,

    color: vars.color.black,
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
]);

export const tagList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xxs,
});

export const tag = style([
  typo.detail3,
  {
    padding: "2px 6px",

    color: vars.color.black,
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.black}`,
  },
]);

export const closeButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",

  width: "32px",
  height: "32px",

  color: vars.color.black,

  selectors: {
    "&:focus-visible": {
      outline: `3px solid ${vars.color.secondary500}`,
      outlineOffset: "1px",
    },
  },
});

export const closeIcon = style({
  display: "block",
  width: "20px",
  height: "20px",
});

globalStyle(`${closeIcon} path`, {
  stroke: "currentColor",
});

export const infoList = style({
  display: "flex",
  flexDirection: "column",

  margin: 0,
  padding: `${vars.space.xxs} ${vars.space.sm}`,

  backgroundColor: vars.color.white,
  border: `2px solid ${vars.color.black}`,
  boxShadow: `2px 2px 0 0 ${vars.color.black}`,
});

export const infoRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.sm,

  paddingBlock: vars.space.xs,

  selectors: {
    "&:not(:first-child)": {
      borderTop: `1px solid ${vars.color.neutral100}`,
    },
  },
});

export const infoLabel = style([
  typo.body8,
  {
    flexShrink: 0,

    color: vars.color.neutral500,
  },
]);

export const infoValue = style([
  typo.body5,
  {
    margin: 0,

    color: vars.color.black,
    textAlign: "right",
    wordBreak: "keep-all",
  },
]);

/** 루트 카드의 "절약" 칸과 같은 분홍으로 맞춥니다. */
export const savingBox = style({
  padding: `${vars.space.xs} ${vars.space.sm}`,

  backgroundColor: vars.color.secondary100,
  border: `2px solid ${vars.color.black}`,
});

export const savingTitle = style([
  typo.body4,
  {
    margin: 0,

    color: vars.color.black,
  },
]);

export const savingDescription = style([
  typo.body9,
  {
    margin: 0,

    color: vars.color.neutral900,
  },
]);

export const actions = style({
  display: "flex",
  gap: vars.space.xs,

  marginTop: vars.space.xxs,
});

export const actionLink = style([
  typo.body4,
  {
    display: "flex",
    flex: "1 1 0",
    alignItems: "center",
    justifyContent: "center",

    minHeight: "44px",
    padding: `0 ${vars.space.sm}`,

    color: vars.color.black,
    backgroundColor: vars.color.white,
    border: `2px solid ${vars.color.black}`,
    boxShadow: `2px 2px 0 0 ${vars.color.black}`,

    textAlign: "center",
    textDecoration: "none",
    wordBreak: "keep-all",

    boxSizing: "border-box",

    selectors: {
      "&:active": {
        transform: "translate(2px, 2px)",
        boxShadow: "none",
      },
      "&:focus-visible": {
        outline: `3px solid ${vars.color.secondary500}`,
        outlineOffset: "2px",
      },
    },
  },
]);

export const primaryActionLink = style({
  backgroundColor: vars.color.primary500,
});

export const notice = style([
  typo.detail4,
  {
    margin: 0,

    color: vars.color.neutral500,
    wordBreak: "keep-all",
  },
]);
