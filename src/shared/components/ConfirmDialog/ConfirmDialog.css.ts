import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const popIn = keyframes({
  from: { opacity: 0, transform: "translateY(8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 100,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: vars.space.lg,

  backgroundColor: "rgba(0, 0, 0, 0.45)",

  animation: `${fadeIn} 120ms ease`,
});

export const dialog = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,

  width: "100%",
  maxWidth: "320px",

  padding: vars.space.lg,

  backgroundColor: vars.color.white,

  border: `2.5px solid ${vars.color.black}`,
  boxShadow: `4px 4px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",

  animation: `${popIn} 140ms ease`,
});

export const title = style([
  typo.body1,
  {
    color: vars.color.black,
  },
]);

export const description = style([
  typo.body6,
  {
    color: vars.color.neutral500,
  },
]);

export const actions = style({
  display: "flex",
  gap: vars.space.xs,

  marginTop: vars.space.xs,
});

const button = style([
  typo.body4,
  {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    minHeight: "44px",

    border: `2px solid ${vars.color.black}`,
    boxShadow: `2px 2px 0 0 ${vars.color.black}`,

    cursor: "pointer",
    boxSizing: "border-box",

    selectors: {
      "&:active": {
        transform: "translate(2px, 2px)",
        boxShadow: "none",
      },
    },
  },
]);

export const cancelButton = style([
  button,
  {
    color: vars.color.black,
    backgroundColor: vars.color.white,
  },
]);

export const confirmButton = style([
  button,
  {
    color: vars.color.white,
    backgroundColor: vars.color.secondary500,
  },
]);
