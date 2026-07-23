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
  paddingBottom: "72px",
});

export const content = style({
  minHeight: "100vh",
});
