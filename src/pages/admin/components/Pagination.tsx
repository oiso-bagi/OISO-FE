import * as styles from "./ui.css";

interface PaginationProps {
  /** 1부터 시작 */
  page: number;
  size: number;
  totalCount: number;
  onChange: (page: number) => void;
}

/** 현재 페이지 주변만 노출합니다. 페이지가 많아도 컨트롤 폭이 일정합니다. */
const VISIBLE_RANGE = 2;

const buildPageNumbers = (page: number, totalPages: number) => {
  const start = Math.max(1, page - VISIBLE_RANGE);
  const end = Math.min(totalPages, page + VISIBLE_RANGE);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export function Pagination({
  page,
  size,
  totalCount,
  onChange,
}: PaginationProps) {
  /**
   * `size` 가 0 이면 `totalPages` 가 Infinity 가 되어 "다음 페이지" 가 영원히
   * 활성 상태로 남고, 행 범위도 "137건 중 1–0" 처럼 깨집니다. 양의 정수로 맞춥니다.
   */
  const safeSize = Number.isFinite(size) ? Math.max(1, Math.floor(size)) : 1;
  const totalPages = Math.max(1, Math.ceil(totalCount / safeSize));

  /** 범위 밖 `page` 가 들어오면 행 범위와 활성 표시가 어긋납니다. */
  const safePage = Number.isFinite(page)
    ? Math.min(Math.max(1, Math.floor(page)), totalPages)
    : 1;

  const firstRow = totalCount === 0 ? 0 : (safePage - 1) * safeSize + 1;
  const lastRow = Math.min(safePage * safeSize, totalCount);

  return (
    <div className={styles.pagination}>
      <span className={styles.paginationInfo}>
        {totalCount.toLocaleString("ko-KR")}건 중{" "}
        {firstRow.toLocaleString("ko-KR")}–{lastRow.toLocaleString("ko-KR")}
      </span>

      <div className={styles.paginationControls}>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onChange(safePage - 1)}
          disabled={safePage <= 1}
          aria-label="이전 페이지"
        >
          «
        </button>

        {buildPageNumbers(safePage, totalPages).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={styles.pageButton}
            onClick={() => onChange(pageNumber)}
            aria-current={pageNumber === safePage ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onChange(safePage + 1)}
          disabled={safePage >= totalPages}
          aria-label="다음 페이지"
        >
          »
        </button>
      </div>
    </div>
  );
}
