import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/** 하단 네비 없는 풀스크린 (모바일 프레임 유지) */
export const page = style({
  display: "flex",
  flexDirection: "column",

  width: "100%",
  minWidth: "375px",
  maxWidth: "430px",
  height: "100dvh",

  margin: "0 auto",
  // 노치(상단) 만큼 콘텐츠를 내려 상단 바가 가리지 않게
  paddingTop: "env(safe-area-inset-top, 0px)",

  backgroundColor: vars.color.bg,

  boxSizing: "border-box",
});

export const topBar = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: "8px",

  height: "56px",
  paddingInline: vars.space.md,

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

/** 지도: 남는 공간을 채워 크게 */
export const mapArea = style({
  flex: "1 1 auto",
  minHeight: "280px",

  borderBottom: `2.5px solid ${vars.color.black}`,
});

/** 경유지 리스트: 하단 고정 영역, 자체 스크롤 */
export const listArea = style({
  flex: "0 0 auto",
  maxHeight: "42dvh",

  overflowY: "auto",

  paddingInline: vars.space.md,
  // 하단 홈 인디케이터만큼 여백을 더해 마지막 경유지가 안 가리게
  paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
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
