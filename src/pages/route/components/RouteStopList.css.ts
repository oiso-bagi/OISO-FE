import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

// 메인 컨테이너
export const stopSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",

  width: "100%",
  marginTop: "12px",
});

export const stopSectionTitle = style([
  typo.largeBody2,
  {
    margin: 0,

    color: vars.color.black,
  },
]);

export const stopEmptyText = style([
  typo.body9,
  {
    width: "100%",
    margin: 0,
    paddingBlock: "16px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);

export const stopList = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",

  width: "100%",
  margin: 0,
  padding: 0,

  listStyle: "none",
});

export const stopListItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

// 경유지 카드
export const stopBox = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",

  width: "100%",
  padding: "8px 8px",

  backgroundColor: vars.color.white,

  border: `1.5px solid ${vars.color.black}`,
  boxShadow: `2px 2px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",
});

export const stopOrder = style([
  typo.detail2,
  {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",

    width: "18px",
    height: "18px",

    color: vars.color.black,
    backgroundColor: vars.color.primary500,

    border: `1px solid ${vars.color.black}`,

    boxSizing: "border-box",
  },
]);

export const stopContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",

  minWidth: 0,
});

export const stopName = style([
  typo.body7,
  {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    color: vars.color.black,
  },
]);

export const stopTagList = style({
  display: "flex",
  gap: "4px",

  minWidth: 0,
});

export const stopTag = style([
  typo.detail3,
  {
    padding: "2px 6px",

    color: vars.color.black,
    backgroundColor: vars.color.white,

    border: `1px solid ${vars.color.black}`,

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    boxSizing: "border-box",
  },
]);

// 경유지 사이 이동 정보 — ↓ 도보 8분
export const stopConnection = style([
  typo.body7,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",

    width: "100%",
    minHeight: "20px",

    color: vars.color.secondary500,
  },
]);

// 저장 버튼
export const saveButton = style([
  typo.body7,
  {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: "4px 0 0 0",
    gap: "4px",

    width: "63px",
    height: "30px",

    padding: 0,

    color: vars.color.white,
    backgroundColor: vars.color.secondary500,

    border: `1.5px solid ${vars.color.black}`,
    boxShadow: `1px 1px 0 0 ${vars.color.black}`,

    cursor: "pointer",
    boxSizing: "border-box",
  },
]);

export const saveIcon = style({
  display: "block",

  width: "14px",
  height: "14px",
});

// save.svg 는 stroke="black" 이 하드코딩되어 있어, 버튼 글자색(흰색)을 따라가도록 덮어씁니다.
globalStyle(`${saveIcon} path`, {
  stroke: "currentColor",
});
