import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/**
 * 여행 완료 토글 줄.
 *
 * 완료 체크가 저장 목록에만 있어, 여행 중에 실제로 열어 두는 지도 화면에서는
 * 표시할 방법이 없었습니다. 일차 탭과 같은 가로줄 리듬을 씁니다.
 */
export const completionBar = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: vars.space.xs,

  padding: `${vars.space.xs} ${vars.space.md}`,

  backgroundColor: vars.color.bg,
  borderBottom: `2.5px solid ${vars.color.black}`,
});

export const label = style([
  typo.detail2,
  {
    flex: 1,
    minWidth: 0,

    color: vars.color.black,
    wordBreak: "keep-all",
  },
]);

export const toggleButton = style({
  position: "relative",
  flexShrink: 0,

  width: "44px",
  height: "24px",

  padding: 0,

  backgroundColor: vars.color.neutral100,
  border: `2px solid ${vars.color.black}`,
  borderRadius: "999px",

  cursor: "pointer",

  selectors: {
    '&[data-checked="true"]': {
      backgroundColor: vars.color.primary500,
    },

    "&:disabled": {
      opacity: 0.5,
      cursor: "default",
    },
  },
});

export const toggleThumb = style({
  position: "absolute",
  top: "2px",
  left: "2px",

  width: "16px",
  height: "16px",

  backgroundColor: vars.color.white,
  border: `2px solid ${vars.color.black}`,
  borderRadius: "50%",

  transition: "transform 150ms ease",

  selectors: {
    '&[data-checked="true"]': {
      transform: "translateX(20px)",
    },
  },
});
