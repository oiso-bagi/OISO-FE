import type { ReactNode } from "react";

import * as styles from "./ui.css";

export interface DataTableColumn<T> {
  /** 컬럼 식별자. React key 로도 사용합니다. */
  key: string;
  header: ReactNode;
  /** 셀 렌더링. 문자열만 필요하면 그대로 반환하면 됩니다. */
  render: (row: T) => ReactNode;
  /** 숫자 컬럼이면 우측 정렬 + 등폭 숫자 */
  numeric?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** 각 행의 고유 키 */
  getRowId: (row: T) => string;
  isPending?: boolean;
  isError?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
}

/**
 * 관리자 목록 공통 테이블.
 *
 * 로딩·에러·빈 상태를 한곳에서 처리해, 화면마다 같은 분기를 반복하지 않도록
 * 합니다. 정렬·선택 기능은 필요해지는 시점에 추가합니다.
 */
export function DataTable<T>({
  columns,
  rows,
  getRowId,
  isPending = false,
  isError = false,
  errorMessage = "목록을 불러오지 못했어요.",
  emptyMessage = "표시할 항목이 없어요.",
}: DataTableProps<T>) {
  const stateMessage = isPending
    ? "불러오는 중…"
    : isError
      ? errorMessage
      : rows.length === 0
        ? emptyMessage
        : null;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className={`${styles.th} ${column.numeric ? styles.numericHeader : ""}`}
              style={column.width ? { width: column.width } : undefined}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {stateMessage ? (
          <tr>
            <td className={styles.tableStateCell} colSpan={columns.length}>
              {stateMessage}
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={getRowId(row)}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`${styles.td} ${column.numeric ? styles.numericCell : ""}`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
