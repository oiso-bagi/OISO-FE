import type {
  SavingsDashboardResponseDto,
  SavingsHistoryDto,
} from "@/shared/api/generated/types";

import { http } from "./http";

export const getSavingsDashboard = () => {
  return http.get<SavingsDashboardResponseDto>("/dashboard/savings");
};

export interface SavingsHistoriesPageResponse {
  items: SavingsHistoryDto[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

interface GetSavingsHistoriesParams {
  page: number;
  size: number;
}

export const getSavingsHistories = ({
  page,
  size,
}: GetSavingsHistoriesParams) => {
  return http.get<SavingsHistoriesPageResponse>(
    "/dashboard/savings/histories",
    { params: { page, size } },
  );
};
