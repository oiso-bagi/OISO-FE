import { http } from "@/shared/api/http";

import { toHomeSummary } from "./mappers/home";
import type { ServerHomeSummary } from "./types/server/home";

export const getHomeSummary = async () => {
  const response = await http.get<ServerHomeSummary>("/home");

  return toHomeSummary(response);
};
