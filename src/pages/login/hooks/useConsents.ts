import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getConsentStatus, submitConsents } from "@/shared/api/consentApi";
import type { SubmitConsentRequestDto } from "@/shared/api/generated/types";
import { queryKeys } from "@/shared/query/queryKeys";

export const useConsentStatus = (isEnabled: boolean) => {
  return useQuery({
    queryKey: queryKeys.consent.status,
    queryFn: getConsentStatus,
    enabled: isEnabled,
  });
};

export const useSubmitConsents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SubmitConsentRequestDto) => submitConsents(request),
    onSuccess: (consentStatus) => {
      queryClient.setQueryData(queryKeys.consent.status, consentStatus);
    },
  });
};
