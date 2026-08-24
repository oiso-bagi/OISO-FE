import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const budgetInputSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const fieldGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const fieldLabel = style({
  color: vars.color.black,
  ...typographyStyles.body4,
});

export const dayOptionGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  gap: vars.space.xs,
});

export const dayOption = style({
  minHeight: "2.25rem",
  padding: "0.5rem 0.25rem",
  border: `0.15625rem solid ${vars.color.black}`,
  backgroundColor: vars.color.white,
  color: vars.color.black,
  cursor: "pointer",
  ...typographyStyles.body4,

  selectors: {
    '&[aria-pressed="true"]': {
      backgroundColor: vars.color.secondary100,
    },
  },
});

export const budgetInputCard = style({
  minHeight: "4.75rem",
  padding: vars.space.md,
  border: `0.15625rem solid ${vars.color.black}`,
  backgroundColor: vars.color.white,
  boxShadow: `0.25rem 0.25rem 0 ${vars.color.black}`,
  display: "flex",
  alignItems: "center",

  // 입력칸 포커스 테두리가 오프셋 0.25rem + 두께 0.125rem 만큼 바깥으로
  // 나오므로, ₩ 와 닿지 않도록 그보다 넓게 띄웁니다.
  gap: vars.space.sm,
});

export const currencySymbol = style({
  // 고정 폭을 두면 ₩ 글자가 상자를 넘쳐 옆 요소와 겹칩니다.
  flexShrink: 0,
  color: vars.color.black,
  fontFamily: vars.font.heading,
  fontSize: "2rem",
  fontWeight: vars.fontWeight.regular,
  lineHeight: "1",
});

export const budgetInput = style({
  minWidth: 0,
  flex: "1 1 auto",
  border: 0,
  backgroundColor: "transparent",
  color: vars.color.black,
  ...typographyStyles.largeTitleR32,

  ":focus-visible": {
    outline: `0.125rem solid ${vars.color.black}`,
    outlineOffset: vars.space.xxs,
  },
});

export const currencyUnit = style({
  flexShrink: 0,
  color: vars.color.neutral500,
  ...typographyStyles.body2,
});

export const fieldHint = style({
  color: vars.color.neutral500,
  ...typographyStyles.detail1,
});

/** 기간 안내와 음수 입력 오류. 눈에 띄어야 해서 강조색을 씁니다. */
export const fieldHintNotice = style({
  color: vars.color.secondary500,
  ...typographyStyles.detail1,
});

export const presetSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const presetTitle = style({
  color: vars.color.neutral500,
  ...typographyStyles.body7,
});

export const presetGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: vars.space.xs,
});

export const presetButton = style({
  minHeight: "2.25rem",
  padding: "0.5rem 0.25rem",
  border: `0.15625rem solid ${vars.color.black}`,
  backgroundColor: vars.color.white,
  color: vars.color.black,
  cursor: "pointer",
  overflowWrap: "anywhere",
  wordBreak: "keep-all",
  ...typographyStyles.body7,

  selectors: {
    '&[aria-pressed="true"]': {
      backgroundColor: vars.color.secondary100,
    },
  },
});

export const allocationCard = style({
  padding: "0.875rem",
  border: `0.15625rem solid ${vars.color.black}`,
  backgroundColor: vars.color.primary400,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const allocationTitle = style({
  color: vars.color.black,
  ...typographyStyles.body1,
});

export const allocationList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const allocationEmptyText = style({
  color: vars.color.neutral500,
  textAlign: "center",
  ...typographyStyles.body4,
});

export const allocationItem = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xxs,
});

export const allocationRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  color: vars.color.black,
  ...typographyStyles.body3,
});

export const allocationLabel = style({
  minWidth: 0,
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  whiteSpace: "nowrap",
});

export const allocationIcon = style({
  width: "1.25rem",
  height: "1.25rem",
  objectFit: "contain",
});

export const allocationValue = style({
  flexShrink: 0,
  whiteSpace: "nowrap",
});

export const allocationControl = style({
  display: "flex",
});

export const allocationRange = style({
  width: "100%",
  height: "1rem",
  border: `0.125rem solid ${vars.color.neutral900}`,
  borderRadius: vars.radius.sm,
  appearance: "none",
  cursor: "pointer",

  "::-webkit-slider-thumb": {
    width: "1.5rem",
    height: "1rem",
    border: `0.125rem solid ${vars.color.neutral900}`,
    borderRadius: vars.radius.sm,
    appearance: "none",
    backgroundColor: vars.color.white,
  },

  "::-moz-range-thumb": {
    width: "1.5rem",
    height: "1rem",
    border: `0.125rem solid ${vars.color.neutral900}`,
    borderRadius: vars.radius.sm,
    backgroundColor: vars.color.white,
  },

  ":focus-visible": {
    outline: `0.125rem solid ${vars.color.black}`,
    outlineOffset: vars.space.xxs,
  },
});
