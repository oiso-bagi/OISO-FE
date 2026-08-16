import type { ComponentPropsWithRef } from "react";

import * as styles from "./ui.css";

type ButtonTone = keyof typeof styles.buttonTone;

/** React 19 에서 `ref` 는 일반 prop 이라 `ComponentPropsWithRef` 로 받습니다. */
interface ButtonProps extends ComponentPropsWithRef<"button"> {
  tone?: ButtonTone;
}

export function Button({
  tone = "neutral",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={`${styles.button} ${styles.buttonTone[tone]} ${className}`}
    />
  );
}
