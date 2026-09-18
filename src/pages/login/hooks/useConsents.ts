import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getConsentStatus, postConsents } from "@/shared/api/consentApi";
import type { SubmitConsentRequestDto } from "@/shared/api/generated/types";
import { queryKeys } from "@/shared/query/queryKeys";

interface ConsentStatusOptions {
  /**
   * 받아 둔 동의 상태가 있을 때 화면에 들어오면서 다시 받을지.
   *
   * - `"always"`: 로그인 직후 분기처럼 서버의 최신 상태로 판단해야 할 때
   * - `true`(기본): 받은 지 오래됐을 때만 (약관 화면)
   * - `false`: 받아 둔 값을 그대로 씀 (서비스 화면 진입 확인)
   *
   * 로그인 직후 홈이나 약관 화면으로 넘어가거나 설문을 오갈 때, 방금 받은
   * 동의 상태를 또 요청하지 않도록 나눴습니다. 동의는 약관 화면에서만 바뀌고
   * 그때 캐시도 함께 갱신합니다.
   */
  refetchOnMount?: boolean | "always";
}

export const useConsentStatus = (
  isEnabled: boolean,
  { refetchOnMount = true }: ConsentStatusOptions = {},
) => {
  return useQuery({
    queryKey: queryKeys.consent.status,
    queryFn: getConsentStatus,
    enabled: isEnabled,
    refetchOnMount,
  });
};

export const useSubmitConsents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SubmitConsentRequestDto) => postConsents(request),
    onSuccess: (consentStatus) => {
      queryClient.setQueryData(queryKeys.consent.status, consentStatus);
    },
  });
};
