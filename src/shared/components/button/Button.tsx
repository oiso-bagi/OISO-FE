import type {
  ButtonHTMLAttributes,
  CSSProperties,
  PropsWithChildren,
} from "react";
import * as styles from "./Button.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    width?: string;
  }
>;

export function Button({
  children,
  className,
  style,
  variant = "primary",
  width,
  ...props
}: ButtonProps) {
  const buttonStyle = {
    "--button-width": width,
    ...style,
  } as CSSProperties;

  return (
    <button
      className={`${styles.button} ${styles.variant[variant]} ${className ?? ""}`}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
}
