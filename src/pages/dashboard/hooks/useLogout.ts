import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/shared/api/authApi";
import { clearAccessToken } from "@/shared/auth/accessToken";
import { resetOnboardingFlow } from "@/shared/lib/onboardingFlow";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAccessToken();
      queryClient.clear();
      resetOnboardingFlow();
      window.location.replace("/login");
    },
  });
};
