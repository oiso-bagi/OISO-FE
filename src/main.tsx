import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { installAuthInterceptor } from "@/shared/auth/installAuthInterceptor";
import { installChunkReload } from "@/shared/lib/installChunkReload";
import { App } from "@/app/App";

import "@/shared/styles/global.css.ts";

installAuthInterceptor();
installChunkReload();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
