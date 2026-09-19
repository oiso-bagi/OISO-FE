import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { body3, body4, detail1 } from "@/shared/styles/typography.css";

export const page = style({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.color.bg,
});

export const form = style({
  marginTop: vars.space.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const label = style([body4, { color: vars.color.black }]);

export const input = style([
  // iOS 는 16px 보다 작은 입력칸에 포커스하면 화면을 확대하므로 16px 타이포를 씁니다.
  body3,
  {
    width: "100%",
    height: "54px",
    paddingInline: vars.space.md,
    border: `0.15625rem solid ${vars.color.black}`,
    borderRadius: 0,
    boxShadow: `0.25rem 0.25rem 0 ${vars.color.black}`,
    backgroundColor: vars.color.white,
    color: vars.color.black,

    selectors: {
      "&::placeholder": {
        color: vars.color.neutral500,
      },
      /**
       * 바깥에 따로 테두리를 두르면 그림자까지 겹쳐 선이 세 겹이 됩니다.
       * 입력칸 자기 테두리를 핑크로 바꿔 박스 크기 그대로 표시합니다.
       */
      "&:focus-visible": {
        outline: "none",
        borderColor: vars.color.secondary500,
      },
    },
  },
]);

export const errorMessage = style([
  detail1,
  { color: vars.color.secondary500 },
]);

export const submitButton = style({
  marginTop: vars.space.xs,
});
