import * as styles from "./ui.css";

export interface TabItem<TValue extends string> {
  value: TValue;
  label: string;
}

interface TabsProps<TValue extends string> {
  items: readonly TabItem<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
  /** 스크린리더용 설명. 예: "콘텐츠 종류" */
  label: string;
}

export function Tabs<TValue extends string>({
  items,
  value,
  onChange,
  label,
}: TabsProps<TValue>) {
  return (
    <div className={styles.tabList} role="tablist" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.value === value}
          className={styles.tab}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
