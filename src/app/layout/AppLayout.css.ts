import { style } from "@vanilla-extract/css";

export const appContainer = style({
  width: "100%",
  maxWidth: "430px",
  minHeight: "100vh",

  margin: "0 auto",
  backgroundColor: "#ffffff",
  position: "relative",
});

export const contentWithBottomNavigation = style({
  minHeight: "100vh",
  paddingBottom: "72px",
});

export const content = style({
  minHeight: "100vh",
});
