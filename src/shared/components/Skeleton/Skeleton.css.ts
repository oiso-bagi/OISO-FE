import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

const pulse = keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.45 },
  "100%": { opacity: 1 },
});

export const skeleton = style({
  flexShrink: 0,

  backgroundColor: vars.color.neutral100,

  animation: `${pulse} 1.2s ease-in-out infinite`,
});
