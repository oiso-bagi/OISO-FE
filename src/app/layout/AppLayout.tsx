import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components/BottomNavigation";

import * as styles from "./AppLayout.css";

export function AppLayout() {
  return (
    <div className={styles.appContainer}>
      <main className={styles.contentWithBottomNavigation}>
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
