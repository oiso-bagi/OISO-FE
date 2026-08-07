import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

import { getErrorStatus } from "@/shared/api/apiError";

const STALE_TIME = 60 * 1000;
const MAX_RETRY_COUNT = 2;

const isClientError = (status: number | undefined) =>
  status !== undefined && status >= 400 && status < 500;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,

      // 4xx 는 다시 보내도 결과가 같으므로 재시도하지 않습니다.
      retry: (failureCount, error) =>
        !isClientError(getErrorStatus(error)) && failureCount < MAX_RETRY_COUNT,
    },

    mutations: {
      retry: false,
    },
  },
});

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
