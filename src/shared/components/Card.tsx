import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

import * as styles from "./Card.css";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Card<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: CardProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={[styles.card, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
