import { useQuery } from "@tanstack/react-query";

import { getSavingsDashboard } from "@/shared/api/dashboardApi";
import { queryKeys } from "@/shared/query/queryKeys";

export const useSavingsDashboard = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.savings,
    queryFn: getSavingsDashboard,
  });
};
