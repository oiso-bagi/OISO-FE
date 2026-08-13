import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CURRENT_CONSENT_VERSION } from "@/shared/api/consentApi";
import { useAuthStatus } from "@/shared/auth/authContext";
import { Header } from "@/shared/components/header/Header";
import { useToast } from "@/shared/components/Toast/toastContext";
import { prepareSurveyOnboarding } from "@/shared/lib/onboardingFlow";
import { pageContent } from "@/shared/styles/layout.css";

import { TermsAgreementForm } from "./components/TermsAgreementForm";
import { useAgreementSelection } from "./hooks/useAgreementSelection";
import { useConsentStatus, useSubmitConsents } from "./hooks/useConsents";
import * as styles from "./TermsPage.css";

export function TermsPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const authStatus = useAuthStatus();
  const consentStatusQuery = useConsentStatus(authStatus === "authenticated");
  const submitConsentsMutation = useSubmitConsents();
  const {
    checked,
    isAllChecked,
    isRequiredChecked,
    toggleAll,
    toggleAgreement,
    applyServerConsents,
  } = useAgreementSelection();

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
    if (consentStatusQuery.data) {
      applyServerConsents(consentStatusQuery.data.consents);
    }
  }, [applyServerConsents, consentStatusQuery.data]);

  useEffect(() => {
    if (!consentStatusQuery.isError) return;

    showToast({
      message: "약관 동의 상태를 불러오지 못했어요. 다시 시도해 주세요.",
    });
  }, [consentStatusQuery.isError, showToast]);

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
        <TermsAgreementForm
          checked={checked}
          isAllChecked={isAllChecked}
          isDisabled={isInteractionDisabled}
          onToggleAll={toggleAll}
          onToggleAgreement={toggleAgreement}
        />
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
