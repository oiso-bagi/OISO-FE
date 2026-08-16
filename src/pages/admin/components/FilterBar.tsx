import type { ReactNode } from "react";

import * as styles from "./ui.css";

export interface FilterSelect {
  /** 상태 갱신 시 구분용 키 */
  key: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  selects?: FilterSelect[];
  /** 우측에 붙일 액션. 예: [+ 신규 등록] */
  action?: ReactNode;
}

/** 검색어 + 셀렉트 필터 조합. 목록 화면 상단에 공통으로 씁니다. */
export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "검색",
  selects = [],
  action,
}: FilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <input
        type="search"
        className={styles.searchInput}
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
      />

      {selects.map((select) => (
        <select
          key={select.key}
          className={styles.select}
          value={select.value}
          onChange={(event) => select.onChange(event.target.value)}
          aria-label={select.label}
        >
          {select.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}

      {action && (
        <>
          <span className={styles.filterSpacer} />
          {action}
        </>
      )}
    </div>
  );
}
