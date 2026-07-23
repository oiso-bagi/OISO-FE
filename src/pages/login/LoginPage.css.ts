import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

import { largeTitleR32 } from "@/shared/styles/typography.css";
import { body2 } from "@/shared/styles/typography.css";
import { body7 } from "@/shared/styles/typography.css";
import { body9 } from "@/shared/styles/typography.css";

export const page = style({
  minHeight: "100vh",
  padding: "clamp(80px, 16vh, 164px) 24px 48px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: vars.color.bg,
});

export const intro = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const brandLogoSlot = style({
  width: "145px",
  height: "145px",
  flexShrink: 0,
  display: "grid",
  placeItems: "center",
  overflow: "hidden",
  border: "3px solid #111111",
  backgroundColor: vars.color.white,
});

export const brandLogo = style({
  width: "131px",
  height: "132px",
  display: "block",
});

export const title = style([
  largeTitleR32,
  {
    marginTop: "24px",
  },
]);

export const description = style([
  body2,
  {
    marginTop: "20px",
  },
]);

export const accent = style({
  color: vars.color.secondary500,
});

export const benefitList = style({
  width: "100%",
  marginTop: "35px",
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "14px",
});

const benefitBase = style({
  height: "92px",
  border: "2px solid #111111",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  backgroundColor: vars.color.white,
  fontSize: "14px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
});

export const benefit = style([benefitBase]);

export const highlightedBenefit = style([
  benefitBase,
  {
    backgroundColor: vars.color.secondary500,
    color: vars.color.white,
  },
]);

export const benefitIcon = style([
  body7,
  {
    height: "24px",
    display: "grid",
    placeItems: "center",
  },
]);

export const actions = style({
  width: "calc(100% - 60px)",
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",

  "@media": {
    "screen and (max-width: 390px)": {
      width: "100%",
    },
  },
});

const loginButton = style([
  body2,
  {
    width: "100%",
    height: "54px",
    border: "2.5px solid #111111",
    borderRadius: 0,
    boxShadow: "2px 2px 0 #111111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: vars.color.black,

    selectors: {
      "&:focus-visible": {
        outline: `3px solid ${vars.color.secondary500}`,
        outlineOffset: "3px",
      },
      "&:active": {
        boxShadow: "1px 2px 0 #111111",
        transform: "translate(1px, 2px)",
      },
    },
  },
]);

export const kakaoButton = style([loginButton, { backgroundColor: "#FEE500" }]);

export const googleButton = style([
  loginButton,
  { backgroundColor: vars.color.white },
]);

export const logoSlot = style({
  width: "20px",
  height: "20px",
  flexShrink: 0,
});

export const footer = style([
  body9,
  {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
]);

export const signupText = style([
  body7,
  {
    marginLeft: "4px",
    color: vars.color.secondary500,
  },
]);
