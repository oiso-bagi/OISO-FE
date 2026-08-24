import * as styles from "./BurstSticker.css";

/** 루트 추천 배지(`recommendBadge.svg`)의 4각 반짝이 도형 */
const BURST_PATH =
  "M1.49023 20.2618C11.9959 15.7458 15.6363 11.8902 15.4102 1.06177C24.8863 7.65904 29.6982 7.49736 37.4902 1.06177C37.4857 12.1669 40.2338 16.278 49.4902 20.2618C40.0117 25.0068 37.2298 29.1206 37.4902 39.4618C28.2823 32.0708 23.4923 32.6351 15.4102 39.4618C14.1365 27.3219 11.1804 23.016 1.49023 20.2618Z";

interface BurstStickerProps {
  /** 반짝이 안에 두 줄로 들어갑니다. 도형이 좁아 줄당 두 글자가 적당합니다. */
  topLine: string;
  bottomLine: string;
  className?: string;
}

/**
 * 추천 배지와 같은 모양의 스티커.
 *
 * 원본 SVG 는 "추천!" 글자가 패스로 박혀 있어 문구를 바꿀 수 없습니다. 도형만
 * 그대로 가져오고 글자는 텍스트로 얹습니다.
 */
export function BurstSticker({
  topLine,
  bottomLine,
  className,
}: BurstStickerProps) {
  return (
    <svg
      className={className ? `${styles.sticker} ${className}` : styles.sticker}
      viewBox="0 0 53 43"
      fill="none"
      role="img"
      aria-label={`${topLine}${bottomLine}`}
    >
      <path
        className={styles.shadow}
        d={BURST_PATH}
        transform="translate(2, 2)"
      />
      <path className={styles.shape} d={BURST_PATH} />

      <text className={styles.label} x="25.5" y="18.6" textAnchor="middle">
        {topLine}
      </text>
      <text className={styles.label} x="25.5" y="29.4" textAnchor="middle">
        {bottomLine}
      </text>
    </svg>
  );
}
