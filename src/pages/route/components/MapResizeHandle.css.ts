import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

/**
 * 지도와 목록 사이의 손잡이.
 *
 * 지도 아래 검은 선과 이 요소의 아래 선이 겹쳐 두 줄이 되는데, 헤더와 같은
 * 이중선이라 서비스 톤과 맞습니다.
 */
export const handle = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",

  width: "100%",
  height: "22px",
  padding: 0,

  backgroundColor: vars.color.bg,
  border: 0,
  borderBottom: `2.5px solid ${vars.color.black}`,

  cursor: "row-resize",

  // 드래그를 브라우저 스크롤에 빼앗기지 않게 합니다.
  touchAction: "none",

  selectors: {
    "&:active": {
      backgroundColor: vars.color.neutral100,
    },
  },
});

export const grip = style({
  width: "44px",
  height: "5px",

  backgroundColor: vars.color.black,
  borderRadius: "3px",
});
