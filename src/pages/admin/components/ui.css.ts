import { style, styleVariants } from "@vanilla-extract/css";

import { admin } from "../styles/adminTheme.css";

/* ── PageHeader ─────────────────────────────────────────── */

export const pageHeader = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: admin.space.lg,

  marginBottom: admin.space.lg,
});

export const pageTitle = style({
  fontSize: admin.fontSize.xl,
  fontWeight: admin.fontWeight.bold,
});

export const pageDescription = style({
  marginTop: admin.space.xs,

  fontSize: admin.fontSize.sm,
  color: admin.color.textMuted,
});

/* ── Panel (테이블·폼을 감싸는 면) ───────────────────────── */

export const panel = style({
  backgroundColor: admin.color.surface,
  border: admin.border.thin,
});

/* ── FilterBar ──────────────────────────────────────────── */

export const filterBar = style({
  display: "flex",
  alignItems: "center",
  gap: admin.space.md,

  padding: admin.space.md,
  borderBottom: admin.border.thin,
});

export const searchInput = style({
  width: "260px",
  height: admin.size.control,
  padding: `0 ${admin.space.md}`,

  border: admin.border.thin,
  backgroundColor: admin.color.surface,

  color: admin.color.text,
  fontSize: admin.fontSize.md,
  fontFamily: admin.font.body,

  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: admin.color.accent,
    },
    "&::placeholder": { color: admin.color.textDisabled },
  },
});

export const select = style({
  height: admin.size.control,
  padding: `0 ${admin.space.sm}`,

  border: admin.border.thin,
  backgroundColor: admin.color.surface,

  color: admin.color.text,
  fontSize: admin.fontSize.md,
  fontFamily: admin.font.body,

  cursor: "pointer",

  selectors: {
    "&:focus": { outline: "none", borderColor: admin.color.accent },
  },
});

export const filterSpacer = style({ flex: 1 });

/* ── DataTable ──────────────────────────────────────────── */

export const table = style({
  width: "100%",
  borderCollapse: "collapse",

  fontSize: admin.fontSize.md,
});

export const th = style({
  padding: `${admin.space.sm} ${admin.space.md}`,

  borderBottom: admin.border.thin,

  color: admin.color.textMuted,
  fontSize: admin.fontSize.sm,
  fontWeight: admin.fontWeight.semibold,
  textAlign: "left",
  whiteSpace: "nowrap",
});

export const td = style({
  padding: `${admin.space.sm} ${admin.space.md}`,

  borderBottom: admin.border.thin,

  verticalAlign: "middle",
});

export const tableStateCell = style({
  padding: admin.space.xxl,

  color: admin.color.textMuted,
  fontSize: admin.fontSize.md,
  textAlign: "center",
});

/** 숫자 컬럼은 자릿수를 맞춰 오른쪽 정렬합니다. */
export const numericCell = style({
  fontFamily: admin.font.mono,
  fontVariantNumeric: "tabular-nums",
  textAlign: "right",
});

/* ── Toggle ─────────────────────────────────────────────── */

export const toggle = style({
  position: "relative",

  width: "38px",
  height: "20px",
  flexShrink: 0,

  padding: 0,
  border: admin.border.strong,
  backgroundColor: admin.color.surface,

  cursor: "pointer",

  selectors: {
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    '&[aria-checked="true"]': {
      backgroundColor: admin.color.accent,
      borderColor: admin.color.accent,
    },
  },
});

export const toggleKnob = style({
  position: "absolute",
  top: "1px",
  left: "1px",

  width: "16px",
  height: "16px",

  backgroundColor: admin.color.borderStrong,

  transition: "transform 120ms ease, background-color 120ms ease",

  selectors: {
    '[aria-checked="true"] &': {
      transform: "translateX(18px)",
      backgroundColor: "#FFFFFF",
    },
  },
});

/* ── Badge ──────────────────────────────────────────────── */

export const badge = style({
  display: "inline-flex",
  alignItems: "center",

  padding: `${admin.space.xxs} ${admin.space.sm}`,

  fontSize: admin.fontSize.xs,
  fontWeight: admin.fontWeight.medium,
  whiteSpace: "nowrap",
});

export const badgeTone = styleVariants({
  neutral: {
    backgroundColor: admin.color.canvas,
    color: admin.color.textMuted,
    border: admin.border.thin,
  },
  accent: {
    backgroundColor: admin.color.accentSurface,
    color: admin.color.accent,
    border: `1px solid ${admin.color.accent}`,
  },
  success: {
    backgroundColor: admin.color.successSurface,
    color: admin.color.success,
    border: `1px solid ${admin.color.success}`,
  },
  danger: {
    backgroundColor: admin.color.dangerSurface,
    color: admin.color.danger,
    border: `1px solid ${admin.color.danger}`,
  },
});

/* ── Pagination ─────────────────────────────────────────── */

export const pagination = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: admin.space.md,

  padding: admin.space.md,
  borderTop: admin.border.thin,
});

export const paginationInfo = style({
  fontSize: admin.fontSize.sm,
  color: admin.color.textMuted,
});

export const paginationControls = style({
  display: "flex",
  alignItems: "center",
  gap: admin.space.xs,
});

export const pageButton = style({
  minWidth: admin.size.control,
  height: admin.size.control,
  padding: `0 ${admin.space.sm}`,

  border: admin.border.thin,
  backgroundColor: admin.color.surface,

  color: admin.color.text,
  fontSize: admin.fontSize.sm,
  fontFamily: admin.font.body,
  fontVariantNumeric: "tabular-nums",

  cursor: "pointer",

  selectors: {
    "&:hover:not(:disabled)": { borderColor: admin.color.borderStrong },
    "&:disabled": {
      color: admin.color.textDisabled,
      cursor: "not-allowed",
    },
    '&[aria-current="page"]': {
      backgroundColor: admin.color.accent,
      borderColor: admin.color.accent,
      color: "#FFFFFF",
    },
  },
});

/* ── Placeholder (후속 이슈에서 채울 화면) ───────────────── */

export const placeholder = style({
  display: "flex",
  flexDirection: "column",
  gap: admin.space.sm,

  padding: admin.space.xxl,

  backgroundColor: admin.color.surface,
  border: `1px dashed ${admin.color.border}`,

  color: admin.color.textMuted,
  fontSize: admin.fontSize.md,
  textAlign: "center",
});
