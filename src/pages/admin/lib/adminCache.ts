import type { QueryClient } from "@tanstack/react-query";

import type { PaginatedResponse } from "../types";

/**
 * 토글 응답으로 받은 객체를 목록에 반영합니다.
 *
 * 두 단계로 나눠 처리합니다.
 *
 * 1. 캐시에 있는 목록들의 해당 항목만 즉시 갈아끼웁니다. 상태 변경 API 가
 *    변경된 객체 전체를 돌려주기로 되어 있어, 목록을 다시 기다리지 않고도
 *    토글이 바로 반응합니다.
 * 2. 이어서 목록을 무효화합니다. 항목만 바꾸면 `isActive`·`role`·`isPublished`
 *    같은 필터가 다시 평가되지 않아, 필터를 건 목록에 조건과 맞지 않는 행이
 *    남습니다. 재조회로 서버 기준 결과를 맞춥니다.
 *
 * 목록 쿼리는 `keepPreviousData` 를 쓰므로 재조회 중에도 표가 비지 않습니다.
 */
export const replaceItemInLists = <T extends { id: string }>(
  queryClient: QueryClient,
  listKey: readonly unknown[],
  updated: T,
) => {
  queryClient.setQueriesData<PaginatedResponse<T>>(
    { queryKey: listKey },
    (previous) => {
      if (!previous) return previous;

      const index = previous.items.findIndex((item) => item.id === updated.id);

      if (index === -1) return previous;

      const items = [...previous.items];
      items[index] = updated;

      return { ...previous, items };
    },
  );

  void queryClient.invalidateQueries({ queryKey: listKey });
};

/**
 * 화면에 띄울 실패 문구.
 *
 * 지금은 목 데이터라 던져진 `Error` 의 메시지가 곧 서버가 줄 사유(예: 마지막
 * 관리자 해제 금지)입니다. 실제 연동 시에는 `shared/api/apiError` 의
 * `toErrorMessage` 로 교체하면 됩니다.
 */
export const toAdminErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error && error.message ? error.message : fallback;
