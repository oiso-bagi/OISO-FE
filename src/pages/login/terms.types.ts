export type AgreementKey =
  "termsOfService" | "privacy" | "overFourteen" | "marketing" | "location";

export type AgreementSlug =
  "terms-of-service" | "privacy" | "over-fourteen" | "marketing" | "location";

export interface Agreement {
  key: AgreementKey;
  slug: AgreementSlug;
  label: string;
  isRequired: boolean;
}

export type AgreementState = Record<AgreementKey, boolean>;
