import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";

import { getHomeSummary } from "../api/homeApi";
import { USE_MOCK_HOME_DATA, getMockHomeSummary } from "../mocks/homeMocks";

export const useHomeSummary = () => {
  return useQuery({
    queryKey: queryKeys.home.summary(),
    queryFn: USE_MOCK_HOME_DATA
      ? async () => getMockHomeSummary()
      : getHomeSummary,
  });
};
