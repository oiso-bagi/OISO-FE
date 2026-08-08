import type { CurrentUserResponseDto } from "@/shared/api/generated/types";

import { http } from "./http";

export const getCurrentUser = () => {
  return http.get<CurrentUserResponseDto>("/me");
};
