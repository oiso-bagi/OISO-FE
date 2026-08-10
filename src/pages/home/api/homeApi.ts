import { http } from "@/shared/api/http";
import type { HomeSummaryResponseDto } from "@/shared/api/generated/schema";

import { toHomeSummary } from "./mappers/home";

export const getHomeSummary = async () => {
  const response = await http.get<HomeSummaryResponseDto>("/home");

  return toHomeSummary(response);
};
