import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    white: "#ffffff",
    black: "#000000",
    gray100: "#f5f5f5",
    gray200: "#e5e5e5",
    gray500: "#737373",
    gray900: "#171717",
    primary: "#2f80ed",
  },
  font: {
    body: "Pretendard, sans-serif",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
});
