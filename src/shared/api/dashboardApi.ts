import type { SavingsDashboardResponseDto } from "@/shared/api/generated/types";

import { http } from "./http";

export const getSavingsDashboard = () => {
  return http.get<SavingsDashboardResponseDto>("/dashboard/savings");
};
