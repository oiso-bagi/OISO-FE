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

/** 경로선 위에 얹는 구간 정보. 예: "도보 8분" */
export const pathLabel = style([
  typo.detail3,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: "3px",

    padding: "2px 6px",
    whiteSpace: "nowrap",

    color: vars.color.black,
    backgroundColor: vars.color.white,

    border: `2px solid ${vars.color.black}`,
    boxShadow: `1.5px 1.5px 0 ${vars.color.black}`,
  },
]);

export const pathLabelIcon = style({
  width: "12px",
  height: "12px",
  display: "block",
});
