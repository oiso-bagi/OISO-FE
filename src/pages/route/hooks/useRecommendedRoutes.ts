import { useQuery } from "@tanstack/react-query";

import { readRecommendationConditions } from "@/shared/lib/recommendationConditions";
import { queryKeys } from "@/shared/query/queryKeys";

import { postRecommendedRoutes } from "../api/recommendedRouteApi";
import { USE_MOCK_DATA, mockRecommendedRouteList } from "../mocks/routeMocks";
import { rankRecommendedRoutes } from "../utils/routeRanking";

/**
 * 설문 조건에 맞춘 추천 목록(top 3).
 *
 * 조건은 설문 화면이 저장하고 여기서 읽습니다. 조건이 없으면 실패시킵니다 —
 * 전체 목록 API 로 폴백하면 일수·예산과 무관한 마스터 코스가 통째로 내려와
 * 화면이 top 3 대신 100여 개를 그리게 됩니다.
 *
 * 조건이 없는 상태로 이 화면에 닿는 경우는 `AppLayout` 가드가 설문으로
 * 되돌려 막습니다. 그래도 뚫렸을 때는 스켈레톤이 아니라 에러 문구가 뜹니다.
 */
export const useRecommendedRoutes = () => {
  const conditions = readRecommendationConditions();

  return useQuery({
    queryKey: queryKeys.recommendedRoutes.list(conditions),
    queryFn: () => {
      /**
       * 조건 검증을 목 분기보다 먼저 둡니다. 목은 서버 응답을 대신하는
       * 것이라 요청이 성립하지 않는 상황까지 흉내 내면 안 됩니다.
       *
       * 조회를 막는 대신 실패시키는 이유는, `enabled` 로 끄면 비활성 쿼리의
       * `isPending` 이 계속 참이라 화면이 스켈레톤에서 벗어나지 못해서입니다.
       */
      if (!conditions) throw new Error("설문 조건이 없습니다.");

      if (USE_MOCK_DATA) return Promise.resolve(mockRecommendedRouteList);

      return postRecommendedRoutes(conditions);
    },
    /**
     * 서버 응답은 점수순이 아니고 `isRecommended` 도 전부 참으로 옵니다.
     * 정렬과 뱃지 판정을 여기서 한 번에 끝내 화면은 결과만 그리게 합니다.
     */
    select: rankRecommendedRoutes,
  });
};
