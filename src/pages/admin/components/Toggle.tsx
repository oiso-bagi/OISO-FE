import * as styles from "./ui.css";

interface ToggleProps {
  isOn: boolean;
  onChange: (next: boolean) => void;
  /** 스크린리더용 설명. 예: "홍길동 계정 활성" */
  label: string;
  isDisabled?: boolean;
}

/** 목록에서 상태를 즉시 전환하는 스위치. */
export function Toggle({ isOn, onChange, label, isDisabled }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={label}
      className={styles.toggle}
      disabled={isDisabled}
      onClick={() => onChange(!isOn)}
    >
      <span className={styles.toggleKnob} aria-hidden="true" />
    </button>
  );
}
