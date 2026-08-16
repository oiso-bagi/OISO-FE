import type { ReactNode } from "react";

import * as styles from "./ui.css";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h2 className={styles.pageTitle}>{title}</h2>
        {description && <p className={styles.pageDescription}>{description}</p>}
      </div>

      {action}
    </div>
  );
}
