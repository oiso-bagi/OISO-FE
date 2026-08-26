import type { RecommendationConditions } from "@/shared/lib/recommendationConditions";

import { useBudgetSelection } from "./useBudgetSelection";
import type { SurveyRecommendationOptions } from "./useRecommendationOptions";
import { useTravelStyleSelection } from "./useTravelStyleSelection";

type UseSurveyFormOptions = {
  recommendationOptions?: SurveyRecommendationOptions;

  /**
   * 이미 설문을 마친 사용자가 조건을 고치러 들어온 경우의 시작값.
   *
   * 없으면 빈 설문으로 시작합니다. 이 값이 없던 시절에는 예산만 바꾸려 해도
   * 여행 스타일부터 다시 골라야 했습니다.
   */
  savedConditions?: RecommendationConditions | null;
};

export function useSurveyForm({
  recommendationOptions,
  savedConditions,
}: UseSurveyFormOptions = {}) {
  const travelStyle = useTravelStyleSelection({
    initialStyleIds: savedConditions?.travelStyleSlugs,
  });
  const budget = useBudgetSelection({
    budgetAllocationOptions: recommendationOptions?.budgetAllocations,
    initialTripDays: savedConditions?.durationDays,
    initialDailyBudgetWon: savedConditions?.dailyBudgetWon,
  });

  const reset = () => {
    travelStyle.resetSelection();
    budget.resetBudget();
  };

  return {
    travelStyle,
    budget,
    reset,
  };
}

export type SurveyForm = ReturnType<typeof useSurveyForm>;
