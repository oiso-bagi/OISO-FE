import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";

import { restoreAuthSession } from "@/shared/api/authApi";
import { AuthContext, type AuthStatus } from "@/shared/auth/authContext";

export function AuthProvider({ children }: PropsWithChildren) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    let isActive = true;

    restoreAuthSession()
      .then((isAuthenticated) => {
        if (!isActive) return;

        setAuthStatus(isAuthenticated ? "authenticated" : "unauthenticated");
      })
      .catch(() => {
        if (isActive) setAuthStatus("unauthenticated");
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={authStatus}>{children}</AuthContext.Provider>
  );
}
