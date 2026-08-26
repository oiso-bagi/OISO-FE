import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useToast } from "@/shared/components/Toast/toastContext";
import { completeSurvey } from "@/shared/lib/onboardingFlow";
import {
  readRecommendationConditions,
  saveRecommendationConditions,
} from "@/shared/lib/recommendationConditions";

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

  /**
   * 조건을 고치러 들어온 경우(`?mode=edit`)에만 이전 답을 채웁니다.
   *
   * 그 외의 진입은 언제나 빈 설문이어야 합니다. 홈의 CTA 는 새 여행을 짜는
   * 입구라, 이전 답이 남아 있으면 새로 추천받으려는 사용자가 매번 지워야
   * 합니다.
   *
   * 마운트 시점에 한 번만 읽습니다. 매 렌더 읽으면 설문 도중 저장된 값이
   * 끼어들 수 있고, 이 값은 시작값으로만 쓰입니다.
   */
  const [searchParams] = useSearchParams();
  const [savedConditions] = useState(() =>
    searchParams.get("mode") === "edit" ? readRecommendationConditions() : null,
  );

  const surveyForm = useSurveyForm({
    recommendationOptions: optionsQuery.data,
    savedConditions,
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
      const selectedStyleIds = surveyForm.travelStyle.selectedStyleIds;

      /**
       * 고른 스타일의 이름을 함께 저장합니다. 추천 화면의 조건 요약이 옵션
       * API 를 기다리지 않고 바로 그릴 수 있습니다.
       */
      const travelStyles = optionsQuery.data?.travelStyles ?? [];
      const travelStyleLabels = selectedStyleIds.map(
        (styleId) =>
          travelStyles.find((style) => style.id === styleId)?.label ?? styleId,
      );

      const areConditionsSaved = saveRecommendationConditions({
        travelStyleSlugs: selectedStyleIds,
        durationDays: surveyForm.budget.tripDays,
        dailyBudgetWon: surveyForm.budget.dailyBudget,
        travelStyleLabels,
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
