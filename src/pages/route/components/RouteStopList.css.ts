import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

// 메인 컨테이너
export const stopSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",

  width: "100%",
  marginTop: "12px",
});

export const stopSectionTitle = style([
  typo.largeBody2,
  {
    margin: 0,

    color: vars.color.black,
  },
]);

export const stopEmptyText = style([
  typo.body9,
  {
    width: "100%",
    margin: 0,
    paddingBlock: "16px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);

export const dayGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",

  width: "100%",
});

export const dayLabel = style([
  typo.body4,
  {
    margin: 0,

    color: vars.color.black,
  },
]);

/** "경유지" 제목 바로 아래 첫 일차는 원래대로 여백 없이, 이후 일차만 위쪽 여백을 둡니다. */
export const dayLabelSpaced = style({
  marginTop: "12px",
});

export const stopList = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",

  width: "100%",
  margin: 0,
  padding: 0,

  listStyle: "none",
});

export const stopListItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

// 경유지 카드
export const stopBox = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",

  width: "100%",
  padding: "8px 8px",

  backgroundColor: vars.color.white,

  border: `1.5px solid ${vars.color.black}`,
  boxShadow: `2px 2px 0 0 ${vars.color.black}`,

  boxSizing: "border-box",
});

export const stopOrder = style([
  typo.detail2,
  {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",

    width: "18px",
    height: "18px",

    color: vars.color.black,
    backgroundColor: vars.color.primary500,

    border: `1px solid ${vars.color.black}`,

    boxSizing: "border-box",
  },
]);

export const stopContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",

  minWidth: 0,
});

export const stopName = style([
  typo.body7,
  {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    color: vars.color.black,
  },
]);

export const stopTagList = style({
  display: "flex",
  gap: "4px",

  minWidth: 0,
});

export const stopTag = style([
  typo.detail3,
  {
    padding: "2px 6px",

    color: vars.color.black,
    backgroundColor: vars.color.white,

    border: `1px solid ${vars.color.black}`,

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    boxSizing: "border-box",
  },
]);

// 경유지 사이 이동 정보 — ↓ 도보 8분
export const stopConnection = style([
  typo.body7,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",

    width: "100%",
    minHeight: "20px",

    color: vars.color.secondary500,
  },
]);

// 저장 버튼
/**
 * 저장 버튼.
 *
 * 이전에는 미저장 상태가 분홍 채움이라 이미 저장한 것처럼 보였습니다. 누를 수
 * 있는 상태를 라임 채움 + 튀어나온 그림자로 두고, 저장된 상태는 검정 채움 +
 * 눌린 모양으로 뒤집어 한눈에 갈리게 합니다. 테두리·그림자 굵기도 다이얼로그
 * 버튼과 맞췄습니다.
 */
/** 저장 버튼과 다음 행동 링크를 한 줄에 둡니다. */
export const saveRow = style({
  display: "flex",
  alignSelf: "center",
  alignItems: "center",
  gap: vars.space.xs,

  marginTop: "8px",
});

export const savedListLink = style([
  typo.detail2,
  {
    padding: "4px 2px",

    color: vars.color.neutral500,
    background: "none",
    border: 0,

    textDecoration: "underline",
    textUnderlineOffset: "3px",

    cursor: "pointer",
  },
]);

export const saveButton = style([
  typo.body7,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",

    minWidth: "84px",
    height: "34px",

    padding: "0 12px",

    color: vars.color.ink,
    backgroundColor: vars.color.primary500,

    border: `2px solid ${vars.color.black}`,
    boxShadow: `2px 2px 0 0 ${vars.color.black}`,

    cursor: "pointer",
    boxSizing: "border-box",

    selectors: {
      // 눌리는 느낌. 그림자만큼 밀어 넣습니다.
      "&:active:not(:disabled)": {
        transform: "translate(2px, 2px)",
        boxShadow: "none",
      },

      // 저장 완료: 색이 반전되고 그림자가 사라져 눌린 상태로 남습니다.
      '&[data-saved="true"]': {
        color: vars.color.white,
        backgroundColor: vars.color.black,
        boxShadow: "none",
        transform: "translate(2px, 2px)",
        cursor: "default",
      },

      // 저장 요청 중에만 흐려집니다. 저장 완료는 흐려지면 안 됩니다.
      '&:disabled:not([data-saved="true"])': {
        opacity: 0.5,
        cursor: "default",
      },
    },
  },
]);

export const saveIcon = style({
  display: "block",

  width: "16px",
  height: "16px",
});

/**
 * 두 아이콘 모두 `stroke="black"` 이 하드코딩돼 있어 글자색을 따라가게
 * 덮어씁니다.
 */
globalStyle(`${saveIcon} path`, {
  stroke: "currentColor",
});

/** 북마크는 이 크기에서 선만으로는 가늘어 보여 면까지 채웁니다. */
export const saveIconSolid = style({});

globalStyle(`${saveIconSolid} path`, {
  fill: "currentColor",
});
