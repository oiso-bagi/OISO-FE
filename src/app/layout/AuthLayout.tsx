import { Outlet } from "react-router-dom";

import * as styles from "./AppLayout.css";

export function AuthLayout() {
  return (
    <div className={styles.appContainer}>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
