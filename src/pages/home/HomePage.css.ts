import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",

  minHeight: "100%",
  paddingInline: "24px",
  paddingBottom: "24px",

  background: `linear-gradient(to top, ${vars.color.primary500} 0%, ${vars.color.white} 100%)`,

  boxSizing: "border-box",
});

/* ── Hero ─────────────────────────────────────────── */

export const hero = style({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "16px",

  paddingTop: "30px",
});

export const heroTop = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 0",
});

export const oisoBadge = style({
  flexShrink: 0,

  width: "60px",
  height: "60px",
});

export const heroTexts = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",

  minWidth: 0,
});

export const heroTitle = style([
  typo.title1,
  {
    color: vars.color.black,
  },
]);

export const heroSubtitle = style([
  typo.body3,
  {
    color: vars.color.neutral900,
  },
]);

export const ctaButton = style([
  typo.body4,
  {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",

    minWidth: "160px",
    padding: "4px 20px",
    boxSizing: "border-box",
    whiteSpace: "nowrap",

    color: vars.color.white,
    backgroundColor: vars.color.secondary500,

    border: `2px solid ${vars.color.black}`,
    boxShadow: `2px 2px 0 0 ${vars.color.black}`,

    cursor: "pointer",

    ":active": {
      transform: "translate(2px, 2px)",
      boxShadow: "none",
    },
  },
]);

/* ── 아낀 돈 카드 ─────────────────────────────────── */

export const savingCard = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",

  padding: "12px 16px",

  backgroundColor: vars.color.white,

  border: `2.5px solid ${vars.color.black}`,
  boxShadow: `2px 2px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",
});

export const savingCardHeader = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const savingIconBox = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",

  width: "40px",
  height: "40px",

  color: vars.color.black,
  backgroundColor: vars.color.primary500,

  border: `2px solid ${vars.color.black}`,
});

export const savingIcon = style({
  width: "24px",
  height: "24px",
});

export const savingTexts = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const savingCardTitle = style([
  typo.body1,
  {
    color: vars.color.black,
  },
]);

export const savingCardCaption = style([
  typo.body6,
  {
    color: vars.color.black,
  },
]);

export const savingAmount = style([
  typo.largeBody1,
  {
    color: vars.color.black,
  },
]);

/* ── 저장한 루트 ───────────────────────────────────── */

export const savedSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",

  padding: "12px 16px",

  backgroundColor: vars.color.white,

  border: `2.5px solid ${vars.color.black}`,
  boxShadow: `2px 2px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",
});

export const savedSectionHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
});

export const savedSectionTitle = style([
  typo.body1,
  {
    color: vars.color.black,
  },
]);

export const countBadge = style([
  typo.body2,
  {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    minWidth: "42px",
    padding: "2px 8px",

    color: vars.color.white,
    backgroundColor: vars.color.secondary500,

    border: `2.5px solid ${vars.color.black}`,
  },
]);

export const savedList = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const statusText = style([
  typo.body4,
  {
    paddingBlock: "24px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);
