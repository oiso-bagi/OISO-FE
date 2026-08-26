import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/**
 * 어떤 조건으로 찾은 결과인지 알려 주는 줄.
 *
 * 일차 탭과 같은 굵기의 선을 아래에 둬 헤더부터 지도까지 이어지는 가로줄
 * 리듬을 유지합니다.
 */
export const summary = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: vars.space.xs,

  padding: `${vars.space.xs} ${vars.space.md}`,

  backgroundColor: vars.color.bg,
  borderBottom: `2.5px solid ${vars.color.black}`,
});

export const conditionText = style([
  typo.detail2,
  {
    flex: 1,
    minWidth: 0,

    color: vars.color.black,

    // 조건이 길어도 두 줄까지만 쓰고, 한글이 단어 중간에서 끊기지 않게 합니다.
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
]);

export const editButton = style([
  typo.detail2,
  {
    flexShrink: 0,

    height: "30px",
    padding: "0 10px",

    color: vars.color.black,
    backgroundColor: vars.color.white,

    border: `2px solid ${vars.color.black}`,
    boxShadow: `1.5px 2px 0 ${vars.color.black}`,

    cursor: "pointer",

    selectors: {
      "&:active": {
        transform: "translate(1.5px, 2px)",
        boxShadow: "none",
      },
    },
  },
]);
