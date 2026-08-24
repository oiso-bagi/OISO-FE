import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/** 전단지 가격표의 한 줄. 테두리는 바깥 목록이 가지고, 줄끼리는 점선으로 나눕니다. */
export const row = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 48px",
  alignItems: "center",
  columnGap: "10px",

  padding: "9px 10px 9px 12px",

  color: vars.color.ink,
  borderBottom: `2.5px dashed ${vars.color.ink}`,

  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
    "&:active": {
      backgroundColor: vars.color.primary100,
    },
  },
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: "3px",

  minWidth: 0,
});

export const titleLine = style({
  display: "flex",
  alignItems: "flex-end",
});

export const name = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "15px",
  lineHeight: 1.25,

  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

/** 이름과 금액을 잇는 점선 */
export const leader = style({
  flexGrow: 1,
  height: 0,
  margin: "0 7px",

  borderBottom: `2.5px dotted ${vars.color.ink}`,

  // 글자 밑선에 맞춰 살짝 올립니다.
  transform: "translateY(-5px)",
});

export const price = style({
  flexShrink: 0,

  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "18px",
  lineHeight: 1.2,

  color: vars.color.red500,
});

export const meta = style([
  typo.body7,
  {
    color: "#4A443C",
  },
]);

export const mapButton = style({
  width: "48px",
  height: "48px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1px",

  backgroundColor: vars.color.primary500,
  border: `2.5px solid ${vars.color.ink}`,

  boxSizing: "border-box",
});

export const mapIcon = style({
  width: "19px",
  height: "19px",
  color: vars.color.ink,
});

export const mapLabel = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,
  fontSize: "9px",
  lineHeight: 1,
});
