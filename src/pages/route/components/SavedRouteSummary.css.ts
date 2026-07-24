import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%",
  minHeight: "44px",

  padding: "4px 16px",

  backgroundColor: vars.color.primary300,
  border: `2.5px solid ${vars.color.black}`,

  boxSizing: "border-box",
});

export const label = style([
  typo.body8,
  {
    color: vars.color.black,
    whiteSpace: "nowrap",
  },
]);

export const amount = style([
  typo.body2,
  {
    margin: 0,

    color: vars.color.black,
    textAlign: "right",
    whiteSpace: "nowrap",
  },
]);
