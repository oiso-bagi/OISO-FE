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
    const allocations = budgetAllocationOptions ?? [];
    const requestedPercent = normalizeAllocationPercent(nextPercent);

    setAllocationPercents((currentPercents) => {
      const nextPercents = allocations.reduce<Record<string, number>>(
        (percents, allocation) => ({
          ...percents,
          [allocation.id]:
            currentPercents[allocation.id] ??
            normalizeAllocationPercent(allocation.percent),
        }),
        {},
      );
      const otherAllocations = allocations.filter(
        (allocation) => allocation.id !== allocationId,
      );
      const remainingPercent = 100 - requestedPercent;
      const otherPercentTotal = otherAllocations.reduce(
        (total, allocation) => total + nextPercents[allocation.id],
        0,
      );

      nextPercents[allocationId] = requestedPercent;

      if (otherAllocations.length === 0) return nextPercents;

      if (otherPercentTotal === 0) {
        otherAllocations.forEach((allocation, index) => {
          nextPercents[allocation.id] = index === 0 ? remainingPercent : 0;
        });

        return nextPercents;
      }

      otherAllocations.forEach((allocation) => {
        nextPercents[allocation.id] = normalizeAllocationPercent(
          (nextPercents[allocation.id] / otherPercentTotal) * remainingPercent,
        );
      });

      let adjustment =
        remainingPercent -
        otherAllocations.reduce(
          (total, allocation) => total + nextPercents[allocation.id],
          0,
        );

      for (const allocation of otherAllocations) {
        if (adjustment === 0) break;

        const nextValue = nextPercents[allocation.id] + adjustment;
        if (nextValue < 0 || nextValue > 100) continue;

        nextPercents[allocation.id] = nextValue;
        adjustment = 0;
      }

      return nextPercents;
    });
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
