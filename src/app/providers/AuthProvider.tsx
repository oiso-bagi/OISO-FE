import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { restoreAuthSession } from "@/shared/api/authApi";
import type { AuthStatus } from "@/shared/auth/auth.types";
import { AuthContext } from "@/shared/auth/authContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    let isActive = true;

    restoreAuthSession()
      .then((isAuthenticated) => {
        if (!isActive) return;

        setAuthStatus(isAuthenticated ? "authenticated" : "unauthenticated");
      })
      .catch(() => {
        if (isActive) setAuthStatus("error");
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={authStatus}>{children}</AuthContext.Provider>
  );
}
