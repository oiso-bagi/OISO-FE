import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  getSavingsDashboard,
  getSavingsHistories,
} from "@/shared/api/dashboardApi";
import { queryKeys } from "@/shared/query/queryKeys";

const SAVINGS_HISTORY_PAGE_SIZE = 10;

export const useSavingsDashboard = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.savings,
    queryFn: getSavingsDashboard,
  });
};

export const useSavingsHistories = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.dashboard.histories(SAVINGS_HISTORY_PAGE_SIZE),
    queryFn: ({ pageParam }) =>
      getSavingsHistories({
        page: pageParam,
        size: SAVINGS_HISTORY_PAGE_SIZE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
};
