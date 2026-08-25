import { style, styleVariants } from "@vanilla-extract/css";

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
  alignItems: "flex-start",
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

      /**
       * 배지는 `top: -12px` + `marginTop: 12px` 라 이 줄의 0~41px 를 차지합니다.
       * 제목이 한 줄이면 줄 높이가 28px 뿐이라 배지가 13px 삐져나와 아래
       * 정보 줄(추천도)을 덮었습니다. 최소 높이를 배지에 맞춥니다.
       */
      minHeight: "41px",
    },
  },
});

export const title = style([
  typo.largeBody2,
  {
    minWidth: 0,
    margin: 0,

    /**
     * 서버가 주는 코스 이름이 길어(중앙값 28자, 최대 49자) 한 줄로는 뒤쪽이
     * 잘립니다. 구분되는 부분이 뒤에 있어 잘리면 서로 다른 루트가 같은 이름으로
     * 보입니다. 두 줄까지 허용하고, 그래도 넘치면 말줄임합니다.
     */
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",

    // 낱말이 중간에서 갈리지 않게 어절 단위로 끊고, 한 어절이 줄보다 길면
    // 그때만 안에서 끊습니다.
    wordBreak: "keep-all",
    overflowWrap: "anywhere",

    color: vars.color.black,
  },
]);

export const routeInfo = style([
  typo.body5,
  {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "6px",
    rowGap: "2px",

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

export const summaryItem = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  minWidth: 0,
  height: "42px",

  padding: "4px 6px",

  backgroundColor: vars.color.white,

  border: `2px solid ${vars.color.black}`,

  boxSizing: "border-box",
});

export const summaryItemVariant = styleVariants({
  default: {
    backgroundColor: vars.color.white,
  },

  primary: {
    backgroundColor: vars.color.primary100,
  },

  secondary: {
    backgroundColor: vars.color.secondary100,
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

  // 정보 줄 오른쪽 끝에 붙입니다.
  marginLeft: "auto",

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
