import { useMemo, useState } from "react";

import type { BudgetAllocation } from "./useRecommendationOptions";

const initialTripDays = 0;
const initialBudget = 0;
const allocationPercentStep = 5;

type UseBudgetSelectionOptions = {
  budgetAllocationOptions?: BudgetAllocation[];
};

export function useBudgetSelection({
  budgetAllocationOptions,
}: UseBudgetSelectionOptions = {}) {
  const [tripDays, setTripDays] = useState(initialTripDays);
  const [budget, setBudget] = useState(initialBudget);
  const [hasNegativeBudgetInput, setHasNegativeBudgetInput] = useState(false);
  const [allocationPercents, setAllocationPercents] = useState<
    Record<string, number>
  >({});

  const formattedBudget = useMemo(() => {
    return budget.toLocaleString("ko-KR");
  }, [budget]);

  const allocationItems = useMemo(() => {
    const allocations = budgetAllocationOptions ?? [];

    return allocations.map((allocation) => {
      const percent = allocationPercents[allocation.id] ?? allocation.percent;

      return {
        ...allocation,
        percent,
        amount: Math.round((budget * percent) / 100),
      };
    });
  }, [allocationPercents, budget, budgetAllocationOptions]);

  const isBudgetAllocationVisible = budget > 0 && !hasNegativeBudgetInput;

  const updateBudgetText = (budgetText: string) => {
    setHasNegativeBudgetInput(budgetText.includes("-"));

    const nextBudget = Number(budgetText.replace(/\D/g, ""));
    setBudget(Number.isNaN(nextBudget) ? 0 : nextBudget);
  };

  const resetBudget = () => {
    setTripDays(initialTripDays);
    setBudget(initialBudget);
    setHasNegativeBudgetInput(false);
    setAllocationPercents({});
  };

  const selectBudget = (nextBudget: number) => {
    setBudget(nextBudget);
    setHasNegativeBudgetInput(false);
  };

  const updateAllocationPercent = (
    allocationId: string,
    nextPercent: number,
  ) => {
    const roundedPercent =
      Math.round(nextPercent / allocationPercentStep) * allocationPercentStep;
    const clampedPercent = Math.min(100, Math.max(0, roundedPercent));

    setAllocationPercents((currentPercents) => ({
      ...currentPercents,
      [allocationId]: clampedPercent,
    }));
  };

  return {
    tripDays,
    budget,
    formattedBudget,
    hasNegativeBudgetInput,
    isBudgetAllocationVisible,
    allocationItems,
    setTripDays,
    selectBudget,
    updateAllocationPercent,
    updateBudgetText,
    resetBudget,
  };
}
