import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_SIZE = 20;

interface UseListQueryParamsOptions<TFilterKey extends string> {
  /** 이 목록이 쓰는 필터 이름들. 렌더마다 새 배열이 되지 않도록 모듈 상수로 두세요. */
  filterKeys: readonly TFilterKey[];
  /**
   * 한 화면에 목록이 둘 이상일 때(탭 등) 쿼리 키가 겹치지 않도록 붙입니다.
   * 예: `places` → `?placesPage=2&placesQ=시장`
   */
  prefix?: string;
  defaultSize?: number;
}

const toPositiveInt = (raw: string | null, fallback: number) => {
  const parsed = Number(raw);

  return Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : fallback;
};

/**
 * 목록 화면의 페이지·검색어·필터를 URL 쿼리와 동기화합니다.
 *
 * 상태를 컴포넌트가 아니라 URL 에 두면 새로고침·뒤로가기·링크 공유에서
 * 그대로 유지됩니다. 관리자 화면은 "이 필터 걸린 목록 좀 봐주세요" 처럼
 * 주소를 주고받는 일이 잦아 특히 도움이 됩니다.
 */
export const useListQueryParams = <TFilterKey extends string>({
  filterKeys,
  prefix = "",
  defaultSize = DEFAULT_SIZE,
}: UseListQueryParamsOptions<TFilterKey>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const toKey = useCallback(
    (name: string) =>
      prefix ? `${prefix}${name[0].toUpperCase()}${name.slice(1)}` : name,
    [prefix],
  );

  const page = toPositiveInt(searchParams.get(toKey("page")), 1);
  const size = toPositiveInt(searchParams.get(toKey("size")), defaultSize);
  const q = searchParams.get(toKey("q")) ?? "";

  /**
   * 매 렌더 새 객체지만, react-query 의 queryKey 는 구조로 비교하므로
   * 불필요한 재조회를 만들지 않습니다.
   */
  const filters = {} as Record<TFilterKey, string>;

  for (const name of filterKeys) {
    filters[name] = searchParams.get(toKey(name)) ?? "";
  }

  const update = useCallback(
    (entries: Record<string, string>, resetPage: boolean) => {
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous);

          for (const [name, value] of Object.entries(entries)) {
            // 빈 값은 "전체"라 쿼리에서 빼 두는 편이 주소가 짧고 읽기 쉽습니다.
            if (value === "") next.delete(toKey(name));
            else next.set(toKey(name), value);
          }

          if (resetPage) next.delete(toKey("page"));

          return next;
        },
        // 필터를 바꿀 때마다 뒤로가기 기록이 쌓이면 화면을 빠져나가기 어렵습니다.
        { replace: true },
      );
    },
    [setSearchParams, toKey],
  );

  const setPage = useCallback(
    (next: number) => update({ page: String(next) }, false),
    [update],
  );

  /** 검색어·필터가 바뀌면 기존 페이지 번호는 의미가 없으므로 1페이지로 되돌립니다. */
  const setQ = useCallback(
    (next: string) => update({ q: next }, true),
    [update],
  );

  const setFilter = useCallback(
    (name: TFilterKey, next: string) => update({ [name]: next }, true),
    [update],
  );

  return { page, size, q, filters, setPage, setQ, setFilter };
};
