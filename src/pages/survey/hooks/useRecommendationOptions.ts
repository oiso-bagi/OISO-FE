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
import { surveyQueryKeys } from "./queryKeys";

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

const allocationIconByType: Record<BudgetAllocationRuleDto["type"], string> = {
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
  icon: allocationIconByType[rule.type],
});

export const useRecommendationOptions = () => {
  return useQuery({
    queryKey: surveyQueryKeys.recommendationOptions(),
    queryFn: getRecommendationOptions,
    select: (data): SurveyRecommendationOptions => ({
      travelStyles: data.travelStyles.map(toTravelStyleOption),
      durationDays: data.durationDays,
      budgetPresets: data.budgetPresets.map(toBudgetPreset),
      budgetAllocations: data.budgetAllocation.rules.map(toBudgetAllocation),
      defaultDailyBudgetWon: data.budgetAllocation.defaultDailyBudgetWon,
    }),
  });
};

export type RecommendationOptionsQuery = ReturnType<
  typeof useRecommendationOptions
>;
