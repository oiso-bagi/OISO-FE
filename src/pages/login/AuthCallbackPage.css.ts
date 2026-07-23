import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { title1, body2, body3 } from "@/shared/styles/typography.css";

export const page = style({
  width: "100%",
  minHeight: "100vh",
  padding: "24px 22px",
  display: "grid",
  placeItems: "center",
  backgroundColor: vars.color.bg,
});

export const statusContent = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transform: "translateY(-5vh)",
});

const iconBase = {
  position: "relative",
  width: "72px",
  height: "72px",
  border: `2.5px solid ${vars.color.black}`,
  boxShadow: `4px 4px 0 ${vars.color.black}`,
} as const;

const dotBounce = keyframes({
  "0%, 60%, 100%": {
    transform: "translateY(0)",
  },
  "30%": {
    transform: "translateY(-5px)",
  },
});

export const loadingIcon = style({
  ...iconBase,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  backgroundColor: vars.color.primary500,
});

export const loadingDot = style({
  width: "8px",
  height: "8px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.black,
  animation: `${dotBounce} 1.2s ease-in-out infinite`,

  selectors: {
    "&:nth-child(2)": {
      animationDelay: "0.15s",
    },
    "&:nth-child(3)": {
      animationDelay: "0.3s",
    },
  },

  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const errorIcon = style({
  ...iconBase,
  display: "grid",
  placeItems: "center",
  backgroundColor: vars.color.secondary100,
});

export const errorSymbol = style({
  width: "20px",
  height: "20px",
  display: "block",
});

export const title = style([
  title1,
  {
    marginTop: "18px",
  },
]);

export const description = style([
  body3,
  {
    marginTop: "18px",
    color: vars.color.neutral500,
    lineHeight: "1.6",
  },
]);

export const retryButton = style([
  body2,
  {
    width: "100%",
    height: "54px",
    marginTop: "18px",
    border: `2.5px solid ${vars.color.black}`,
    borderRadius: 0,
    boxShadow: `4px 4px 0 ${vars.color.black}`,
    backgroundColor: vars.color.primary500,
    color: vars.color.black,

    selectors: {
      "&:focus-visible": {
        outline: `3px solid ${vars.color.secondary500}`,
        outlineOffset: "3px",
      },
      "&:active": {
        boxShadow: `2px 3px 0 ${vars.color.black}`,
        transform: "translate(2px, 3px)",
      },
    },
  },
]);
