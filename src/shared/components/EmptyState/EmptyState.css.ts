import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/**
 * 빈 화면 안내.
 *
 * 잘라 낸 자리처럼 보이도록 점선 테두리를 씁니다. 채워진 카드와 구분돼
 * "여기에 들어올 게 있다" 는 뜻이 먼저 읽힙니다.
 */
export const emptyState = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "6px",

  padding: "28px 20px",

  backgroundColor: vars.color.cream,
  border: `2.5px dashed ${vars.color.ink}`,

  boxSizing: "border-box",
  textAlign: "center",
});

export const title = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "20px",
  lineHeight: 1.25,

  color: vars.color.ink,
  wordBreak: "keep-all",
});

export const description = style([
  typo.body6,
  {
    color: vars.color.neutral500,
    wordBreak: "keep-all",
  },
]);

/** 전단지 CTA 와 같은 모양. 눌리면 그림자만큼 들어갑니다. */
export const actionButton = style([
  typo.body4,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    minHeight: "40px",
    marginTop: "8px",
    padding: "0 16px",

    color: vars.color.ink,
    backgroundColor: vars.color.primary500,

    border: `2.5px solid ${vars.color.ink}`,
    boxShadow: `2.5px 2.5px 0 0 ${vars.color.ink}`,

    cursor: "pointer",
    boxSizing: "border-box",

    selectors: {
      "&:active": {
        transform: "translate(2.5px, 2.5px)",
        boxShadow: "none",
      },
    },
  },
]);

/** 이미 큰 CTA 가 있는 자리에서는 버튼 대신 링크로 낮춥니다. */
export const actionLink = style([
  typo.body4,
  {
    marginTop: "4px",
    padding: "4px 2px",

    color: vars.color.red500,
    background: "none",
    border: 0,

    textDecoration: "underline",
    textUnderlineOffset: "3px",

    cursor: "pointer",
  },
]);
