import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const footer = style({
  padding: vars.space.md,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: vars.space.xs,
  flexShrink: 0,
});

/** 이전·다음 버튼 아래 한 줄을 모두 씁니다. */
export const attribution = style({
  gridColumn: "1 / -1",
  marginTop: vars.space.xxs,
});
