import { createGlobalTheme } from "@vanilla-extract/css";

/**
 * 관리자 전용 디자인 토큰.
 *
 * 서비스 앱의 `shared/styles/theme.css.ts` 는 사용하지 않습니다. 서비스는
 * 네온 컬러에 둥근 모서리와 오프셋 그림자를 쓰는데, 표와 폼이 빽빽하게 들어가는
 * 관리자 화면에서는 읽기 어렵습니다.
 *
 * 방향
 * - 모서리 둥글기 없음, 1px 실선 보더, 그림자 없음
 * - 중립색 위주. 액센트는 활성 메뉴와 주요 버튼에만
 * - 위험한 동작(정지·삭제)에만 경고색
 */
export const admin = createGlobalTheme(":root", {
  color: {
    /** 페이지 배경 */
    canvas: "#F5F5F5",
    /** 카드·테이블 등 콘텐츠 면 */
    surface: "#FFFFFF",
    /** 사이드바 */
    sidebar: "#141414",
    sidebarText: "#A3A3A3",
    sidebarTextActive: "#FFFFFF",
    sidebarActive: "#262626",

    text: "#141414",
    textMuted: "#6B6B6B",
    textDisabled: "#A3A3A3",

    border: "#D4D4D4",
    borderStrong: "#141414",

    /** 액센트. 활성 상태와 주요 버튼에만 사용 */
    accent: "#1A56DB",
    accentHover: "#1443AE",
    accentSurface: "#EBF1FE",

    /** 정지·삭제 등 되돌리기 어려운 동작 */
    danger: "#C81E1E",
    dangerHover: "#A11616",
    dangerSurface: "#FDECEC",

    success: "#046C4E",
    successSurface: "#E8F5F0",

    warning: "#8E4B10",
    warningSurface: "#FDF3E7",
  },

  font: {
    body: "Pretendard, sans-serif",
    /** 숫자 정렬이 필요한 표·지표용 */
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
  },

  fontSize: {
    xs: "11px",
    sm: "12px",
    md: "13px",
    lg: "15px",
    xl: "20px",
    xxl: "28px",
  },

  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  space: {
    xxs: "2px",
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "32px",
  },

  size: {
    sidebar: "240px",
    sidebarCollapsed: "64px",
    topbar: "56px",
    /**
     * 이 폭 아래로는 가로 스크롤이 생깁니다. 관리자는 데스크톱 전용이지만,
     * 브라우저를 화면 절반~2/3 폭으로 띄워 두고 쓰는 경우가 많아 그 구간까지는
     * 스크롤 없이 보이도록 낮춰 두었습니다.
     */
    minContent: "900px",
    control: "32px",
  },

  border: {
    thin: "1px solid #D4D4D4",
    strong: "1px solid #141414",
  },
});
