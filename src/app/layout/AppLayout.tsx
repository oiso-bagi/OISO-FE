import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components/BottomNavigation";

export function AppLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <BottomNavigation />
    </>
  );
}
