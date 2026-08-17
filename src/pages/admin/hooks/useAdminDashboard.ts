import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";

import {
  mockGetAdminKtoStatus,
  mockGetAdminSavingsBreakdown,
  mockGetAdminStatsOverview,
  mockPostAdminKtoCollect,
} from "../mocks/adminMocks";

/** 수집 진행 중일 때 상태를 다시 확인하는 간격 */
const COLLECTING_POLL_MS = 2000;

export const useAdminStatsOverview = () =>
  useQuery({
    queryKey: queryKeys.admin.stats.overview(),
    queryFn: mockGetAdminStatsOverview,
  });

export const useAdminSavingsBreakdown = () =>
  useQuery({
    queryKey: queryKeys.admin.stats.savingsBreakdown(),
    queryFn: mockGetAdminSavingsBreakdown,
  });

/**
 * KTO 쿼터 현황.
 *
 * 수집은 비동기라 트리거 응답만으로는 끝을 알 수 없습니다. 진행 중일 때만
 * 폴링하고, 끝나면 멈춥니다. 항상 폴링하면 보고만 있어도 요청이 계속 나갑니다.
 */
export const useAdminKtoStatus = () =>
  useQuery({
    queryKey: queryKeys.admin.kto.status(),
    queryFn: mockGetAdminKtoStatus,
    refetchInterval: (query) =>
      query.state.data?.isCollecting ? COLLECTING_POLL_MS : false,
  });

/** 혼잡도 수동 수집 트리거 */
export const useTriggerKtoCollect = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockPostAdminKtoCollect,
    // 트리거 직후 현황을 다시 읽어 쿨타임·진행 상태를 화면에 반영합니다.
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.kto.all }),
  });
};
