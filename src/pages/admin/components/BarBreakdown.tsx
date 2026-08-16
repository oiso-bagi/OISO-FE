import * as styles from "./ui.css";

export interface BarBreakdownItem {
  key: string;
  label: string;
  amountWon: number;
  /** 0~1. 서버가 계산해 내려주는 값을 그대로 씁니다. */
  ratio: number;
}

interface BarBreakdownProps {
  title: string;
  items: BarBreakdownItem[];
  isPending?: boolean;
  isError?: boolean;
}

const formatWon = (won: number) =>
  `${Math.round(won / 10000).toLocaleString("ko-KR")}만원`;

const formatRatio = (ratio: number) => `${Math.round(ratio * 100)}%`;

/**
 * 항목별 비중을 가로 막대로 보여줍니다.
 *
 * 항목이 두세 개뿐이고 축·범례·툴팁이 필요 없어 차트 라이브러리를 쓰지
 * 않았습니다. 관리자 화면은 lazy 로 분리돼 있지만, 라이브러리를 넣으면
 * 그만큼 관리자 청크가 커지고 각진 디자인에 맞추는 재정의도 따라붙습니다.
 */
export function BarBreakdown({
  title,
  items,
  isPending,
  isError,
}: BarBreakdownProps) {
  const stateMessage = isPending
    ? "불러오는 중…"
    : isError
      ? "집계를 불러오지 못했어요."
      : items.length === 0
        ? "표시할 집계가 없어요."
        : null;

  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.sectionBody}>
        {stateMessage ? (
          <p className={styles.cellMuted}>{stateMessage}</p>
        ) : (
          items.map((item) => (
            <div key={item.key} className={styles.barRow}>
              <span className={styles.barLabel}>{item.label}</span>

              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  // 비중은 데이터라 인라인 스타일로 둡니다.
                  style={{
                    width: `${Math.min(100, Math.max(0, item.ratio * 100))}%`,
                  }}
                />
              </div>

              <span className={styles.barValue}>
                {formatWon(item.amountWon)} · {formatRatio(item.ratio)}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
