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

/**
 * 셀렉트 화살표.
 *
 * data URI 안에는 CSS 변수를 넣을 수 없어 stroke 색(`#6B6B6B`)만 토큰의
 * `textMuted` 와 같은 값으로 직접 적어 둡니다.
 */
const SELECT_CHEVRON =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E` +
  `%3Cpath d='M1 1L5 5L9 1' stroke='%236B6B6B' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

export const select = style({
  height: admin.size.control,

  /**
   * 브라우저 기본 화살표는 위치를 조절할 수 없어 오른쪽 보더에 바짝 붙습니다.
   * `appearance: none` 으로 끄고 직접 그려서 보더와의 간격을 맞춥니다.
   */
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: SELECT_CHEVRON,
  backgroundRepeat: "no-repeat",
  backgroundPosition: `right ${admin.space.md} center`,

  // 라벨이 화살표를 침범하지 않도록 오른쪽을 비워 둡니다.
  padding: `0 ${admin.space.xxl} 0 ${admin.space.md}`,
  minWidth: "132px",

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

/** 헤더도 같이 오른쪽으로 붙여야 셀 내용과 라인이 맞습니다. */
export const numericHeader = style({
  textAlign: "right",
});

/* ── Toggle ─────────────────────────────────────────────── */

/**
 * 스위치는 관리자 토큰의 "모서리 둥글기 없음" 규칙에서 유일하게 빼 둡니다.
 * 각진 스위치는 체크박스처럼 보여 눌러서 바꾸는 컨트롤로 읽히지 않습니다.
 */
export const toggle = style({
  position: "relative",

  width: "34px",
  height: "18px",
  flexShrink: 0,

  padding: 0,
  // 꺼짐은 회색 트랙, 켜짐은 액센트. 노브 위치와 색이 함께 상태를 알려줍니다.
  border: `1px solid ${admin.color.textDisabled}`,
  borderRadius: "999px",
  backgroundColor: admin.color.textDisabled,

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

  width: "14px",
  height: "14px",
  borderRadius: "50%",

  // 노브는 항상 흰색. 켜짐/꺼짐은 트랙 색과 노브 위치로 구분합니다.
  backgroundColor: "#FFFFFF",

  transition: "transform 120ms ease",

  selectors: {
    '[aria-checked="true"] &': {
      transform: "translateX(16px)",
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

/* ── Button ─────────────────────────────────────────────── */

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: admin.space.xs,

  height: admin.size.control,
  padding: `0 ${admin.space.md}`,

  border: admin.border.thin,

  fontSize: admin.fontSize.md,
  fontFamily: admin.font.body,
  fontWeight: admin.fontWeight.medium,
  whiteSpace: "nowrap",

  cursor: "pointer",

  selectors: {
    "&:disabled": {
      opacity: 0.45,
      cursor: "not-allowed",
    },
  },
});

export const buttonTone = styleVariants({
  neutral: {
    backgroundColor: admin.color.surface,
    color: admin.color.text,
    selectors: {
      "&:hover:not(:disabled)": { borderColor: admin.color.borderStrong },
    },
  },
  primary: {
    backgroundColor: admin.color.accent,
    borderColor: admin.color.accent,
    color: "#FFFFFF",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: admin.color.accentHover,
        borderColor: admin.color.accentHover,
      },
    },
  },
  /** 정지·삭제처럼 되돌리기 어려운 동작 */
  danger: {
    backgroundColor: admin.color.danger,
    borderColor: admin.color.danger,
    color: "#FFFFFF",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: admin.color.dangerHover,
        borderColor: admin.color.dangerHover,
      },
    },
  },
});

/* ── 알림 문구 ──────────────────────────────────────────── */

/** 뮤테이션 실패 사유를 목록 위에 그대로 띄웁니다. */
export const inlineError = style({
  display: "flex",
  alignItems: "center",
  gap: admin.space.sm,

  padding: `${admin.space.sm} ${admin.space.md}`,

  backgroundColor: admin.color.dangerSurface,
  borderBottom: `1px solid ${admin.color.danger}`,

  color: admin.color.danger,
  fontSize: admin.fontSize.md,
});

/* ── Tabs ───────────────────────────────────────────────── */

export const tabList = style({
  display: "flex",
  gap: admin.space.xs,

  marginBottom: admin.space.lg,
  borderBottom: admin.border.thin,
});

export const tab = style({
  height: "34px",
  padding: `0 ${admin.space.lg}`,

  border: "none",
  background: "none",

  color: admin.color.textMuted,
  fontSize: admin.fontSize.md,
  fontFamily: admin.font.body,
  fontWeight: admin.fontWeight.medium,

  cursor: "pointer",

  // 활성 탭 하단 액센트 바. 비활성일 때도 자리를 차지해 글자가 밀리지 않습니다.
  borderBottom: "2px solid transparent",
  marginBottom: "-1px",

  selectors: {
    "&:hover": { color: admin.color.text },
    '&[aria-selected="true"]': {
      color: admin.color.text,
      borderBottomColor: admin.color.accent,
      fontWeight: admin.fontWeight.semibold,
    },
  },
});

