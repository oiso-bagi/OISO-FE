import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { installAuthInterceptor } from "@/shared/auth/installAuthInterceptor";
import { installChunkReload } from "@/shared/lib/installChunkReload";
import "@/shared/styles/global.css.ts";
import { App } from "@/app/App";

installAuthInterceptor();
installChunkReload();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
