import { style } from "@vanilla-extract/css";

import { pageContent } from "@/shared/styles/layout.css";
import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/** 전단지 특유의 겹친 외곽선 글자 */
const outlined = {
  WebkitTextStroke: `2.5px ${vars.color.ink}`,
  paintOrder: "stroke fill",
} as const;

export const container = style({
  display: "flex",
  flexDirection: "column",

  // 상단 띠가 화면 폭을 꽉 채워야 해서 좌우 여백은 안쪽 영역이 가집니다.
  flex: 1,
  backgroundColor: vars.color.bg,
  color: vars.color.ink,

  boxSizing: "border-box",
});

/* ── 상단 띠 ───────────────────────────────────────── */

export const banner = style({
  flexShrink: 0,

  padding: "10px 16px 12px",

  backgroundColor: vars.color.primary500,
  borderBottom: `3px solid ${vars.color.ink}`,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",

  boxSizing: "border-box",
});

export const bannerTitle = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "23px",
  lineHeight: 1.15,

  color: vars.color.cream,
  textShadow: `3px 3px 0 ${vars.color.red500}`,

  ...outlined,
});

export const bannerLogo = style({
  width: "56px",
  height: "56px",
  flexShrink: 0,
  display: "block",
});

export const content = style([
  pageContent,
  {
    flexGrow: 1,

    display: "flex",
    flexDirection: "column",
    gap: "11px",

    // 좌우 여백과 box-sizing 은 pageContent 가 담당합니다.
    paddingTop: "13px",
  },
]);

/* ── 아낀 돈 ───────────────────────────────────────── */

export const savingPanel = style({
  position: "relative",

  padding: "15px 16px 0",

  backgroundColor: vars.color.cream,
  border: `3px solid ${vars.color.ink}`,

  // 안쪽 링 + 오프셋 그림자. 전단지의 이중 테두리를 한 번에 냅니다.
  boxShadow: `inset 0 0 0 3px ${vars.color.yellow500}, 5px 5px 0 0 ${vars.color.ink}`,

  boxSizing: "border-box",
});

export const burst = style({
  position: "absolute",
  top: "-16px",
  right: "-12px",

  width: "84px",
  height: "68px",

  transform: "rotate(12deg)",
});

export const savingTag = style({
  display: "inline-block",
  padding: "3px 8px 4px",

  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "12px",
  letterSpacing: "0.02em",

  color: vars.color.primary500,
  backgroundColor: vars.color.ink,
});

/** CountUpAmount 는 inline-flex 라 그냥 두면 위 태그와 같은 줄로 흐릅니다. */
export const savingAmountRow = style({
  marginTop: "10px",
  display: "block",
});

export const savingAmount = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "44px",

  color: vars.color.red500,
  textShadow: `4px 4px 0 ${vars.color.primary500}`,

  ...outlined,
});

export const savingCaption = style([
  typo.body7,
  {
    margin: "8px 0 0",
  },
]);

export const claimList = style({
  margin: "13px -16px 0",
  padding: "9px 14px",

  backgroundColor: vars.color.yellow500,
  borderTop: `3px solid ${vars.color.ink}`,

  display: "flex",
  flexDirection: "column",
  gap: "3px",

  listStyle: "none",
});

export const claim = style([
  typo.body7,
  {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
]);

export const claimMark = style({
  width: "9px",
  height: "9px",
  flexShrink: 0,
});

/* ── 시작 버튼 ─────────────────────────────────────── */

export const ctaButton = style({
  height: "56px",
  flexShrink: 0,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "9px",

  backgroundColor: vars.color.red500,
  border: `3px solid ${vars.color.ink}`,
  boxShadow: `4px 4px 0 0 ${vars.color.ink}`,

  cursor: "pointer",
  boxSizing: "border-box",

  ":active": {
    transform: "translate(4px, 4px)",
    boxShadow: "none",
  },
});

export const ctaMark = style({
  width: "15px",
  height: "15px",
  flexShrink: 0,
});

export const ctaLabel = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "19px",

  color: vars.color.cream,

  ...outlined,
});

/* ── 저장한 루트 ───────────────────────────────────── */

export const listHeader = style({
  marginTop: "5px",
  padding: "7px 12px",

  backgroundColor: vars.color.ink,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  boxSizing: "border-box",
});

export const listTitle = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "15px",

  color: vars.color.cream,
});

export const listCount = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "13px",

  color: vars.color.primary500,
});

export const list = style({
  backgroundColor: vars.color.cream,
  border: `3px solid ${vars.color.ink}`,
  boxShadow: `4px 4px 0 0 ${vars.color.ink}`,

  display: "flex",
  flexDirection: "column",

  boxSizing: "border-box",
});

export const statusText = style([
  typo.body4,
  {
    padding: "24px 12px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);

export const skeletonRow = style({
  padding: "12px",
});
