import { useCallback, useState } from "react";

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

  const toggle = useCallback(() => {
    setIsCollapsed((previous) => {
      const next = !previous;

      try {
        window.localStorage.setItem(storageKey, String(next));
      } catch {
        // 저장이 막힌 환경에서는 이번 세션에만 적용됩니다.
      }

      return next;
    });
  }, []);

  return { isCollapsed, toggle };
};
