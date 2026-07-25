import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const page = style({
  width: "100%",
  minWidth: "375px",
  maxWidth: "430px",
  minHeight: "100vh",
  margin: "0 auto",
  padding: "24px 16px",
  display: "grid",
  placeItems: "center",
  background: `linear-gradient(
    to bottom,
    #F0F4E8 0%,
    ${vars.color.primary100} 48%,
    #B3EF74 100%
  )`,
});

export const content = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transform: "translateY(-3vh)",
});

export const statusBadge = style([
  typographyStyles.largeTitleR32,
  {
    minWidth: "90px",
    padding: "10px 8px",
    border: `2.5px solid ${vars.color.black}`,
    boxShadow: `4px 4px 0 ${vars.color.black}`,
    backgroundColor: vars.color.secondary500,
    color: vars.color.black,
    lineHeight: 1,
  },
]);

export const title = style([
  typographyStyles.title1,
  {
    marginTop: "16px",
  },
]);

export const description = style([
  typographyStyles.body3,
  {
    marginTop: "16px",
    color: vars.color.neutral500,
  },
]);

export const homeLink = style([
  typographyStyles.body2,
  {
    minWidth: "149px",
    minHeight: "56px",
    marginTop: "16px",
    padding: "15px 16px",
    border: `2.5px solid ${vars.color.black}`,
    boxShadow: `4px 4px 0 ${vars.color.black}`,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
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
