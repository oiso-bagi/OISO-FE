import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postLogout } from "@/shared/api/authApi";
import { clearAccessToken } from "@/shared/auth/accessToken";
import { resetOnboardingFlow } from "@/shared/lib/onboardingFlow";
import { clearRecommendationConditions } from "@/shared/lib/recommendationConditions";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      clearAccessToken();
      queryClient.clear();
      resetOnboardingFlow();
      // 같은 기기에서 다음에 로그인한 사람이 이전 사용자의 조건으로 추천받지 않게 합니다.
      clearRecommendationConditions();
      window.location.replace("/login");
    },
  });
};
