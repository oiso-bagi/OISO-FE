import { style, styleVariants } from "@vanilla-extract/css";

import { BOTTOM_NAV_ATTRIBUTION_HEIGHT } from "@/shared/styles/bottomNavigationSize";
import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

const base = style([
  typographyStyles.detail4,
  {
    display: "block",

    color: vars.color.neutral500,
    textAlign: "center",
    textDecoration: "none",

    "@media": {
      // 터치 기기에서는 탭한 뒤 hover 가 남아 밑줄이 붙은 채로 보입니다.
      "(hover: hover)": {
        selectors: {
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
]);

export const variant = styleVariants({
  /** 하단 네비 안. 높이가 고정이라 좁은 화면에서도 한 줄로 자릅니다. */
  navigation: [
    base,
    {
      height: BOTTOM_NAV_ATTRIBUTION_HEIGHT,
      paddingInline: vars.space.md,

      lineHeight: BOTTOM_NAV_ATTRIBUTION_HEIGHT,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  ],

  /** 네비가 없는 페이지 하단. 좁으면 어절 단위로 줄바꿈합니다. */
  page: [
    base,
    {
      wordBreak: "keep-all",
    },
  ],
});
