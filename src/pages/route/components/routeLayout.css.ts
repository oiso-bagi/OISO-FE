import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/** 루트 카드 목록. 추천 배지가 카드 위로 튀어나오므로 세로 간격을 넉넉히 둡니다. */
export const routeList = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",

  paddingBlock: "20px",
});

export const statusText = style([
  typo.body5,
  {
    paddingBlock: "40px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);
