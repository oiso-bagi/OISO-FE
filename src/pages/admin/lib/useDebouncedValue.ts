import { useEffect, useState } from "react";

/**
 * 값이 멈춘 뒤에야 반영합니다.
 *
 * 검색어를 그대로 목록 조회에 넘기면 한 글자마다 조회가 일어납니다.
 * 입력 자체는 즉시 화면에 보이고, 조회만 늦추기 위해 분리합니다.
 */
export const useDebouncedValue = <T>(value: T, delayMs = 300) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);

    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
};
