import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

import { largeTitleR32 } from "@/shared/styles/typography.css";
import { body2 } from "@/shared/styles/typography.css";
import { body3 } from "@/shared/styles/typography.css";
import { body7 } from "@/shared/styles/typography.css";
import { body9 } from "@/shared/styles/typography.css";

export const page = style({
  minHeight: "100vh",

  // 절약액 띠가 화면 폭을 꽉 채워야 해서 좌우 여백은 각 영역이 직접 가집니다.
  padding: "clamp(48px, 9vh, 88px) 0 40px",

  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.color.bg,
});

export const intro = style({
  paddingInline: "24px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const brandLogo = style({
  width: "104px",
  height: "104px",
  flexShrink: 0,
  display: "block",
});

export const title = style([
  largeTitleR32,
  {
    marginTop: "26px",
    textAlign: "center",
    letterSpacing: "-0.01em",
  },
]);

export const titleAccent = style({
  color: vars.color.secondary500,
});

export const description = style([
  body3,
  {
    marginTop: "12px",
    textAlign: "center",
    color: vars.color.neutral900,
  },
]);

/* ── 누적 절약액 ───────────────────────────────────── */

/**
 * 카드가 아니라 화면을 가르는 띠입니다.
 *
 * 좌우 테두리와 오프셋 그림자를 두면 이 화면에서 유일한 박스가 되어 위 문단과
 * 떨어져 떠 보입니다. 상하 선만 남겨 글 흐름에 붙여 둡니다.
 */
export const savingsBand = style({
  marginTop: "22px",
  padding: "14px 24px 16px",

  backgroundColor: vars.color.primary500,
  borderTop: "3px solid #111111",
  borderBottom: "3px solid #111111",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "6px",

  boxSizing: "border-box",
});

export const savingsLabel = style([body7]);

export const savingsAmount = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.regular,

  // 타이포 스케일에 32px 위 크기가 없어 직접 지정합니다. 제목(32px)보다 커야
  // 이 숫자가 화면의 주인공이 됩니다.
  fontSize: "36px",

  color: vars.color.black,
});

/* ── 로그인 버튼 ───────────────────────────────────── */

export const actions = style({
  // 위 영역과 버튼 사이를 벌려 버튼을 화면 아래쪽에 붙입니다.
  marginTop: "auto",
  paddingInline: "24px",

  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const loginButton = style([
  body2,
  {
    width: "100%",
    height: "54px",
    border: "2.5px solid #111111",
    borderRadius: 0,
    boxShadow: "2px 2px 0 #111111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: vars.color.black,

    selectors: {
      "&:focus-visible": {
        outline: `3px solid ${vars.color.secondary500}`,
        outlineOffset: "3px",
      },
      "&:active": {
        boxShadow: "1px 2px 0 #111111",
        transform: "translate(1px, 2px)",
      },
    },
  },
]);

export const kakaoButton = style([loginButton, { backgroundColor: "#FEE500" }]);

export const googleButton = style([
  loginButton,
  { backgroundColor: vars.color.white },
]);

export const logoSlot = style({
  width: "20px",
  height: "20px",
  flexShrink: 0,
});

export const footer = style([
  body9,
  {
    marginTop: "24px",
    paddingInline: "24px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
]);
