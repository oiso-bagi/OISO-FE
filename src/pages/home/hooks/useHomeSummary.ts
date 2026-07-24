import { useQuery } from "@tanstack/react-query";

import { getHomeSummary } from "../api/homeApi";
import { USE_MOCK_HOME_DATA, mockHomeSummary } from "../mocks/homeMocks";

export const homeQueryKeys = {
  summary: () => ["home", "summary"] as const,
};

export const useHomeSummary = () => {
  return useQuery({
    queryKey: homeQueryKeys.summary(),
    queryFn: USE_MOCK_HOME_DATA ? async () => mockHomeSummary : getHomeSummary,
  });
};
