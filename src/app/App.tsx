import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router/router";
import { QueryProvider } from "@/app/providers/QueryProvider";

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
