import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/** 상단 바 + 지도 + 하단 리스트. 하단 네비(72px) 위 영역을 채웁니다. */
export const page = style({
  display: "flex",
  flexDirection: "column",

  backgroundColor: vars.color.bg,
});

export const topBar = style({
  // 스크롤해도 뒤로가기 버튼이 항상 보이게 상단 고정
  position: "sticky",
  top: 0,
  zIndex: 10,

  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: "8px",

  height: "56px",
  paddingInline: vars.space.md,

  backgroundColor: vars.color.bg,
  borderBottom: `2.5px solid ${vars.color.black}`,
});

export const backButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",

  width: "32px",
  height: "32px",

  marginLeft: "-6px",

  background: "none",
  border: 0,

  cursor: "pointer",
});

export const backIcon = style({
  display: "block",

  width: "24px",
  height: "24px",
});

export const title = style([
  typo.title2,
  {
    minWidth: 0,

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    color: vars.color.black,
  },
]);

/** 지도: 상단 고정 높이 (페이지 전체가 스크롤됨) */
export const mapArea = style({
  flexShrink: 0,

  height: "46dvh",
  minHeight: "280px",

  borderBottom: `2.5px solid ${vars.color.black}`,
});

/** 경유지 리스트: 지도 아래로 흐르며 페이지와 함께 스크롤 */
export const listArea = style({
  paddingInline: vars.space.md,
  paddingBottom: vars.space.md,
});

export const statusText = style([
  typo.body5,
  {
    paddingBlock: "24px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);

export const listSkeleton = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",

  paddingTop: "10px",
});
