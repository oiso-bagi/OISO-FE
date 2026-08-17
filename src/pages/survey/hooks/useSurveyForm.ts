import { useBudgetSelection } from "./useBudgetSelection";
import type { SurveyRecommendationOptions } from "./useRecommendationOptions";
import { useTravelStyleSelection } from "./useTravelStyleSelection";

type UseSurveyFormOptions = {
  recommendationOptions?: SurveyRecommendationOptions;
};

export function useSurveyForm({
  recommendationOptions,
}: UseSurveyFormOptions = {}) {
  const travelStyle = useTravelStyleSelection();
  const budget = useBudgetSelection({
    budgetAllocationOptions: recommendationOptions?.budgetAllocations,
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
