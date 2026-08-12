import { useMemo, useState } from "react";

import type { BudgetAllocation } from "./useRecommendationOptions";

const initialTripDays = 0;
const initialBudget = 0;

type UseBudgetSelectionOptions = {
  budgetAllocationOptions?: BudgetAllocation[];
};

export function useBudgetSelection({
  budgetAllocationOptions,
}: UseBudgetSelectionOptions = {}) {
  const [tripDays, setTripDays] = useState(initialTripDays);
  const [budget, setBudget] = useState(initialBudget);
  const [hasNegativeBudgetInput, setHasNegativeBudgetInput] = useState(false);

  const formattedBudget = useMemo(() => {
    return budget.toLocaleString("ko-KR");
  }, [budget]);

  const allocationItems = useMemo(() => {
    const allocations = budgetAllocationOptions ?? [];

    return allocations.map((allocation) => ({
      ...allocation,
      amount: Math.round((budget * allocation.percent) / 100),
    }));
  }, [budget, budgetAllocationOptions]);

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
  };

  const selectBudget = (nextBudget: number) => {
    setBudget(nextBudget);
    setHasNegativeBudgetInput(false);
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
    updateBudgetText,
    resetBudget,
  };
}
