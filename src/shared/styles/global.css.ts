import { globalStyle } from "@vanilla-extract/css";

import { vars } from "./theme.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body, #root", {
  margin: 0,
  minHeight: "100%",
});

globalStyle("body", {
  fontFamily: vars.font.body,
  backgroundColor: vars.color.background,
  color: vars.color.black,
});

globalStyle("button", {
  border: "none",
  background: "none",
  padding: 0,
  cursor: "pointer",
  fontFamily: "inherit",
});

globalStyle("input, textarea, select", {
  fontFamily: "inherit",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("ul, ol", {
  margin: 0,
  padding: 0,
  listStyle: "none",
});

globalStyle("h1, h2, h3, h4, h5, h6, p", {
  margin: 0,
});
