import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { installAuthInterceptor } from "@/shared/auth/installAuthInterceptor";
import { installChunkReload } from "@/shared/lib/installChunkReload";
import { installAnalytics } from "@/shared/lib/analytics";
import { router } from "@/app/router/router";
import { App } from "@/app/App";

import "@/shared/styles/global.css.ts";

installAuthInterceptor();
installChunkReload();
installAnalytics(router);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
