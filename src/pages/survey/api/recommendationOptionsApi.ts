import type { RecommendationOptionsResponseDto } from "@/shared/api/generated/types";
import { http } from "@/shared/api/http";

export type TravelStyleOptionDto = {
  slug: string;
  label: string;
};

export type BudgetPresetDto = {
  label: string;
  amountWon: number;
};

export type BudgetAllocationRuleDto = {
  type: "transport" | "food" | "activity";
  label: string;
  percentage: number;
};

export type RecommendationOptionsResponse = RecommendationOptionsResponseDto & {
  travelStyles: TravelStyleOptionDto[];
  budgetPresets: BudgetPresetDto[];
  budgetAllocation: {
    defaultDailyBudgetWon: number;
    rules: BudgetAllocationRuleDto[];
  };
};

export const getRecommendationOptions = async () => {
  return http.get<RecommendationOptionsResponse>(
    "/recommended-routes/recommend/options",
  );
};
