import { keyframes, style } from "@vanilla-extract/css";

/**
 * 자릿수 릴 애니메이션.
 *
 * 각 자리는 0~9 를 여러 바퀴 쌓아 둔 띠를 좁은 창으로 들여다보는 구조입니다.
 * 띠를 위로 밀어 올리면 숫자가 굴러 올라가고, 멈추는 위치만 `--reel-stop`
 * 으로 자리마다 다르게 주므로 keyframes 는 하나로 충분합니다.
 */

/** 창 높이 = 숫자 한 칸 높이. 이동 거리 계산의 기준입니다. */
const CELL_HEIGHT = "1.15em";

/** 멈출 칸의 인덱스. 컴포넌트에서 자리마다 인라인으로 넣어 줍니다. */
const STOP_VAR = "--reel-stop";

const roll = keyframes({
  "0%": {
    transform: "translateY(0)",
    filter: "blur(0)",
  },
  // 굴러가는 동안만 살짝 흐려 속도감을 줍니다.
  "12%": {
    filter: "blur(1.1px)",
  },
  "100%": {
    transform: `translateY(calc(var(${STOP_VAR}) * -${CELL_HEIGHT}))`,
    filter: "blur(0)",
  },
});

export const amount = style({
  position: "relative",

  display: "inline-flex",
  alignItems: "flex-start",

  lineHeight: 1,
  fontVariantNumeric: "tabular-nums",
});

/** 굴러가는 숫자는 읽어 줄 수 없으니 최종 금액을 따로 둡니다. */
export const srOnly = style({
  position: "absolute",

  width: "1px",
  height: "1px",

  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
});

export const digitWindow = style({
  display: "block",
  height: CELL_HEIGHT,
  overflow: "hidden",

  vars: {
    [STOP_VAR]: "0",
  },
});

export const digitStrip = style({
  display: "block",

  /**
   * 감속 곡선이 급하면 앞쪽에서 거리를 다 써 버려 순간이동처럼 보입니다.
   * ease-out-quad 정도로 두면 굴러가는 게 눈에 보입니다.
   *
   * 홈은 들어올 때마다 보는 화면이라 길면 거슬립니다. 마지막 자리까지 1초 안에
   * 끝나도록 잡았습니다.
   */
  animation: `${roll} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,

  // 모션 민감 사용자에겐 굴리지 않고 최종 숫자만 보여 줍니다.
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      transform: `translateY(calc(var(${STOP_VAR}) * -${CELL_HEIGHT}))`,
    },
  },
});

export const digitCell = style({
  display: "block",
  height: CELL_HEIGHT,
  lineHeight: CELL_HEIGHT,
});

/** 쉼표와 단위. 숫자 칸과 높이를 맞춰 밑선이 어긋나지 않게 합니다. */
export const staticCell = style({
  display: "block",
  height: CELL_HEIGHT,
  lineHeight: CELL_HEIGHT,
});
