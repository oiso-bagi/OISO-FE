import { globalStyle } from "@vanilla-extract/css";
import "./theme.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("body", {
  margin: 0,
  fontFamily: "Pretendard, sans-serif",
  backgroundColor: "#ffffff",
  color: "#171717",
});

globalStyle("button", {
  border: "none",
  background: "none",
  padding: 0,
  cursor: "pointer",
  fontFamily: "inherit",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});
