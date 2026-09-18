import { globalStyle, keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

const popUp = keyframes({
  from: { opacity: 0, transform: "translateY(6px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const CALLOUT_WIDTH = "224px";
const LINE = `1.5px solid ${vars.color.black}`;

/** 태그와 핀을 잇는 선 길이. 붙어 있으면 몰린 핀 사이에서 어느 핀인지 헷갈립니다. */
const LEADER_LENGTH = 22;
/** 선택한 핀은 1.2배로 커져 반지름이 약 16px 입니다. */
const SELECTED_MARKER_RADIUS = 16;
const CALLOUT_BORDER_WIDTH = 2;

/**
 * 오버레이 기준점(핀 중심)에서 태그를 띄웁니다.
 *
 * 연결선 길이와 핀 반지름만큼 아래 여백을 두어 선 끝이 핀 윗부분에 닿게 합니다.
 */
export const anchor = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  paddingBottom: `${LEADER_LENGTH + SELECTED_MARKER_RADIUS}px`,

  animation: `${popUp} 140ms ease`,
});

/**
 * 러닝 코스 포스터의 장소 태그처럼 칸을 선으로 나눈 라벨입니다.
 * 라임 바탕에 검은 선·그림자로 서비스의 전단지 톤과 맞춥니다.
 */
export const callout = style({
  position: "relative",

  display: "flex",
  flexDirection: "column",

  width: CALLOUT_WIDTH,

  color: vars.color.black,
  backgroundColor: vars.color.primary400,
  border: `${CALLOUT_BORDER_WIDTH}px solid ${vars.color.black}`,
  boxShadow: `3px 3px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",

  // 핀까지 내려가는 연결선. 포스터의 지시선처럼 곧은 선으로 잇습니다.
  selectors: {
    "&::after": {
      content: '""',

      position: "absolute",
      left: "50%",
      // 절대 위치 기준이 테두리 안쪽이라 테두리 두께만큼 더 내립니다.
      bottom: `-${LEADER_LENGTH + CALLOUT_BORDER_WIDTH}px`,

      width: "2px",
      height: `${LEADER_LENGTH}px`,

      transform: "translateX(-50%)",

      backgroundColor: vars.color.black,
    },
  },
});

export const headerRow = style({
  display: "flex",
  alignItems: "stretch",

  borderBottom: LINE,
});

/** 핀과 같은 색·번호의 칸. 어느 핀의 정보인지 바로 이어 줍니다. */
export const order = style([
  typo.body7,
  {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",

    width: "30px",

    borderRight: LINE,
  },
]);

export const title = style([
  typo.body4,
  {
    flex: "1 1 auto",
    minWidth: 0,
    margin: 0,
    padding: "5px 6px",

    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",

    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
]);

export const closeButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",

  width: "26px",
  minHeight: "26px",

  color: vars.color.black,
  borderLeft: LINE,

  selectors: {
    "&:focus-visible": {
      outline: `3px solid ${vars.color.secondary500}`,
      outlineOffset: "-3px",
    },
  },
});

export const closeIcon = style({
  display: "block",
  width: "8px",
  height: "8px",
});

globalStyle(`${closeIcon} path`, {
  stroke: "currentColor",
});

export const metaRow = style([
  typo.detail1,
  {
    margin: 0,
    padding: "5px 8px",

    fontSize: "12px",
    wordBreak: "keep-all",

    borderBottom: LINE,
  },
]);

/** 흐림 효과가 칸 아래 선까지 지우지 않도록 선은 바깥에서 긋습니다. */
export const addressRow = style({
  borderBottom: LINE,
});

const ADDRESS_FADE =
  "linear-gradient(to right, #000 calc(100% - 24px), transparent)";

/**
 * 주소는 한 줄로 두고, 넘치면 옆으로 밀어 봅니다. 태그가 작아 스크롤바는
 * 숨기고, 뒤에 글자가 더 있을 때만 오른쪽 끝을 흐리게 합니다.
 */
export const addressScroller = style([
  typo.detail1,
  {
    padding: "5px 8px",

    fontSize: "12px",
    whiteSpace: "nowrap",

    overflowX: "auto",
    overflowY: "hidden",
    overscrollBehaviorX: "contain",
    scrollbarWidth: "none",

    selectors: {
      '&[data-has-more="true"]': {
        maskImage: ADDRESS_FADE,
        WebkitMaskImage: ADDRESS_FADE,
      },
      "&:focus-visible": {
        outline: `3px solid ${vars.color.secondary500}`,
        outlineOffset: "-3px",
      },
    },
  },
]);

globalStyle(`${addressScroller}::-webkit-scrollbar`, {
  display: "none",
});

export const priceRow = style([
  typo.body8,
  {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4px",

    padding: "5px 8px",

    borderBottom: LINE,
  },
]);

/** 루트 카드의 "절약" 칸과 같은 분홍입니다. */
export const savingChip = style([
  typo.detail2,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",

    padding: "1px 5px",

    backgroundColor: vars.color.secondary100,
    border: `1px solid ${vars.color.black}`,
  },
]);

export const linkRow = style({
  display: "flex",

  backgroundColor: vars.color.cream,
});

export const link = style([
  typo.body7,
  {
    display: "flex",
    flex: "1 1 0",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",

    // 지도 위 작은 라벨이라도 손가락으로 누를 만큼은 둡니다.
    minHeight: "38px",

    color: vars.color.black,
    textDecoration: "none",

    selectors: {
      "&:not(:first-child)": {
        borderLeft: LINE,
      },
      "&:active": {
        backgroundColor: vars.color.primary300,
      },
      "&:focus-visible": {
        outline: `3px solid ${vars.color.secondary500}`,
        outlineOffset: "-3px",
      },
    },
  },
]);

/**
 * 링크·절약 칩의 화살표. 굵은 글자 옆에서 가늘어 보이지 않게 컴포넌트에서
 * 선 굵기(strokeWidth)를 올립니다.
 */
export const arrowIcon = style({
  display: "block",
  flexShrink: 0,

  width: "12px",
  height: "12px",
});
