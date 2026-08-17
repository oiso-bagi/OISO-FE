import { useCallback, useEffect, useState } from "react";

const storageKey = "oiso:admin-sidebar-collapsed";

const readCollapsed = () => {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(storageKey) === "true";
  } catch {
    return false;
  }
};

/** 사이드바 접힘 상태. 새로고침해도 유지되도록 localStorage 에 저장합니다. */
export const useSidebarCollapsed = () => {
  const [isCollapsed, setIsCollapsed] = useState(readCollapsed);

  /**
   * 저장은 state updater 가 아니라 여기서 합니다. React 는 updater 를 다시
   * 실행하거나 계산 결과를 버릴 수 있어, updater 안에서 저장하면 반영되지 않은
   * 값이 저장될 수 있습니다.
   */
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, String(isCollapsed));
    } catch {
      // 저장이 막힌 환경에서는 이번 세션에만 적용됩니다.
    }
  }, [isCollapsed]);

  const toggle = useCallback(() => {
    setIsCollapsed((previous) => !previous);
  }, []);

  return { isCollapsed, toggle };
};
