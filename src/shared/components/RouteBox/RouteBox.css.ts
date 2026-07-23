import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

export const container = style({
  position: "relative",

  display: "flex",
  flexDirection: "column",

  width: "100%",
  minHeight: "132px",

  padding: "8px 12px",

  backgroundColor: vars.color.white,

  border: "2px solid #000000",
  boxShadow: "2px 2px 0 #000000",

  boxSizing: "border-box",
});

export const editHeader = style({
  display: "flex",
  alignItems: "center",

  minHeight: "18px",
  marginBottom: "2px",
});

export const completedText = style([
  typo.detail2,
  {
    marginRight: "4px",
  },
]);

export const toggleButton = style({
  position: "relative",

  width: "36px",
  height: "18px",

  padding: 0,

  backgroundColor: vars.color.neutral100,
  border: "1.5px solid #000000",
  borderRadius: "999px",

  cursor: "pointer",

  selectors: {
    '&[data-checked="true"]': {
      backgroundColor: vars.color.primary300,
    },
  },
});

export const toggleThumb = style({
  position: "absolute",
  top: "2px",
  left: "2px",

  width: "12px",
  height: "12px",

  backgroundColor: vars.color.white,
  border: "1.5px solid #000000",
  borderRadius: "50%",

  transition: "transform 150ms ease",

  selectors: {
    '&[data-checked="true"]': {
      transform: "translateX(17px)",
    },
  },
});

export const deleteButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "24px",
  height: "24px",

  marginLeft: "auto",
  padding: 0,

  backgroundColor: "transparent",
  border: 0,

  cursor: "pointer",
});

export const titleRow = style({
  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",

  minWidth: 0,
  minHeight: "28px",

  selectors: {
    // 추천 배지는 absolute 로 오른쪽 위에 걸쳐 있어 레이아웃 자리를 차지하지 않습니다.
    // 배지가 차지하는 폭(51px 중 titleRow 안쪽 44px)만큼 비워, 제목과 추천도가
    // 배지 아래로 들어가지 않게 합니다.
    '&[data-recommended="true"]': {
      paddingRight: "49px",
    },
  },
});

export const title = style([
  typo.largeBody2,
  {
    minWidth: 0,
    margin: 0,

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    color: vars.color.black,
  },
]);

export const routeInfo = style([
  typo.body5,
  {
    display: "flex",
    alignItems: "center",
    gap: "6px",

    minHeight: "20px",

    color: vars.color.neutral900,
    whiteSpace: "nowrap",
  },
]);

export const routeInfoItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
});

export const transportation = style({
  display: "inline-flex",
  alignItems: "center",
});

export const summaryList = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "4px",

  marginTop: "6px",
});

export const summaryItem = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    minWidth: 0,
    height: "42px",

    padding: "4px 6px",

    backgroundColor: "#FFFFFF",

    border: "2px solid #000000",

    boxSizing: "border-box",
  },

  variants: {
    variant: {
      default: {
        backgroundColor: "#FFFFFF",
      },

      primary: {
        backgroundColor: vars.color.primary100,
      },

      secondary: {
        backgroundColor: vars.color.secondary100,
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export const summaryLabel = style([
  typo.body8,
  {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
]);

export const summaryValue = style([
  typo.detail3,
  {
    display: "block",

    overflow: "hidden",
    textAlign: "right",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
]);

export const detailButton = style([
  typo.body7,
  {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: "2px",

    marginTop: "4px",
    padding: 0,

    color: vars.color.black,
    backgroundColor: "transparent",
    border: 0,

    cursor: "pointer",
  },
]);

// 별 모양과 "추천" 글자가 모두 들어 있는 recommendBadge.svg 를 그대로 씁니다.
export const recommendBadge = style({
  position: "absolute",
  top: "-12px",
  right: "-7px",

  display: "block",

  width: "51px",
  height: "41px",
  marginTop: "12px",
});

export const deleteIcon = style({
  width: "20px",
  height: "20px",
  display: "block",
});

export const locationIcon = style({
  width: "16px",
  height: "16px",
  display: "block",
});

export const recommendationRate = style({
  flexShrink: 0,

  // 고정 폭을 두면 "추천도 100%"(57px)가 박스를 넘쳐 추천 배지에 닿습니다.
  // 내용에 맞춰 늘어나게 두고, 배지와의 간격은 titleRow 의 paddingRight 가 보장합니다.
  height: "21px",

  color: vars.color.black,

  fontFamily: "Pretendard",
  fontSize: "10px",
  fontWeight: 900,
  lineHeight: "20px",
  letterSpacing: 0,
  textAlign: "center",

  whiteSpace: "nowrap",
});
