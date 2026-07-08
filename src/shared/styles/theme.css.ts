import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    // Brand
    primary: "#81EA14",
    primaryLight: "#D5FAB0",
    primaryBackground: "#E8FFC4",

    // Semantic
    error: "#FD3C11",
    warning: "#FF9A89",

    // Neutral
    black: "#000000",
    white: "#FFFFFF",

    gray900: "#000000",
    gray700: "#646668",
    gray500: "#DCDDDE",
    gray300: "#E0E4E6",
    gray100: "#F6FFE8",

    // Background
    background: "#E8FFC4",
    surface: "#FFFFFF",

    // Border
    border: "#000000",
    borderLight: "#DCDDDE",
  },
  font: {
    body: "Pretendard, sans-serif",
  },
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    xxl: "32px",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  },
  space: {
    xxs: "4px",
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "40px",
  },
});
