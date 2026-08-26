import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

export const dayTabs = style({
  display: "flex",
  flexShrink: 0,
  gap: "8px",
  overflowX: "auto",

  padding: `${vars.space.xs} ${vars.space.md}`,

  backgroundColor: vars.color.bg,
  borderBottom: `2.5px solid ${vars.color.black}`,
});

export const dayTab = style([
  typo.detail2,
  {
    flexShrink: 0,

    height: "30px",
    padding: "0 12px",

    color: vars.color.black,
    backgroundColor: vars.color.white,

    border: `2px solid ${vars.color.black}`,
    boxShadow: `1.5px 2px 0 ${vars.color.black}`,

    cursor: "pointer",

    selectors: {
      '&[data-active="true"]': {
        backgroundColor: vars.color.primary500,
      },
    },
  },
]);
