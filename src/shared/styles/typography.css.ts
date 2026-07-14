/**
 * Typography Design System
 *
 * 사용 예시)
 * import * as typo from "@/shared/styles/typography.css";
 *
 * <h1 className={typo.title2R24}>제목</h1>
 * <p className={typo.body6M14}>본문</p>
 * <span className={typo.detail2B12}>상세 텍스트</span>
 *
 * Body 폰트(Pretendard)는 global.css에서 기본 적용됩니다.
 * Heading은 Black Han Sans 스타일을 사용합니다.
 */

import { style } from "@vanilla-extract/css";

import { vars } from "./theme.css";

// =========================
// Title
// =========================

export const largeTitleR32 = style({
  fontFamily: vars.font.heading,
  fontSize: "32px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "134%",
});

export const title2R24 = style({
  fontFamily: vars.font.heading,
  fontSize: "24px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "134%",
});

export const title1R22 = style({
  fontFamily: vars.font.heading,
  fontSize: "22px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "28px",
});

// =========================
// Large Body
// =========================

export const largeBody1R32 = style({
  fontFamily: vars.font.body,
  fontSize: "32px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "134%",
});

export const largeBody2R18 = style({
  fontFamily: vars.font.body,
  fontSize: "18px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "132%",
});

export const largeBody3R16 = style({
  fontFamily: vars.font.body,
  fontSize: "16px",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "28px",
});

// =========================
// Body
// =========================

export const body1B18 = style({
  fontFamily: vars.font.body,
  fontSize: "18px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "25.2px",
});

export const body2B16 = style({
  fontFamily: vars.font.body,
  fontSize: "16px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "134%",
});

export const body3M16 = style({
  fontFamily: vars.font.body,
  fontSize: "16px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "24px",
});

export const body4B14 = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "20px",
});

export const body5SM14 = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: vars.fontWeight.semibold,
  lineHeight: "20px",
});

export const body6M14 = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "136%",
});

export const body7B12 = style({
  fontFamily: vars.font.body,
  fontSize: "12px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "16px",
});

export const body8SM12 = style({
  fontFamily: vars.font.body,
  fontSize: "12px",
  fontWeight: vars.fontWeight.semibold,
  lineHeight: "20px",
});

export const body9M12 = style({
  fontFamily: vars.font.body,
  fontSize: "12px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "134%",
});

// =========================
// Detail
// =========================

export const detail1M14 = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "20px",
});

export const detail2B12 = style({
  fontFamily: vars.font.body,
  fontSize: "12px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "16px",
});

export const detail3B10 = style({
  fontFamily: vars.font.body,
  fontSize: "10px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "14px",
});

export const detail4M10 = style({
  fontFamily: vars.font.body,
  fontSize: "10px",
  fontWeight: vars.fontWeight.medium,
  lineHeight: "14px",
});
