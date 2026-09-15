import type { ConsentItemResponse } from "@/shared/api/generated/types";

import type { Agreement, AgreementKey, AgreementState } from "./terms.types";

export const AGREEMENTS: Agreement[] = [
  {
    key: "termsOfService",
    slug: "terms-of-service",
    label: "이용약관",
    isRequired: true,
  },
  {
    key: "privacy",
    slug: "privacy",
    label: "개인정보 수집·이용",
    isRequired: true,
  },
  {
    key: "overFourteen",
    slug: "over-fourteen",
    label: "만 14세 이상",
    isRequired: true,
  },
  {
    key: "marketing",
    slug: "marketing",
    label: "마케팅 정보 수신",
    isRequired: false,
  },
  {
    key: "location",
    slug: "location",
    label: "위치기반 서비스",
    isRequired: false,
  },
];

export const INITIAL_AGREEMENT_STATE: AgreementState = {
  termsOfService: false,
  privacy: false,
  overFourteen: false,
  marketing: false,
  location: false,
};

export const CONSENT_TYPE_TO_AGREEMENT_KEY: Record<
  ConsentItemResponse["type"],
  AgreementKey
> = {
  TERMS: "termsOfService",
  PRIVACY: "privacy",
  AGE: "overFourteen",
  MARKETING: "marketing",
  LOCATION: "location",
};
