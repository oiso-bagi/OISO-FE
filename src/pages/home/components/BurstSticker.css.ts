import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const sticker = style({
  display: "block",
});

/** 원본 배지와 같은 2px 오프셋 그림자 */
export const shadow = style({
  fill: vars.color.ink,
});

export const shape = style({
  fill: vars.color.red500,
  stroke: vars.color.red500,
});

export const label = style({
  fill: vars.color.ink,
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,

  // viewBox 안의 사용자 단위입니다. 요소 크기에 따라 같이 커집니다.
  fontSize: "10.5px",
});
