import type {
  SavingsDashboardResponseDto,
  SavingsHistoriesPageResponseDto,
} from "@/shared/api/generated/types";

import { http } from "./http";

export const getSavingsDashboard = () => {
  return http.get<SavingsDashboardResponseDto>("/dashboard/savings");
};

interface GetSavingsHistoriesParams {
  page: number;
  size: number;
}

export const getSavingsHistories = ({
  page,
  size,
}: GetSavingsHistoriesParams) => {
  return http.get<SavingsHistoriesPageResponseDto>(
    "/dashboard/savings/histories",
    { params: { page, size } },
  );
};
