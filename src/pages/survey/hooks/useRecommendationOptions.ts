import { useQuery } from "@tanstack/react-query";

import cameraIcon from "@/shared/assets/svg/ic-camera.svg";
import coffeeIcon from "@/shared/assets/svg/ic-coffee.svg";
import mountainIcon from "@/shared/assets/svg/ic-mountain.svg";
import shoppingBagIcon from "@/shared/assets/svg/ic-shopping-bag.svg";
import ticketIcon from "@/shared/assets/svg/ic-ticket.svg";
import tramIcon from "@/shared/assets/svg/ic-tram-front.svg";
import utensilsIcon from "@/shared/assets/svg/ic-utensils.svg";
import wavesIcon from "@/shared/assets/svg/ic-waves-horizontal.svg";

import {
  getRecommendationOptions,
  type BudgetAllocationRuleDto,
  type BudgetPresetDto,
  type TravelStyleOptionDto,
} from "../api/recommendationOptionsApi";
import { queryKeys } from "@/shared/query/queryKeys";

const travelStyleIconBySlug: Record<string, string> = {
  "local-food": utensilsIcon,
  cafe: coffeeIcon,
  "emotion-cafe": coffeeIcon,
  beach: wavesIcon,
  "beach-tour": wavesIcon,
  "photo-spot": cameraIcon,
  market: shoppingBagIcon,
  "traditional-market": shoppingBagIcon,
  nature: mountainIcon,
  "nature-walk": mountainIcon,
};

const allocationIconByType: Partial<
  Record<BudgetAllocationRuleDto["type"], string>
> = {
  transport: tramIcon,
  food: utensilsIcon,
  activity: ticketIcon,
};

export type TravelStyleOption = {
  id: string;
  label: string;
  icon: string;
};

export type BudgetPreset = {
  id: string;
  label: string;
  value: number;
};

export type BudgetAllocation = {
  id: string;
  label: string;
  percent: number;
  icon: string;
};

export type SurveyRecommendationOptions = {
  travelStyles: TravelStyleOption[];
  durationDays: number[];
  budgetPresets: BudgetPreset[];
  budgetAllocations: BudgetAllocation[];
  defaultDailyBudgetWon: number;
};

const toTravelStyleOption = (
  option: TravelStyleOptionDto,
): TravelStyleOption => ({
  id: option.slug,
  label: option.label,
  icon: travelStyleIconBySlug[option.slug] ?? cameraIcon,
});

const toBudgetPreset = (preset: BudgetPresetDto): BudgetPreset => ({
  id: `${preset.amountWon}`,
  label: preset.label,
  value: preset.amountWon,
});

const toBudgetAllocation = (
  rule: BudgetAllocationRuleDto,
): BudgetAllocation => ({
  id: rule.type,
  label: rule.label,
  percent: rule.percentage,
  icon: allocationIconByType[rule.type] ?? cameraIcon,
});

const toSurveyRecommendationOptions = (
  data: Awaited<ReturnType<typeof getRecommendationOptions>>,
): SurveyRecommendationOptions => ({
  travelStyles: data.travelStyles.map(toTravelStyleOption),
  durationDays: data.durationDays,
  budgetPresets: data.budgetPresets.map(toBudgetPreset),
  budgetAllocations: data.budgetAllocation.rules.map(toBudgetAllocation),
  defaultDailyBudgetWon: data.budgetAllocation.defaultDailyBudgetWon,
});

/**
 * @param isEnabled 설문 밖에서는 필요할 때만 조회하도록 끌 수 있습니다.
 */
export const useRecommendationOptions = (isEnabled = true) => {
  return useQuery({
    queryKey: queryKeys.survey.recommendationOptions(),
    queryFn: getRecommendationOptions,
    select: toSurveyRecommendationOptions,
    enabled: isEnabled,
  });
};

export type RecommendationOptionsQuery = ReturnType<
  typeof useRecommendationOptions
>;
