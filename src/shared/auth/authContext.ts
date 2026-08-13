import { createContext, useContext } from "react";

import type { AuthStatus } from "@/shared/auth/auth.types";

export const AuthContext = createContext<AuthStatus | null>(null);

export const useAuthStatus = () => {
  const authStatus = useContext(AuthContext);

  if (!authStatus) {
    throw new Error("useAuthStatus는 AuthProvider 안에서 사용해야 합니다.");
  }

  return authStatus;
};
