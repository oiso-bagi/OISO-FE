import { useMemo, useState } from "react";

import { budgetAllocations } from "../mocks/budgetOptions";

const initialTripDays = 0;
const initialBudget = 0;

export function useBudgetSelection() {
  const [tripDays, setTripDays] = useState(initialTripDays);
  const [budget, setBudget] = useState(initialBudget);
  const [hasNegativeBudgetInput, setHasNegativeBudgetInput] = useState(false);

  const formattedBudget = useMemo(() => {
    return budget.toLocaleString("ko-KR");
  }, [budget]);

  const allocationItems = useMemo(() => {
    return budgetAllocations.map((allocation) => ({
      ...allocation,
      amount: Math.round((budget * allocation.percent) / 100),
    }));
  }, [budget]);

  const isBudgetAllocationVisible =
    tripDays > 0 && budget > 0 && !hasNegativeBudgetInput;

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
