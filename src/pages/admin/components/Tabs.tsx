import { tabId, tabPanelId } from "../lib/tabIds";
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
  /** 같은 화면의 패널과 짝을 맞추기 위한 id 접두사 */
  idBase: string;
}

export function Tabs<TValue extends string>({
  items,
  value,
  onChange,
  label,
  idBase,
}: TabsProps<TValue>) {
  /**
   * 좌우 화살표·Home·End 로 탭을 옮깁니다.
   * 탭 목록은 Tab 키 한 번에 통과해야 하므로 활성 탭만 탭 순서에 남깁니다.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const current = items.findIndex((item) => item.value === value);

    const nextIndex =
      event.key === "ArrowRight"
        ? (current + 1) % items.length
        : event.key === "ArrowLeft"
          ? (current - 1 + items.length) % items.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? items.length - 1
              : -1;

    if (nextIndex === -1) return;

    event.preventDefault();

    const next = items[nextIndex];
    onChange(next.value);
    document.getElementById(tabId(idBase, next.value))?.focus();
  };

  return (
    <div className={styles.tabList} role="tablist" aria-label={label}>
      {items.map((item) => {
        const isSelected = item.value === value;

        return (
          <button
            key={item.value}
            id={tabId(idBase, item.value)}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={tabPanelId(idBase, item.value)}
            tabIndex={isSelected ? 0 : -1}
            className={styles.tab}
            onClick={() => onChange(item.value)}
            onKeyDown={handleKeyDown}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
