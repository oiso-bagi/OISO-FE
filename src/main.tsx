import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/shared/styles/global.css.ts";
import { App } from "@/app/App";
import { installAuthInterceptor } from "@/shared/auth/installAuthInterceptor";

installAuthInterceptor();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
