import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import * as typo from "@/shared/styles/typography.css";

/** 상단 지도 고정 + 하단 리스트 스크롤 (고정 분할) */
export const page = style({
  display: "flex",
  flexDirection: "column",

  // 하단 네비(72px) + 홈 인디케이터 영역 제외한 높이
  height: "calc(100dvh - 72px - env(safe-area-inset-bottom, 0px))",
});

export const mapArea = style({
  flex: "0 0 auto",

  /**
   * 시안보다 크게 — 지도가 화면의 약 45%.
   *
   * 부모(`page`)가 `dvh` 기준인데 여기만 `vh` 였습니다. 모바일에서 주소창이
   * 보이면 `vh` 는 주소창이 숨은 큰 뷰포트를 쓰므로 지도가 부모보다 큰 비율을
   * 차지해 아래 목록이 눌립니다. 단위를 부모와 맞춥니다.
   */
  height: "45dvh",
  minHeight: "260px",

  width: "100%",

  // 지도 영역 위아래 구분선
  borderBlock: `2.5px solid ${vars.color.black}`,

  boxSizing: "border-box",
});

export const listArea = style({
  flex: "1 1 auto",
  minHeight: 0,

  overflowY: "auto",
  paddingInline: vars.space.md,
});

/** 루트 카드 목록. 추천 배지가 카드 위로 튀어나오므로 세로 간격을 넉넉히 둡니다. */
export const routeList = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",

  paddingBlock: "10px",
});

export const statusText = style([
  typo.body5,
  {
    paddingBlock: "40px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);

/** 카드를 펼쳤을 때 상세 조회 상태를 카드 안에 표시합니다. */
export const detailStatusText = style([
  typo.body9,
  {
    margin: 0,
    paddingBlock: "20px",

    color: vars.color.neutral500,
    textAlign: "center",
  },
]);
