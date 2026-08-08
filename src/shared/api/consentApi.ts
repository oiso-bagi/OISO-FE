import type {
  ConsentStatusResponseDto,
  SubmitConsentRequestDto,
} from "@/shared/api/generated/types";

import { http } from "./http";

export const CURRENT_CONSENT_VERSION = "v1.0.0";

export const getConsentStatus = () => {
  return http.get<ConsentStatusResponseDto>("/consents");
};

export const submitConsents = (request: SubmitConsentRequestDto) => {
  return http.post<ConsentStatusResponseDto>("/consents", request);
};
