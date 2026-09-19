import { style } from "@vanilla-extract/css";

import { BOTTOM_NAV_TOTAL_HEIGHT } from "@/shared/styles/bottomNavigationSize";
import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

const TOP_BAR_HEIGHT = "56px";

/** 지도 크기 손잡이 높이 (`MapResizeHandle`) */
const RESIZE_HANDLE_HEIGHT = "22px";

/** 지도를 키워도 목록에 남겨 두는 높이. 경유지 카드 한 장은 보여야 합니다. */
const MIN_VISIBLE_LIST_HEIGHT = "160px";

/** 상단 바 + 지도 + 하단 리스트. 하단 네비 위 영역을 채웁니다. */
export const page = style({
  display: "flex",
  flexDirection: "column",

  backgroundColor: vars.color.bg,
});

export const topBar = style({
  // 스크롤해도 뒤로가기 버튼이 항상 보이게 상단 고정
  position: "sticky",
  top: 0,
  zIndex: 10,

  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: "8px",

  height: TOP_BAR_HEIGHT,
  paddingInline: vars.space.md,

  backgroundColor: vars.color.bg,
  borderBottom: `2.5px solid ${vars.color.black}`,
});

export const backButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",

  width: "32px",
  height: "32px",

  marginLeft: "-6px",

  background: "none",
  border: 0,

  cursor: "pointer",
});

export const backIcon = style({
  display: "block",

  width: "24px",
  height: "24px",
});

export const title = style([
  typo.title2,
  {
    minWidth: 0,

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    color: vars.color.black,
  },
]);

/** 일차 선택 탭 바 (다일 코스일 때만 노출) */
/**
 * 지도 + 크기 손잡이. 페이지는 통째로 스크롤되지만 이 영역은 상단 바 아래에
 * 붙어 있어, 목록을 내려 경유지를 골라도 지도 위 장소 정보와 고른 경유지가
 * 함께 보입니다. 목록은 이 아래로 지나갑니다.
 */
export const mapPanel = style({
  position: "sticky",
  top: TOP_BAR_HEIGHT,
  zIndex: 5,

  flexShrink: 0,

  backgroundColor: vars.color.bg,
});

/** 지도: 상단 고정 높이 (페이지 전체가 스크롤됨) */
export const mapArea = style({
  flexShrink: 0,

  height: "46dvh",
  minHeight: "280px",

  /**
   * 지도가 붙어 있어 목록은 지도 아래부터 하단 네비 위까지만 보입니다.
   * 손잡이로 키워도 목록 한 칸은 남깁니다. 작은 화면에서는 `minHeight` 가
   * 이깁니다.
   */
  maxHeight: `calc(100dvh - ${TOP_BAR_HEIGHT} - ${RESIZE_HANDLE_HEIGHT} - ${BOTTOM_NAV_TOTAL_HEIGHT} - ${MIN_VISIBLE_LIST_HEIGHT})`,

  // 손잡이로 조절하면 인라인 높이가 이 값을 덮어씁니다.

  borderBottom: `2.5px solid ${vars.color.black}`,
});

/** 경유지 리스트: 지도 아래로 흐르며 페이지와 함께 스크롤 */
export const listArea = style({
  paddingInline: vars.space.md,
  paddingBottom: vars.space.md,
});

export const statusText = style([
  typo.body5,
  {
    paddingBlock: "24px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);

export const listSkeleton = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",

  paddingTop: "10px",
});
