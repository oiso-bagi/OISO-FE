import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

export const wrapper = style({
  position: "relative",

  width: "100%",
  height: "100%",

  backgroundColor: vars.color.bg,
  overflow: "hidden",
});

export const map = style({
  width: "100%",
  height: "100%",
});

export const overlayText = style([
  typo.body5,
  {
    position: "absolute",
    inset: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    margin: 0,

    color: vars.color.neutral500,
    backgroundColor: vars.color.bg,
  },
]);

/** 지도 위 경유지 순번 마커 — 리스트 순번 배지와 톤 통일 */
export const marker = style([
  typo.detail2,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "24px",
    height: "24px",

    color: vars.color.black,
    backgroundColor: vars.color.primary500,

    border: `2px solid ${vars.color.black}`,

    boxSizing: "border-box",
  },
]);
