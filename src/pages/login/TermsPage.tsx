import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CURRENT_CONSENT_VERSION } from "@/shared/api/consentApi";
import type { ConsentItemResponse } from "@/shared/api/generated/types";
import { useAuthStatus } from "@/shared/auth/authContext";
import { Card } from "@/shared/components/Card";
import { Header } from "@/shared/components/header/Header";
import { useToast } from "@/shared/components/Toast/toastContext";
import CheckIcon from "@/shared/icons/check.svg?react";
import { prepareSurveyOnboarding } from "@/shared/lib/onboardingFlow";
import { pageContent } from "@/shared/styles/layout.css";

import { useConsentStatus, useSubmitConsents } from "./hooks/useConsents";
import * as styles from "./TermsPage.css";

type AgreementKey =
  "termsOfService" | "privacy" | "overFourteen" | "marketing" | "location";

type Agreement = {
  key: AgreementKey;
  label: string;
  isRequired: boolean;
};

const agreements: Agreement[] = [
  { key: "termsOfService", label: "이용약관", isRequired: true },
  { key: "privacy", label: "개인정보 수집·이용", isRequired: true },
  { key: "overFourteen", label: "만 14세 이상", isRequired: true },
  { key: "marketing", label: "마케팅 정보 수신", isRequired: false },
  { key: "location", label: "위치기반 서비스", isRequired: false },
];

const initialAgreementState: Record<AgreementKey, boolean> = {
  termsOfService: false,
  privacy: false,
  overFourteen: false,
  marketing: false,
  location: false,
};

const consentTypeToAgreementKey: Record<
  ConsentItemResponse["type"],
  AgreementKey
> = {
  TERMS: "termsOfService",
  PRIVACY: "privacy",
  AGE: "overFourteen",
  MARKETING: "marketing",
  LOCATION: "location",
};

export function TermsPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const authStatus = useAuthStatus();
  const [checked, setChecked] = useState(initialAgreementState);
  const consentStatusQuery = useConsentStatus(authStatus === "authenticated");
  const submitConsentsMutation = useSubmitConsents();

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      showToast({
        message: "로그인 정보를 확인하지 못했어요. 다시 로그인해 주세요.",
      });
      navigate("/login", { replace: true });
    }

    if (authStatus === "error") {
      showToast({
        message: "로그인 상태를 확인하지 못했어요.",
        actionLabel: "다시 시도",
        onAction: () => window.location.reload(),
      });
    }
  }, [authStatus, navigate, showToast]);

  useEffect(() => {
    if (!consentStatusQuery.data) return;

    const nextChecked = { ...initialAgreementState };

    consentStatusQuery.data.consents.forEach((consent) => {
      nextChecked[consentTypeToAgreementKey[consent.type]] = consent.isAgreed;
    });

    setChecked(nextChecked);
  }, [consentStatusQuery.data]);

  useEffect(() => {
    if (!consentStatusQuery.isError) return;

    showToast({
      message: "약관 동의 상태를 불러오지 못했어요. 다시 시도해 주세요.",
    });
  }, [consentStatusQuery.isError, showToast]);

  const isAllchecked = agreements.every(({ key }) => checked[key]);
  const isRequiredChecked = agreements
    .filter(({ isRequired }) => isRequired)
    .every(({ key }) => checked[key]);

  const handleAllChange = () => {
    const shouldCheckAll = !isAllchecked;

    setChecked({
      termsOfService: shouldCheckAll,
      privacy: shouldCheckAll,
      overFourteen: shouldCheckAll,
      marketing: shouldCheckAll,
      location: shouldCheckAll,
    });
  };

  const handleAgreementChange = (key: AgreementKey) => {
    setChecked((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSubmit = () => {
    if (!isRequiredChecked) return;

    submitConsentsMutation.mutate(
      {
        version: CURRENT_CONSENT_VERSION,
        terms: checked.termsOfService,
        privacy: checked.privacy,
        age: checked.overFourteen,
        marketing: checked.marketing,
        location: checked.location,
      },
      {
        onSuccess: () => {
          if (!prepareSurveyOnboarding()) {
            showToast({
              message: "설문 상태를 준비하지 못했어요. 다시 시도해 주세요.",
            });
            return;
          }

          navigate("/survey");
        },
        onError: () => {
          showToast({
            message: "약관 동의를 저장하지 못했어요. 다시 시도해 주세요.",
          });
        },
      },
    );
  };

  const isInteractionDisabled =
    authStatus !== "authenticated" ||
    consentStatusQuery.isPending ||
    consentStatusQuery.isError ||
    submitConsentsMutation.isPending;

  return (
    <main className={styles.page}>
      <Header backTo="/login" title="약관 동의" />

      <section
        className={`${pageContent} ${styles.content}`}
        aria-label="서비스 이용 약관"
      >
        <Card className={styles.allAgreement}>
          <label className={styles.allAgreementLabel}>
            <input
              className={styles.hiddenCheckbox}
              type="checkbox"
              checked={isAllchecked}
              disabled={isInteractionDisabled}
              onChange={handleAllChange}
            />
            <span className={styles.checkbox} aria-hidden="true">
              {isAllchecked && <CheckIcon className={styles.checkIcon} />}
            </span>
            <span>전체 동의합니다</span>
          </label>
        </Card>

        <Card className={styles.agreementBox}>
          {agreements.map(({ key, label, isRequired }, index) => (
            <div
              key={key}
              className={
                index === 3
                  ? `${styles.agreementRow} ${styles.optionalDivider}`
                  : styles.agreementRow
              }
            >
              <label className={styles.agreementLabel}>
                <input
                  className={styles.hiddenCheckbox}
                  type="checkbox"
                  checked={checked[key]}
                  disabled={isInteractionDisabled}
                  onChange={() => handleAgreementChange(key)}
                />
                <span className={styles.checkbox} aria-hidden="true">
                  {checked[key] && <CheckIcon className={styles.checkIcon} />}
                </span>
                <span>{label}</span>
              </label>

              <div className={styles.agreementActions}>
                <span
                  className={
                    isRequired
                      ? `${styles.typeBadge} ${styles.requiredBadge}`
                      : styles.typeBadge
                  }
                >
                  {isRequired ? "필수" : "선택"}
                </span>
                <button
                  type="button"
                  className={styles.viewButton}
                  aria-label={`${label} 내용 보기`}
                >
                  보기
                </button>
              </div>
            </div>
          ))}
        </Card>
      </section>

      <div className={`${pageContent} ${styles.submitArea}`}>
        <button
          type="button"
          className={styles.submitButton}
          disabled={isInteractionDisabled || !isRequiredChecked}
          onClick={handleSubmit}
        >
          {submitConsentsMutation.isPending
            ? "저장 중..."
            : "동의하고 시작하기"}
        </button>
      </div>
    </main>
  );
}
