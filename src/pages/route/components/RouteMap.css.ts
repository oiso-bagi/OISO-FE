import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

export const wrapper = style({
  position: "relative",

  width: "100%",
  height: "100%",

  backgroundColor: vars.color.bg,
  overflow: "hidden",
});

export const map = style({
  width: "100%",
  height: "100%",
});

/**
 * 지도 바탕을 눌러 우리 경로선·마커가 앞으로 나오게 합니다.
 *
 * 카카오맵은 구글맵·Mapbox 같은 지도 스타일 API 가 없어 타일 자체를 바꿀 수
 * 없습니다. 대신 타일이 DOM `img` 로 깔리므로 여기에만 필터를 겁니다.
 * 경로선(Polyline)과 마커(CustomOverlay div)는 `img` 가 아니라 영향받지 않습니다.
 *
 * 값을 세게 주면 도로 이름이 읽히지 않으니 채도만 덜어내는 선에서 멈춥니다.
 */
const TILE_FILTER = "saturate(0.4) brightness(1.05) contrast(0.94) sepia(0.1)";

globalStyle(`${map} img`, {
  filter: TILE_FILTER,
});

/**
 * 카카오 로고와 저작권 표기는 링크 안 이미지입니다. 이용약관상 가려지면 안 되니
 * 원래대로 둡니다.
 */
globalStyle(`${map} a img`, {
  filter: "none",
});

export const overlayText = style([
  typo.body5,
  {
    position: "absolute",
    inset: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    margin: 0,

    color: vars.color.neutral500,
    backgroundColor: vars.color.bg,
  },
]);

/** 지도 위 경유지 순번 마커 — 리스트 순번 배지와 톤 통일 */
export const marker = style([
  typo.detail2,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "24px",
    height: "24px",

    color: vars.color.black,
    backgroundColor: vars.color.primary500,

    border: `2px solid ${vars.color.black}`,

    boxSizing: "border-box",
  },
]);

/** 경로선 위에 얹는 구간 정보. 예: "도보 8분" */
export const pathLabel = style([
  typo.detail3,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: "3px",

    padding: "2px 6px",
    whiteSpace: "nowrap",

    color: vars.color.black,
    backgroundColor: vars.color.white,

    border: `2px solid ${vars.color.black}`,
    boxShadow: `1.5px 1.5px 0 ${vars.color.black}`,
  },
]);

export const pathLabelIcon = style({
  width: "12px",
  height: "12px",
  display: "block",
});

/** 구간 라벨 아이콘은 우리 UI 라 타일 필터에서 제외합니다. */
globalStyle(`${map} .${pathLabelIcon}`, {
  filter: "none",
});
