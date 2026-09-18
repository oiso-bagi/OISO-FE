import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/query/queryKeys";
import { USE_MOCK } from "@/shared/config/env";

import {
  getAdminKtoStatus,
  getAdminStatsOverview,
  postAdminKtoCollect,
} from "../api/adminDashboardApi";
import {
  mockGetAdminKtoStatus,
  mockGetAdminStatsOverview,
  mockPostAdminKtoCollect,
} from "../mocks/adminMocks";
import type { KtoSource } from "../types";

/** 수집 진행 중일 때 상태를 다시 확인하는 간격 */
const COLLECTING_POLL_MS = 2000;

export const useAdminStatsOverview = () =>
  useQuery({
    queryKey: queryKeys.admin.stats.overview(),
    queryFn: USE_MOCK ? mockGetAdminStatsOverview : getAdminStatsOverview,
  });

/**
 * KTO 공공데이터 하나의 적재·쿼터 현황.
 *
 * 수집 중일 때만 폴링하고, 끝나면 멈춥니다. 항상 폴링하면 보고만 있어도
 * 요청이 계속 나갑니다.
 */
export const useAdminKtoStatus = (source: KtoSource) =>
  useQuery({
    queryKey: queryKeys.admin.kto.status(source),
    queryFn: () =>
      USE_MOCK ? mockGetAdminKtoStatus(source) : getAdminKtoStatus(source),
    refetchInterval: (query) =>
      query.state.data?.isCollecting ? COLLECTING_POLL_MS : false,
  });

/** KTO 공공데이터 하나를 즉시 수집합니다. */
export const useTriggerKtoCollect = (source: KtoSource) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      USE_MOCK ? mockPostAdminKtoCollect(source) : postAdminKtoCollect(source),
    /**
     * 수집 직후 현황을 다시 읽어 쿨타임·적재 건수를 반영합니다. 관광정보를
     * 새로 받으면 혼잡도가 세는 장소도 달라질 수 있어 모두 다시 읽습니다.
     */
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.kto.all }),
  });
};
