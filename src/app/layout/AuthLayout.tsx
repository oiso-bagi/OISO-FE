import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
