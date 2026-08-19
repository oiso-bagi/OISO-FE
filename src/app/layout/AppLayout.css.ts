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

  /**
   * 자식(페이지)이 남는 높이를 채우도록 flex 컬럼으로 둡니다.
   * 페이지가 `minHeight: 100%` 를 써도 부모에 height 가 없으면 auto 로
   * 계산돼, 콘텐츠가 짧을 때 배경이 화면 아래까지 이어지지 않습니다.
   */
  display: "flex",
  flexDirection: "column",
});

export const content = style({
  minHeight: "100vh",
});

export const authStatus = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.sm,
  color: vars.color.neutral500,
});

export const authRetryButton = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  border: `2px solid ${vars.color.black}`,
  backgroundColor: vars.color.white,
  color: vars.color.black,
  cursor: "pointer",
});
