export type AgreementKey =
  "termsOfService" | "privacy" | "overFourteen" | "marketing" | "location";

export interface Agreement {
  key: AgreementKey;
  label: string;
  isRequired: boolean;
}

export type AgreementState = Record<AgreementKey, boolean>;
