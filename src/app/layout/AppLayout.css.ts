import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

/**
 * 앱 전체 레이아웃
 * 최소 대응 너비: 375px
 */

export const appContainer = style({
  width: "100%",
  minWidth: "375px",
  maxWidth: "430px",
  minHeight: "100vh",

  margin: "0 auto",
  backgroundColor: vars.color.bg,
  position: "relative",
});

export const contentWithBottomNavigation = style({
  minHeight: "100vh",
  // 하단 네비(72px) + 홈 인디케이터 영역만큼 비워, 마지막 콘텐츠가 안 가리게
  paddingBottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
});

export const content = style({
  minHeight: "100vh",
});
