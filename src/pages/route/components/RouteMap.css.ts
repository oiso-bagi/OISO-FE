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
 * 지도 바탕을 살짝 눌러 우리 경로선·마커가 앞으로 나오게 합니다.
 *
 * 카카오맵은 구글맵·Mapbox 같은 지도 스타일 API 가 없어 타일 자체를 바꿀 수
 * 없습니다. 대신 타일이 DOM `img` 로 깔리므로 여기에만 필터를 겁니다.
 * 경로선(Polyline)과 마커(CustomOverlay div)는 `img` 가 아니라 영향받지 않습니다.
 *
 * 채도를 크게 덜어내면 지도가 죽어 보이고 색조도 서비스와 겉돕니다. 도로가
 * 소리치지 않을 만큼만 덜어내고 색조는 건드리지 않습니다.
 */
const TILE_FILTER = "saturate(0.72) brightness(1.03) contrast(0.97)";

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

    width: "26px",
    height: "26px",
    borderRadius: "50%",

    color: vars.color.ink,
    backgroundColor: vars.color.primary500,

    /**
     * 흰 링이 마커 사이를 벌려 줍니다. 검은 테두리끼리 붙으면 여러 개가 한
     * 덩어리로 보여, 몰린 구간에서 개수를 셀 수 없었습니다.
     *
     * 바깥의 얇은 검은 선과 그림자는 밝은 지도 위에서 링이 묻히지 않게 합니다.
     */
    border: "3px solid #FFFFFF",
    boxShadow: "0 0 0 1.5px rgba(0, 0, 0, 0.45), 0 2px 5px rgba(0, 0, 0, 0.3)",

    boxSizing: "border-box",
  },
]);
