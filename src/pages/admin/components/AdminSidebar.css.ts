import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

import { admin } from "../styles/adminTheme.css";

export const sidebar = style({
  display: "flex",
  flexDirection: "column",

  flexShrink: 0,

  height: "100vh",
  position: "sticky",
  top: 0,

  backgroundColor: admin.color.sidebar,

  // 접힘/펼침 폭 변화만 애니메이션합니다.
  transition: "width 140ms ease",
  overflow: "hidden",
});

export const sidebarWidth = styleVariants({
  expanded: { width: admin.size.sidebar },
  collapsed: { width: admin.size.sidebarCollapsed },
});

export const brand = style({
  display: "flex",
  alignItems: "center",
  gap: admin.space.sm,

  height: admin.size.topbar,
  padding: `0 ${admin.space.lg}`,
  flexShrink: 0,

  color: admin.color.sidebarTextActive,
  fontSize: admin.fontSize.lg,
  fontWeight: admin.fontWeight.bold,

  whiteSpace: "nowrap",
});

/** 접었을 때 로고도 아이콘 열에 맞춰 가운데로 옵니다. */
export const brandCollapsed = style({
  justifyContent: "center",
  padding: 0,
});

export const brandLogo = style({
  width: "26px",
  height: "26px",
  flexShrink: 0,

  // 로고 자체 여백이 있어 살짝 키워도 다른 아이콘과 눈높이가 맞습니다.
  objectFit: "contain",
});

export const nav = style({
  display: "flex",
  flexDirection: "column",

  flex: 1,
  paddingTop: admin.space.md,
});

export const navItem = style({
  display: "flex",
  alignItems: "center",
  gap: admin.space.md,

  height: "40px",
  padding: `0 ${admin.space.lg}`,

  color: admin.color.sidebarText,
  fontSize: admin.fontSize.md,
  fontWeight: admin.fontWeight.medium,

  textDecoration: "none",
  whiteSpace: "nowrap",

  // 활성 항목 좌측 액센트 바. 비활성일 때도 자리를 차지해 글자가 밀리지 않습니다.
  borderLeft: "2px solid transparent",

  selectors: {
    "&:hover": {
      color: admin.color.sidebarTextActive,
      backgroundColor: admin.color.sidebarActive,
    },
    '&[aria-current="page"]': {
      color: admin.color.sidebarTextActive,
      backgroundColor: admin.color.sidebarActive,
      borderLeftColor: admin.color.accent,
    },
  },
});

/**
 * 아이콘 SVG 들이 `stroke="black"` 을 직접 갖고 있어 어두운 사이드바에서
 * 보이지 않습니다. presentation attribute 는 CSS 보다 우선순위가 낮으므로
 * 여기서 현재 글자색으로 덮어씁니다.
 */
/**
 * 접었을 때는 라벨이 사라져 아이콘만 남습니다. 펼침 기준 좌측 패딩을 그대로 두면
 * 아이콘이 왼쪽으로 쏠리므로 가운데로 모읍니다. 좌측 액센트 바(2px)가 폭을
 * 차지하니 오른쪽을 그만큼 보정해야 실제 중앙에 옵니다.
 */
export const navItemCollapsed = style({
  justifyContent: "center",
  paddingLeft: 0,
  paddingRight: "2px",
});

export const navIcon = style({
  width: "18px",
  height: "18px",
  flexShrink: 0,
});

globalStyle(`${navIcon} path, ${navIcon} circle, ${navIcon} rect`, {
  stroke: "currentColor",
});

export const collapseMark = style({
  width: "18px",
  flexShrink: 0,

  fontFamily: admin.font.mono,
  fontSize: admin.fontSize.sm,
  textAlign: "center",
});

export const navLabel = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const collapseButton = style({
  display: "flex",
  alignItems: "center",
  gap: admin.space.md,

  width: "100%",
  height: "40px",
  padding: `0 ${admin.space.lg}`,
  flexShrink: 0,

  border: "none",
  borderTop: `1px solid ${admin.color.sidebarActive}`,
  background: "none",

  color: admin.color.sidebarText,
  fontSize: admin.fontSize.sm,
  fontFamily: admin.font.body,

  cursor: "pointer",
  whiteSpace: "nowrap",

  selectors: {
    "&:hover": {
      color: admin.color.sidebarTextActive,
      backgroundColor: admin.color.sidebarActive,
    },
  },
});

/** 접었을 때 펼침 화살표도 아이콘 열 중앙에 맞춥니다. */
export const collapseButtonCollapsed = style({
  justifyContent: "center",
  padding: 0,
});
