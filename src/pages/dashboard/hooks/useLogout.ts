import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postLogout } from "@/shared/api/authApi";
import { clearAccessToken } from "@/shared/auth/accessToken";
import { clearRecommendationConditions } from "@/shared/lib/recommendationConditions";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      clearAccessToken();
      queryClient.clear();
      clearRecommendationConditions();
      window.location.replace("/login");
    },
  });
};
