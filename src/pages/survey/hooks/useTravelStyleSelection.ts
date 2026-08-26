import { useMemo, useState } from "react";

const initialSelectedStyleIds: string[] = [];

interface UseTravelStyleSelectionOptions {
  /** 이미 고른 적이 있으면 그 값으로 시작합니다. */
  initialStyleIds?: string[];
}

export function useTravelStyleSelection({
  initialStyleIds,
}: UseTravelStyleSelectionOptions = {}) {
  const [selectedStyleIds, setSelectedStyleIds] = useState(
    initialStyleIds ?? initialSelectedStyleIds,
  );

  const selectedStyleIdSet = useMemo(
    () => new Set(selectedStyleIds),
    [selectedStyleIds],
  );

  const toggleStyle = (styleId: string) => {
    setSelectedStyleIds((currentStyleIds) => {
      if (currentStyleIds.includes(styleId)) {
        return currentStyleIds.filter((currentStyleId) => {
          return currentStyleId !== styleId;
        });
      }

      return [...currentStyleIds, styleId];
    });
  };

  const resetSelection = () => {
    setSelectedStyleIds([]);
  };

  return {
    selectedStyleIds,
    selectedStyleIdSet,
    selectedCount: selectedStyleIds.length,
    toggleStyle,
    resetSelection,
  };
}
