import type { CSSProperties } from "react";

import * as styles from "./CountUpAmount.css";

/** 0~9 를 몇 바퀴 굴릴지. 바퀴가 많을수록 오래 굴러갑니다. */
const CYCLE_COUNT = 3;

/** 한 바퀴에 들어가는 숫자 칸 */
const CELLS_PER_CYCLE = 10;

/** 띠에 쌓을 숫자 목록. 자리마다 같은 띠를 씁니다. */
const REEL_DIGITS = Array.from(
  { length: CYCLE_COUNT * CELLS_PER_CYCLE },
  (_, index) => index % CELLS_PER_CYCLE,
);

/** 왼쪽 자리부터 순서대로 착지하도록 자리마다 늦추는 시간(초) */
const STAGGER_SECONDS = 0.07;

interface CountUpAmountProps {
  /** 표시할 최종 금액. 세 자리마다 쉼표를 넣어 보여 줍니다. */
  value: number;
  /** 숫자 앞에 붙는 기호. 예: "₩" */
  prefix?: string;
  /** 숫자 뒤에 붙는 단위. 빈 문자열이면 표시하지 않습니다. */
  unit?: string;
  className?: string;
}

/**
 * 0 에서 시작해 최종 금액까지 굴러 올라가는 숫자.
 *
 * 글자 크기와 색은 바깥에서 정합니다. 이동 거리를 `em` 으로 잡아 두었으니
 * `className` 으로 `font-size` 만 주면 그에 맞춰 따라옵니다.
 */
export function CountUpAmount({
  value,
  prefix = "",
  unit = "원",
  className,
}: CountUpAmountProps) {
  const text = value.toLocaleString("ko-KR");

  // 쉼표는 굴리지 않으므로 숫자에만 순번을 매겨 지연 시간을 계산합니다.
  let digitOrder = 0;

  return (
    <span
      className={className ? `${styles.amount} ${className}` : styles.amount}
    >
      <span className={styles.srOnly}>{`${prefix}${text}${unit}`}</span>

      {prefix && (
        <span className={styles.staticCell} aria-hidden="true">
          {prefix}
        </span>
      )}

      {[...text].map((character, index) => {
        if (character === ",") {
          return (
            <span key={index} className={styles.staticCell} aria-hidden="true">
              {character}
            </span>
          );
        }

        const delaySeconds = digitOrder * STAGGER_SECONDS;
        digitOrder += 1;

        // 마지막 바퀴의 해당 숫자에서 멈춥니다.
        const stop = (CYCLE_COUNT - 1) * CELLS_PER_CYCLE + Number(character);

        return (
          <span
            key={index}
            className={styles.digitWindow}
            style={{ "--reel-stop": stop } as CSSProperties}
            aria-hidden="true"
          >
            <span
              className={styles.digitStrip}
              style={{ animationDelay: `${delaySeconds}s` }}
            >
              {REEL_DIGITS.map((digit, cellIndex) => (
                <span key={cellIndex} className={styles.digitCell}>
                  {digit}
                </span>
              ))}
            </span>
          </span>
        );
      })}

      {unit && (
        <span className={styles.staticCell} aria-hidden="true">
          {unit}
        </span>
      )}
    </span>
  );
}
