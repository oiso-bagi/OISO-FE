import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%",
  minHeight: "54px",
  padding: "0 16px",

  boxSizing: "border-box",
});

export const left = style({
  display: "flex",
  alignItems: "center",
  minWidth: 0,
  gap: "10px",
});

export const backButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  flexShrink: 0,
  width: "24px",
  height: "24px",

  border: 0,
  background: "transparent",
  textDecoration: "none",
  cursor: "pointer",
});

export const backIcon = style({
  display: "block",
  width: "24px",
  height: "24px",
});

export const title = style({
  margin: 0,

  color: vars.color.black,
  whiteSpace: "nowrap",
});

export const rightArea = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    flexShrink: 0,

    fontFamily: "inherit",
    color: vars.color.black,

    boxSizing: "border-box",
    whiteSpace: "nowrap",

    appearance: "none",
  },

  variants: {
    variant: {
      count: [
        typo.detail3,
        {
          height: "20px",
          padding: "4px 8px",
          marginLeft: "0",

          backgroundColor: vars.color.white,
          border: `2px solid ${vars.color.black}`,
          cursor: "default",
        },
      ],

      outline: [
        typo.body9,
        {
          minHeight: "24px",
          padding: "4px 10px",

          backgroundColor: vars.color.white,
          border: `2.5px solid ${vars.color.black}`,
          cursor: "pointer",
        },
      ],

      accent: [
        typo.body9,
        {
          minHeight: "24px",
          padding: "4px 10px",

          backgroundColor: vars.color.secondary100,
          border: `2.5px solid ${vars.color.black}`,
          cursor: "pointer",
        },
      ],
    },
  },

  defaultVariants: {
    variant: "outline",
  },
});
