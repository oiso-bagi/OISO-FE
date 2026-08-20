import { fontFace, globalStyle } from "@vanilla-extract/css";

import { vars } from "./theme.css";

/**
 * 폰트는 `public/` 바로 아래에 있어 `/PretendardVariable.woff2` 로 서빙됩니다.
 * `/fonts/` 를 붙이면 그 경로가 없어 SPA rewrite 가 index.html 을 대신
 * 내려주고, 브라우저는 이를 폰트로 파싱하다 OTS 오류로 버립니다.
 */
const pretendard = fontFace({
  src: 'url("/PretendardVariable.woff2") format("woff2")',
  fontDisplay: "swap",
});

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body, #root", {
  margin: 0,
  minHeight: "100%",
});

globalStyle("body", {
  fontFamily: `${pretendard}, ${vars.font.body}`,
  backgroundColor: vars.color.white,
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
