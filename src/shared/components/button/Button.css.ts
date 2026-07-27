import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const button = style({
  width: "var(--button-width, 10.46875rem)",
  padding: "1rem",
  border: `0.15625rem solid ${vars.color.black}`,
  borderRadius: 0,
  boxShadow: `0.25rem 0.25rem 0 ${vars.color.black}`,
  color: vars.color.black,
  cursor: "pointer",
  fontFamily: vars.font.body,
  fontSize: "1rem",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "1.5rem",

  ":active": {
    transform: "translate(0.125rem, 0.125rem)",
    boxShadow: `0.125rem 0.125rem 0 ${vars.color.black}`,
  },

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
  },
});

export const variant = styleVariants({
  primary: {
    backgroundColor: vars.color.primary500,
  },
  secondary: {
    backgroundColor: vars.color.white,
  },
});
