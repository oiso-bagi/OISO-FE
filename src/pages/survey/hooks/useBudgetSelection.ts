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
  const [tripDays, setTripDaysState] = useState(initialTripDays);

  /** 화면에 보이는 큰 숫자칸의 값. 여행 전체 기간의 총 예산입니다. */
  const [budget, setBudget] = useState(initialBudget);

  /**
   * 고른 프리셋의 하루 금액. 프리셋은 하루 기준이라 총액과 따로 들고 있어야
   * 여행 기간이 바뀔 때 다시 곱할 수 있고, 눌린 버튼도 표시할 수 있습니다.
   */
  const [selectedPresetDaily, setSelectedPresetDaily] = useState<number | null>(
    null,
  );
  const [hasNegativeBudgetInput, setHasNegativeBudgetInput] = useState(false);
  const [allocationPercents, setAllocationPercents] = useState<
    Record<string, number>
  >({});

  const formattedBudget = useMemo(() => {
    return budget.toLocaleString("ko-KR");
  }, [budget]);

  /**
   * 총 예산을 여행 기간으로 나눈 하루 예산. 추천 API 가 받는 값이고, 예산 배분
   * 카드도 이 값을 기준으로 보여 줍니다.
   */
  const dailyBudget = useMemo(() => {
    if (tripDays <= 0) return 0;

    return Math.round(budget / tripDays);
  }, [budget, tripDays]);

  const formattedDailyBudget = useMemo(() => {
    return dailyBudget.toLocaleString("ko-KR");
  }, [dailyBudget]);

  const allocationItems = useMemo(() => {
    const allocations = budgetAllocationOptions ?? [];

    return allocations.map((allocation) => {
      const percent =
        allocationPercents[allocation.id] ??
        normalizeAllocationPercent(allocation.percent);

      return {
        ...allocation,
        percent,
        amount: Math.round((dailyBudget * percent) / 100),
      };
    });
  }, [allocationPercents, dailyBudget, budgetAllocationOptions]);

  const isBudgetAllocationVisible = dailyBudget > 0 && !hasNegativeBudgetInput;

  const updateBudgetText = (budgetText: string) => {
    setHasNegativeBudgetInput(budgetText.includes("-"));

    const nextBudget = Number(budgetText.replace(/\D/g, ""));
    setBudget(Number.isNaN(nextBudget) ? 0 : nextBudget);
    setSelectedPresetDaily(null);
  };

  const resetBudget = () => {
    setTripDaysState(initialTripDays);
    setBudget(initialBudget);
    setSelectedPresetDaily(null);
    setHasNegativeBudgetInput(false);
    setAllocationPercents({});
  };

  const selectBudget = (dailyAmount: number) => {
    setSelectedPresetDaily(dailyAmount);
    setBudget(dailyAmount * tripDays);
    setHasNegativeBudgetInput(false);
  };

  /** 기간을 바꾸면 골라 둔 프리셋을 새 기간으로 다시 곱합니다. */
  const setTripDays = (nextTripDays: number) => {
    setTripDaysState(nextTripDays);

    if (selectedPresetDaily !== null) {
      setBudget(selectedPresetDaily * nextTripDays);
    }
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
    dailyBudget,
    selectedPresetDaily,
    formattedBudget,
    formattedDailyBudget,
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