/* ── 셀 보조 ────────────────────────────────────────────── */

export const cellMuted = style({
  color: admin.color.textMuted,
  fontSize: admin.fontSize.sm,
});

export const cellStack = style({
  display: "flex",
  flexDirection: "column",
  gap: admin.space.xxs,
});

/** 한 셀에 토글·버튼을 나란히 둘 때 */
export const cellActions = style({
  display: "flex",
  alignItems: "center",
  gap: admin.space.sm,
});

/** 주소처럼 길어질 수 있는 셀 */
export const cellEllipsis = style({
  display: "block",
  maxWidth: "260px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

/* ── ConfirmDialog ──────────────────────────────────────── */

export const dialogOverlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 100,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: admin.space.lg,
  backgroundColor: "rgba(20, 20, 20, 0.45)",
});

export const dialog = style({
  width: "100%",
  maxWidth: "420px",

  backgroundColor: admin.color.surface,
  border: admin.border.strong,
});

export const dialogBody = style({
  padding: admin.space.xl,
});

export const dialogTitle = style({
  marginBottom: admin.space.sm,

  fontSize: admin.fontSize.lg,
  fontWeight: admin.fontWeight.bold,
});

export const dialogDescription = style({
  color: admin.color.textMuted,
  fontSize: admin.fontSize.md,
  lineHeight: 1.6,
});

export const dialogActions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: admin.space.sm,

  padding: admin.space.md,
  borderTop: admin.border.thin,
  backgroundColor: admin.color.canvas,
});

/* ── 대시보드 ───────────────────────────────────────────── */

export const statGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: admin.space.md,

  marginBottom: admin.space.lg,
});

export const statCard = style({
  padding: admin.space.lg,

  backgroundColor: admin.color.surface,
  border: admin.border.thin,
});

export const statLabel = style({
  marginBottom: admin.space.sm,

  color: admin.color.textMuted,
  fontSize: admin.fontSize.sm,
});

export const statValue = style({
  display: "flex",
  alignItems: "baseline",
  gap: admin.space.xxs,

  fontFamily: admin.font.mono,
  fontSize: admin.fontSize.xxl,
  fontWeight: admin.fontWeight.bold,
  fontVariantNumeric: "tabular-nums",
});

export const statUnit = style({
  color: admin.color.textMuted,
  fontFamily: admin.font.body,
  fontSize: admin.fontSize.md,
  fontWeight: admin.fontWeight.regular,
});

/** 차트 2종을 나란히 둡니다. */
export const dashboardRow = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: admin.space.md,

  marginBottom: admin.space.lg,
});

export const sectionTitle = style({
  padding: admin.space.md,
  borderBottom: admin.border.thin,

  fontSize: admin.fontSize.md,
  fontWeight: admin.fontWeight.semibold,
});

export const sectionBody = style({
  padding: admin.space.lg,
});

/* ── 가로 막대 (절약 리포트) ────────────────────────────── */

export const barRow = style({
  display: "grid",
  gridTemplateColumns: "88px 1fr 116px",
  alignItems: "center",
  gap: admin.space.md,

  selectors: {
    "&:not(:last-child)": { marginBottom: admin.space.md },
  },
});

export const barLabel = style({
  fontSize: admin.fontSize.md,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const barTrack = style({
  height: "18px",
  backgroundColor: admin.color.canvas,
  border: admin.border.thin,
});

export const barFill = style({
  height: "100%",
  backgroundColor: admin.color.accent,
});

export const barValue = style({
  color: admin.color.textMuted,
  fontFamily: admin.font.mono,
  fontSize: admin.fontSize.sm,
  fontVariantNumeric: "tabular-nums",
  textAlign: "right",
});

/* ── KTO 배치 운영 ──────────────────────────────────────── */

export const ktoGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: admin.space.lg,

  marginBottom: admin.space.lg,
});

export const ktoField = style({
  display: "flex",
  flexDirection: "column",
  gap: admin.space.xs,
});

export const ktoFieldLabel = style({
  color: admin.color.textMuted,
  fontSize: admin.fontSize.sm,
});

export const ktoFieldValue = style({
  fontFamily: admin.font.mono,
  fontSize: admin.fontSize.lg,
  fontVariantNumeric: "tabular-nums",
});

export const ktoFooter = style({
  display: "flex",
  alignItems: "center",
  gap: admin.space.md,
});

export const ktoNote = style({
  color: admin.color.textMuted,
  fontSize: admin.fontSize.sm,
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
