import { style } from "@vanilla-extract/css";

import { admin } from "./styles/adminTheme.css";

export const shell = style({
  display: "flex",
  alignItems: "flex-start",

  minHeight: "100vh",

  backgroundColor: admin.color.canvas,
  color: admin.color.text,
  fontFamily: admin.font.body,
  fontSize: admin.fontSize.md,

  // 관리자는 데스크톱 전용입니다. 좁은 화면에서는 줄바꿈 대신 가로 스크롤.
  minWidth: admin.size.minContent,
});

export const main = style({
  display: "flex",
  flexDirection: "column",

  flex: 1,
  minWidth: 0,
});

export const topbar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: admin.space.lg,

  height: admin.size.topbar,
  padding: `0 ${admin.space.xl}`,
  flexShrink: 0,

  backgroundColor: admin.color.surface,
  borderBottom: admin.border.thin,

  position: "sticky",
  top: 0,
  zIndex: 10,
});

export const topbarTitle = style({
  fontSize: admin.fontSize.lg,
  fontWeight: admin.fontWeight.semibold,
});

export const topbarRight = style({
  display: "flex",
  alignItems: "center",
  gap: admin.space.lg,
});

export const userInfo = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: admin.space.xxs,
});

export const userName = style({
  fontSize: admin.fontSize.md,
  fontWeight: admin.fontWeight.medium,
});

export const userEmail = style({
  fontSize: admin.fontSize.xs,
  color: admin.color.textMuted,
});

export const logoutButton = style({
  height: admin.size.control,
  padding: `0 ${admin.space.md}`,

  border: admin.border.thin,
  backgroundColor: admin.color.surface,

  color: admin.color.text,
  fontSize: admin.fontSize.sm,
  fontFamily: admin.font.body,

  cursor: "pointer",

  selectors: {
    "&:hover": {
      borderColor: admin.color.borderStrong,
    },
  },
});

export const content = style({
  flex: 1,
  padding: admin.space.xl,
});

/** 접근 확인 중 · 권한 없음 등 전체 화면 안내 */
export const notice = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: admin.space.md,

  minHeight: "100vh",
  padding: admin.space.xl,

  backgroundColor: admin.color.canvas,
  color: admin.color.text,
  fontFamily: admin.font.body,
  textAlign: "center",
});

export const noticeTitle = style({
  fontSize: admin.fontSize.xl,
  fontWeight: admin.fontWeight.bold,
});

export const noticeText = style({
  fontSize: admin.fontSize.md,
  color: admin.color.textMuted,
  lineHeight: 1.6,
});

export const noticeAction = style({
  marginTop: admin.space.sm,

  height: admin.size.control,
  padding: `0 ${admin.space.lg}`,

  border: "none",
  backgroundColor: admin.color.accent,

  color: "#FFFFFF",
  fontSize: admin.fontSize.sm,
  fontFamily: admin.font.body,
  textDecoration: "none",

  display: "inline-flex",
  alignItems: "center",

  cursor: "pointer",

  selectors: {
    "&:hover": { backgroundColor: admin.color.accentHover },
  },
});
