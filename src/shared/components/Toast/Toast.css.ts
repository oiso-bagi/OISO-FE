import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

const slideUp = keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const wrapper = style({
  position: "fixed",
  left: 0,
  right: 0,
  // 하단 네비(72px) + 홈 인디케이터 위로 16px 띄움
  bottom: "calc(88px + env(safe-area-inset-bottom, 0px))",

  zIndex: 90,

  display: "flex",
  justifyContent: "center",

  paddingInline: vars.space.md,

  pointerEvents: "none",
});

export const toast = style({
  pointerEvents: "auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,

  width: "100%",
  maxWidth: "398px", // 430 프레임 - 좌우 16

  padding: "12px 16px",

  backgroundColor: vars.color.white,

  border: `2px solid ${vars.color.black}`,
  boxShadow: `2px 2px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",

  animation: `${slideUp} 160ms ease`,
});

export const message = style([
  typo.body5,
  {
    // 긴 메시지가 토스트 너비를 밀어내지 않고 줄바꿈되게
    minWidth: 0,
    overflowWrap: "anywhere",

    color: vars.color.black,
  },
]);

export const actionButton = style([
  typo.body4,
  {
    flexShrink: 0,

    padding: "2px 4px",

    color: vars.color.secondary500,
    background: "none",
    border: 0,

    textDecoration: "underline",
    textUnderlineOffset: "2px",

    cursor: "pointer",
  },
]);
