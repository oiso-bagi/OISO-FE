import { BOTTOM_NAV_TOTAL_HEIGHT } from "@/shared/styles/bottomNavigationSize";
import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

/**
 * 앱 전체 레이아웃
 * 최소 대응 너비: 360px
 *
 * 375px 로 막아 두면 갤럭시 기본 폭(360px)에서 모든 화면이 가로로 15px
 * 넘치고, 폭 100% 인 고정 하단 네비와도 정렬이 어긋납니다.
 */

/**
 * 화면 높이.
 *
 * 모바일 Safari 의 `100vh` 는 주소창·툴바가 접혔을 때 기준이라 실제 보이는
 * 높이보다 큽니다. 레이아웃을 `vh` 로 두면 문서가 툴바 높이만큼 길어져, 추천
 * 루트처럼 `dvh` 로 높이를 맞춘 화면이 통째로 밀리며 하단 네비 위에 빈 띠가
 * 생겼습니다. 보이는 높이(`dvh`)로 맞춥니다.
 */
const SCREEN_HEIGHT = "100dvh";

export const appContainer = style({
  width: "100%",
  minWidth: "360px",
  maxWidth: "430px",
  minHeight: SCREEN_HEIGHT,

  margin: "0 auto",
  backgroundColor: vars.color.bg,
  position: "relative",
});

export const contentWithBottomNavigation = style({
  minHeight: SCREEN_HEIGHT,
  // 하단 네비 + 홈 인디케이터 영역만큼 비워, 마지막 콘텐츠가 안 가리게
  paddingBottom: BOTTOM_NAV_TOTAL_HEIGHT,

  /**
   * 자식(페이지)이 남는 높이를 채우도록 flex 컬럼으로 둡니다.
   * 페이지가 `minHeight: 100%` 를 써도 부모에 height 가 없으면 auto 로
   * 계산돼, 콘텐츠가 짧을 때 배경이 화면 아래까지 이어지지 않습니다.
   */
  display: "flex",
  flexDirection: "column",
});

export const content = style({
  minHeight: SCREEN_HEIGHT,
});

export const authStatus = style({
  minHeight: SCREEN_HEIGHT,
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
