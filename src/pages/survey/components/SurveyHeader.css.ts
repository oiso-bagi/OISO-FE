import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const header = style({
  height: "3.375rem",
  padding: `0 ${vars.space.md}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
});

export const backButton = style({
  width: "1.5rem",
  height: "1.5rem",
  display: "grid",
  placeItems: "center",
});

/** 돌아갈 곳이 없을 때. 자리는 남겨 "다시하기" 버튼 위치가 흔들리지 않게 합니다. */
export const backButtonHidden = style({
  visibility: "hidden",
});

export const backIcon = style({
  width: "1.5rem",
  height: "1.5rem",
  display: "block",
});

export const resetButton = style({
  height: "1.5rem",
  padding: `${vars.space.xxs} 0.625rem`,
  border: `0.15625rem solid ${vars.color.black}`,
  backgroundColor: vars.color.white,
  color: vars.color.black,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...typographyStyles.body9,
});
