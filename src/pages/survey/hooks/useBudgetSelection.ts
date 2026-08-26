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

  /** 이미 정한 적이 있으면 그 값으로 시작합니다. */
  initialTripDays?: number;
  initialDailyBudgetWon?: number;
};

export function useBudgetSelection({
  budgetAllocationOptions,
  initialTripDays: prefilledTripDays,
  initialDailyBudgetWon,
}: UseBudgetSelectionOptions = {}) {
  const [tripDays, setTripDaysState] = useState(
    prefilledTripDays ?? initialTripDays,
  );

  /** 화면에 보이는 큰 숫자칸의 값. 여행 전체 기간의 총 예산입니다. */
  const [budget, setBudget] = useState(
    initialDailyBudgetWon !== undefined && prefilledTripDays !== undefined
      ? initialDailyBudgetWon * prefilledTripDays
      : initialBudget,
  );

  /**
   * 고른 프리셋의 하루 금액. 프리셋은 하루 기준이라 총액과 따로 들고 있어야
   * 여행 기간이 바뀔 때 다시 곱할 수 있고, 눌린 버튼도 표시할 수 있습니다.
   */
  /**
   * 되돌아온 경우에도 하루 금액을 들고 있습니다. 저장하는 값도 API 가 받는
   * 값도 하루 기준이라, 기간만 바꿨을 때 하루 예산이 유지되는 쪽이 맞습니다.
   */
  const [selectedPresetDaily, setSelectedPresetDaily] = useState<number | null>(
    initialDailyBudgetWon ?? null,
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

    const percents = allocations.map(
      (allocation) =>
        allocationPercents[allocation.id] ??
        normalizeAllocationPercent(allocation.percent),
    );

    /**
     * 항목마다 따로 반올림하면 합계가 하루 예산과 어긋납니다. 예산 1,000원을
     * 3일로 나눈 333원을 50:50 으로 쪼개면 167 + 167 = 334 가 됩니다.
     *
     * 비율 합만큼의 금액을 먼저 구하고, 마지막 항목이 나머지를 흡수해 합계를
     * 맞춥니다.
     */
    const percentTotal = percents.reduce(
      (total, percent) => total + percent,
      0,
    );
    const amountTotal = Math.round((dailyBudget * percentTotal) / 100);

    let allocated = 0;

    return allocations.map((allocation, index) => {
      const percent = percents[index];
      const isLast = index === allocations.length - 1;
      const amount = isLast
        ? amountTotal - allocated
        : Math.round((dailyBudget * percent) / 100);

      allocated += amount;

      return { ...allocation, percent, amount };
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
