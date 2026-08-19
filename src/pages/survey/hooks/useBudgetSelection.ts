import { useMemo, useState } from "react";

import type { BudgetAllocation } from "./useRecommendationOptions";

const initialTripDays = 0;
const initialBudget = 0;
const allocationPercentStep = 5;

const normalizeAllocationPercent = (percent: number) => {
  const roundedPercent =
    Math.round(percent / allocationPercentStep) * allocationPercentStep;

  return Math.min(100, Math.max(0, roundedPercent));
};

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
      const percent =
        allocationPercents[allocation.id] ??
        normalizeAllocationPercent(allocation.percent);
      const otherPercentTotal = allocations.reduce((total, otherAllocation) => {
        if (otherAllocation.id === allocation.id) return total;

        return (
          total +
          (allocationPercents[otherAllocation.id] ??
            normalizeAllocationPercent(otherAllocation.percent))
        );
      }, 0);

      return {
        ...allocation,
        percent,
        maxPercent: Math.max(0, 100 - otherPercentTotal),
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
    const allocations = budgetAllocationOptions ?? [];
    const requestedPercent = normalizeAllocationPercent(nextPercent);

    setAllocationPercents((currentPercents) => ({
      ...currentPercents,
      [allocationId]: Math.min(
        requestedPercent,
        Math.max(
          0,
          100 -
            allocations.reduce((total, allocation) => {
              if (allocation.id === allocationId) return total;

              return (
                total +
                (currentPercents[allocation.id] ??
                  normalizeAllocationPercent(allocation.percent))
              );
            }, 0),
        ),
      ),
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
