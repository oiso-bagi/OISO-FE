import { http } from "@/shared/api/http";

import type { HomeSummaryResponse } from "./types/home";

// TODO(확인 필요): 홈 요약 엔드포인트 경로. 우선 GET /home 으로 가정.
export const getHomeSummary = async () => {
  return http.get<HomeSummaryResponse>("/home");
};
