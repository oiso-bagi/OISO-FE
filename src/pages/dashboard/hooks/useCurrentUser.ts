import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/shared/api/userApi";
import { queryKeys } from "@/shared/query/queryKeys";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.user.me,
    queryFn: getCurrentUser,
  });
};
