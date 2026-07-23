import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const card = style({
  width: "100%",
  padding: "14px 14px",
  border: `2.5px solid ${vars.color.black}`,
  boxShadow: `4px 4px 0 ${vars.color.black}`,
  backgroundColor: vars.color.white,
});
