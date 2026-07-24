import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/** 루트 카드 목록. 추천 배지가 카드 위로 튀어나오므로 세로 간격을 넉넉히 둡니다. */
export const routeList = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",

  paddingBlock: "10px",
});

export const statusText = style([
  typo.body5,
  {
    paddingBlock: "40px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);

/** 카드를 펼쳤을 때 상세 조회 상태를 카드 안에 표시합니다. */
export const detailStatusText = style([
  typo.body9,
  {
    margin: 0,
    paddingBlock: "20px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);
