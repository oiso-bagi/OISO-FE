import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postLogout } from "@/shared/api/authApi";
import { clearAccessToken } from "@/shared/auth/accessToken";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      clearAccessToken();
      queryClient.clear();
      // 설문 조건은 지우지 않습니다. 사용자별로 저장해 다시 로그인하면 이어 씁니다.
      window.location.replace("/login");
    },
  });
};
