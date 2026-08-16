import type { QueryClient } from "@tanstack/react-query";

import type { PaginatedResponse } from "../types";

/**
 * 토글 응답으로 받은 객체를 캐시에 있는 목록들에 반영합니다.
 *
 * 상태 변경 API 가 변경된 객체 전체를 돌려주기로 되어 있어, 목록을 다시
 * 받지 않고 해당 항목만 갈아끼웁니다. 페이지·필터별로 캐시가 여러 벌 있을 수
 * 있으므로 `setQueriesData` 로 도메인 전체를 훑습니다.
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
