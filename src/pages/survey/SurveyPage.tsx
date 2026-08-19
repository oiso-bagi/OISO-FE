import { useNavigate } from "react-router-dom";

import { useToast } from "@/shared/components/Toast/toastContext";
import { completeSurvey } from "@/shared/lib/onboardingFlow";
import { saveRecommendationConditions } from "@/shared/lib/recommendationConditions";

import { SurveyHeader } from "./components/SurveyHeader";
import { SurveyProgress } from "./components/SurveyProgress";
import { useRecommendationOptions } from "./hooks/useRecommendationOptions";
import { useSurveyStep } from "./hooks/useSurveyStep";
import { useSurveyForm } from "./hooks/useSurveyForm";
import { BudgetSection } from "./sections/BudgetSection";
import { SurveyFooter } from "./sections/SurveyFooter";
import { TravelStyleSection } from "./sections/TravelStyleSection";
import * as styles from "./SurveyPage.css";

export function SurveyPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const totalStep = 2;
  const { currentStep, isFirstStep, goNextStep, goPreviousStep, resetStep } =
    useSurveyStep();
  const optionsQuery = useRecommendationOptions();
  const surveyForm = useSurveyForm({
    recommendationOptions: optionsQuery.data,
  });

  const handleBack = () => {
    if (!isFirstStep) {
      goPreviousStep();
      return;
    }

    navigate(-1);
  };

  const handleResetSurvey = () => {
    surveyForm.reset();
    resetStep();
  };

  const handleNext = () => {
    if (currentStep >= totalStep) {
      const areConditionsSaved = saveRecommendationConditions({
        travelStyleSlugs: surveyForm.travelStyle.selectedStyleIds,
        durationDays: surveyForm.budget.tripDays,
        dailyBudgetWon: surveyForm.budget.budget,
      });
      const isSurveyCompleted = areConditionsSaved && completeSurvey();

      if (!isSurveyCompleted || !areConditionsSaved) {
        showToast({
          message: "설문 완료 상태를 저장하지 못했어요. 다시 시도해 주세요.",
        });
        return;
      }

      navigate("/route");
      return;
    }

    goNextStep();
  };

  return (
    <div className={styles.page}>
      <SurveyHeader onBack={handleBack} onReset={handleResetSurvey} />

      <main className={styles.content}>
        <SurveyProgress currentStep={currentStep} totalStep={totalStep} />

        {currentStep === 1 ? (
          <TravelStyleSection
            optionsQuery={optionsQuery}
            selection={surveyForm.travelStyle}
          />
        ) : (
          <BudgetSection
            optionsQuery={optionsQuery}
            budget={surveyForm.budget}
          />
        )}
      </main>

      <SurveyFooter onPrevious={handleBack} onNext={handleNext} />
    </div>
  );
}
