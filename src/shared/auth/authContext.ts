import { createContext, useContext } from "react";

export type AuthStatus =
  "checking" | "authenticated" | "unauthenticated" | "error";

export const AuthContext = createContext<AuthStatus | null>(null);

export const useAuthStatus = () => {
  const authStatus = useContext(AuthContext);

  if (!authStatus) {
    throw new Error("useAuthStatus는 AuthProvider 안에서 사용해야 합니다.");
  }

  return authStatus;
};
