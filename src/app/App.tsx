import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router/router";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { ToastProvider } from "@/shared/components/Toast/ToastProvider";

export function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
