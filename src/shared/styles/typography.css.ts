/**
 * Typography Design System
 *
 * 사용 예시)
 * import * as typo from "@/shared/styles/typography.css.ts";
 *
 * <h1 className={typo.title2R24}>제목</h1>
 * <p className={typo.body6M14}>본문</p>
 * <span className={typo.detail2B12}>상세 텍스트</span>
 *
 * Body 폰트(Pretendard)는 global.css에서 기본 적용됩니다.
 * Heading은 Black Han Sans 스타일을 사용합니다.
 */

import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css.ts";

// =========================
// Title
// =========================

export const largeTitleR32 = style({
  fontFamily: vars.font.heading,
  fontSize: "32px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "134%",
});

export const title1 = style({
  fontFamily: vars.font.heading,
  fontSize: "24px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "134%",
});

export const title2 = style({
  fontFamily: vars.font.heading,
  fontSize: "22px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "28px",
});

// =========================
// Large Body
// =========================

export const largeBody1 = style({
  fontFamily: vars.font.body,
  fontSize: "32px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "134%",
});

export const largeBody2 = style({
  fontFamily: vars.font.body,
  fontSize: "18px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "132%",
});

export const largeBody3 = style({
  fontFamily: vars.font.body,
  fontSize: "16px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "28px",
});

// =========================
// Body
// =========================

export const body1 = style({
  fontFamily: vars.font.body,
  fontSize: "18px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "25.2px",
});

export const body2 = style({
  fontFamily: vars.font.body,
  fontSize: "16px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "134%",
});

export const body3 = style({
  fontFamily: vars.font.body,
  fontSize: "16px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "24px",
});

export const body4 = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "20px",
});

export const body5 = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: vars.fontWeight.semibold,
  lineHeight: "20px",
});

export const body6 = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "136%",
});

export const body7 = style({
  fontFamily: vars.font.body,
  fontSize: "12px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "16px",
});

export const body8 = style({
  fontFamily: vars.font.body,
  fontSize: "12px",
  fontWeight: vars.fontWeight.semibold,
  lineHeight: "20px",
});

export const body9 = style({
  fontFamily: vars.font.body,
  fontSize: "12px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "134%",
});

// =========================
// Detail
// =========================

export const detail1 = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "20px",
});

export const detail2 = style({
  fontFamily: vars.font.body,
  fontSize: "12px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "16px",
});

export const detail3 = style({
  fontFamily: vars.font.body,
  fontSize: "10px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "14px",
});

export const detail4 = style({
  fontFamily: vars.font.body,
  fontSize: "10px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "14px",
});
