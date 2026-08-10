import { http } from "@/shared/api/http";

import { toHomeSummary } from "./mappers/home";
import type { HomeSummaryResponseDto } from "@/shared/api/generated/schema";

export const getHomeSummary = async () => {
  const response = await http.get<HomeSummaryResponseDto>("/home");

  return toHomeSummary(response);
};
