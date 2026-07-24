import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",

  width: "100%",
  padding: "8px 16px",

  color: vars.color.black,
  backgroundColor: vars.color.white,

  border: `2px solid ${vars.color.black}`,
  boxShadow: `1.5px 1.5px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",

  ":active": {
    transform: "translate(1px, 1px)",
    boxShadow: "none",
  },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
});

export const name = style([
  typo.largeBody3,
  {
    minWidth: 0,

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    color: vars.color.black,
  },
]);

export const mapIcon = style({
  flexShrink: 0,

  width: "18px",
  height: "18px",

  color: vars.color.black,
});

export const date = style([
  typo.body4,
  {
    color: vars.color.black,
  },
]);

export const divider = style({
  width: "100%",
  height: "2px",

  backgroundColor: vars.color.black,
});

export const metaRow = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const metaItem = style([
  typo.largeBody3,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",

    color: vars.color.black,
  },
]);

export const savingIcon = style({
  width: "16px",
  height: "16px",
});

export const distanceIcon = style({
  width: "16px",
  height: "16px",
});

// down.svg / home_location.svg 는 stroke="black" 이 하드코딩되어 있어,
// 디자인대로 절약=초록 / 거리=핑크 로 stroke 를 덮어씁니다.
globalStyle(`${savingIcon} path`, {
  stroke: vars.color.primary500,
});

globalStyle(`${distanceIcon} path`, {
  stroke: vars.color.secondary500,
});
