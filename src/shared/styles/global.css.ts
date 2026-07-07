import { globalStyle } from "@vanilla-extract/css";
import "./theme.css.ts";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body, #root", {
  margin: 0,
  minHeight: "100%",
});

globalStyle("body", {
  fontFamily: "Pretendard, sans-serif",
  backgroundColor: "#cfcfcf",
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
