import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useToast } from "@/shared/components/Toast/toastContext";
import { trackEvent } from "@/shared/lib/analytics";
import {
  completeSurvey,
  isSurveyCompleted as hasCompletedSurvey,
} from "@/shared/lib/onboardingFlow";
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
  const isEditMode = searchParams.get("mode") === "edit";
  const [savedConditions] = useState(() =>
    isEditMode ? readRecommendationConditions() : null,
  );

  /**
   * 설문을 한 번도 마치지 않은 사용자는 가드 때문에 다른 화면으로 갈 수
   * 없습니다. 첫 단계에서 돌아가기를 막습니다.
   */
  const [canLeaveSurvey] = useState(() => isEditMode || hasCompletedSurvey());
  const canGoBack = !isFirstStep || canLeaveSurvey;

  const surveyForm = useSurveyForm({
    recommendationOptions: optionsQuery.data,
    savedConditions,
  });

  const handleBack = () => {
    if (!isFirstStep) {
      goPreviousStep();
      return;
    }

    if (!canLeaveSurvey) return;

    /**
     * 앱 안에서 들어온 기록이 있을 때만 뒤로 갑니다.
     *
     * 로그인 직후에는 바로 앞 기록이 카카오·구글 인증 페이지라 `navigate(-1)`
     * 이 앱 밖으로 나가고, 새 탭에서 바로 열었으면 앞 기록이 없어 아무 일도
     * 일어나지 않습니다. `idx` 는 React Router 가 기록마다 매기는 순번입니다.
     */
    const historyIndex =
      (window.history.state as { idx?: number } | null)?.idx ?? 0;

    if (historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(isEditMode ? "/route" : "/", { replace: true });
  };

  /**
   * 서버가 받지 않는 값(스타일 0개, 기간 미선택, 범위 밖 예산)으로는 넘어가지
   * 못하게 합니다. 그대로 제출하면 추천 요청이 400 으로 실패하고, 추천
   * 화면에서 조건을 고치기 전까지 빠져나올 수 없습니다.
   */
  const tripDayOptions = optionsQuery.data?.durationDays;
  const canProceed =
    currentStep === 1
      ? surveyForm.travelStyle.selectedCount > 0
      : surveyForm.budget.isBudgetComplete &&
        (tripDayOptions?.includes(surveyForm.budget.tripDays) ?? true);

  const handleResetSurvey = () => {
    surveyForm.reset();
    resetStep();
  };

  const handleNext = () => {
    // 버튼을 비활성화해도 연타로 들어오는 클릭까지 여기서 한 번 더 막습니다.
    if (!canProceed) return;

    if (currentStep >= totalStep) {
      const selectedStyleIds = surveyForm.travelStyle.selectedStyleIds;

      /**
       * 고른 스타일의 이름을 함께 저장합니다. 추천 화면의 조건 요약이 옵션
       * API 를 기다리지 않고 바로 그릴 수 있습니다.
       *
       * 옵션을 못 불러왔으면 이전에 저장한 이름을 씁니다. 그래도 모르는 이름이
       * 있으면 slug 를 대신 넣지 않고 비워 둡니다. 비어 있으면 추천 화면이
       * 옵션을 다시 불러와 채우지만, slug 가 들어가면 영문 그대로 남습니다.
       */
      const travelStyles = optionsQuery.data?.travelStyles ?? [];
      const savedLabelBySlug = new Map(
        (savedConditions?.travelStyleSlugs ?? []).map((slug, index) => [
          slug,
          savedConditions?.travelStyleLabels?.[index],
        ]),
      );
      const resolvedLabels = selectedStyleIds.map(
        (styleId) =>
          travelStyles.find((style) => style.id === styleId)?.label ??
          savedLabelBySlug.get(styleId),
      );
      const travelStyleLabels = resolvedLabels.every(
        (label): label is string => label !== undefined,
      )
        ? resolvedLabels
        : undefined;

      /**
       * 조절한 예산 배분도 함께 저장해 추천 요청에 싣습니다. 옵션을 못 불러와
       * 배분 카드가 비어 있으면 이전에 저장한 배분을 유지합니다.
       */
      const { allocationItems } = surveyForm.budget;
      const budgetAllocationPercents =
        allocationItems.length > 0
          ? Object.fromEntries(
              allocationItems.map((item) => [item.id, item.percent]),
            )
          : savedConditions?.budgetAllocationPercents;

      const areConditionsSaved = saveRecommendationConditions({
        travelStyleSlugs: selectedStyleIds,
        durationDays: surveyForm.budget.tripDays,
        dailyBudgetWon: surveyForm.budget.dailyBudget,
        travelStyleLabels,
        budgetAllocationPercents,
      });
      const isSurveyCompleted = areConditionsSaved && completeSurvey();

      if (!isSurveyCompleted || !areConditionsSaved) {
        showToast({
          message: "설문 완료 상태를 저장하지 못했어요. 다시 시도해 주세요.",
        });
        return;
      }

      trackEvent("survey_complete", {
        duration_days: surveyForm.budget.tripDays,
        daily_budget_won: surveyForm.budget.dailyBudget,
        style_count: selectedStyleIds.length,
      });

      navigate("/route");
      return;
    }

    goNextStep();
  };

  return (
    <div className={styles.page}>
      <SurveyHeader
        onBack={handleBack}
        onReset={handleResetSurvey}
        canGoBack={canGoBack}
      />

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

      <SurveyFooter
        onPrevious={handleBack}
        onNext={handleNext}
        isPreviousDisabled={!canGoBack}
        isNextDisabled={!canProceed}
      />
    </div>
  );
}
