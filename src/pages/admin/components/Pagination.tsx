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
  const totalPages = Math.max(1, Math.ceil(totalCount / size));

  const firstRow = totalCount === 0 ? 0 : (page - 1) * size + 1;
  const lastRow = Math.min(page * size, totalCount);

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
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="이전 페이지"
        >
          «
        </button>

        {buildPageNumbers(page, totalPages).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={styles.pageButton}
            onClick={() => onChange(pageNumber)}
            aria-current={pageNumber === page ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="다음 페이지"
        >
          »
        </button>
      </div>
    </div>
  );
}
