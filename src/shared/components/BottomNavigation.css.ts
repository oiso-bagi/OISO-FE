import { style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

import { BOTTOM_NAV_TOTAL_HEIGHT } from "@/shared/styles/bottomNavigationSize";
import { typographyStyles } from "@/shared/styles/typography";

export const bar = style({
  position: "fixed",
  left: "50%",
  bottom: 0,
  transform: "translateX(-50%)",

  width: "100%",
  maxWidth: "430px",
  // 아이콘 줄 + 데이터 출처 줄 + 홈 인디케이터 영역 (border-box)
  height: BOTTOM_NAV_TOTAL_HEIGHT,
  paddingBottom: "env(safe-area-inset-bottom, 0px)",

  display: "flex",
  flexDirection: "column",

  backgroundColor: "#ffffff",
  borderTop: "3px solid #000000",
  zIndex: 100,
});

/** 데이터 출처 줄을 뺀 나머지 높이를 아이콘 줄이 채웁니다. */
export const navigation = style({
  flex: "1 1 auto",
  minHeight: 0,

  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  alignItems: "center",
});

export const attribution = style({
  flexShrink: 0,
});

export const item = style({
  height: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",

  color: "#000000",
  textDecoration: "none",
});

export const iconBox = style({
  width: "36px",
  height: "36px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const activeIconBox = style({
  backgroundColor: vars.color.secondary500,
  border: "3px solid #000000",
});

export const icon = style({
  width: "24px",
  height: "24px",
  objectFit: "contain",
});

export const activeIcon = style({
  filter: "brightness(0) invert(1)",
});

export const label = style([
  typographyStyles.detail4,
  {
    color: vars.color.neutral500,
    lineHeight: 1,
  },
]);

export const activeLabel = style([
  typographyStyles.detail3,
  {
    color: vars.color.black,
  },
]);
