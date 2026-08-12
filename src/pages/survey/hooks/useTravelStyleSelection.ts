import { useMemo, useState } from "react";

const initialSelectedStyleIds: string[] = [];

export function useTravelStyleSelection() {
  const [selectedStyleIds, setSelectedStyleIds] = useState(
    initialSelectedStyleIds,
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
    selectedStyleIdSet,
    selectedCount: selectedStyleIds.length,
    toggleStyle,
    resetSelection,
  };
}
