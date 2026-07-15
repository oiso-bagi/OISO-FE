import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    white: "#FFFFFF",
    black: "#000000",
    bg: "#F0F4E8",

    primary500: "#81EA14",
    primary400: "#9EF04A",
    primary300: "#D5FAB0",
    primary100: "#E8FFC4",

    secondary500: "#FD1187",
    secondary100: "#FF9ECF",

    neutral900: "#2E2836",
    neutral500: "#646668",
    neutral100: "#DCDDDE",
  },

  font: {
    heading: '"Black Han Sans", sans-serif',
    body: "Pretendard, sans-serif",
  },

  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
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
