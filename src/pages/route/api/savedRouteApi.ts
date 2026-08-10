import { http } from "@/shared/api/http";

import { toSavedRouteDetail, toSavedRouteList } from "./mappers/savedRoute";
import type { UpdateSavedRouteCompletionRequest } from "./types/savedRoute";
import type {
  CreateSavedRouteDto,
  SavedRouteCompletionResponseDto,
  SavedRouteDetailResponseDto,
  SavedRouteListResponseDto,
  ToggleSavedRouteCompletionDto,
} from "@/shared/api/generated/schema";

export const getSavedRoutes = async () => {
  const response = await http.get<SavedRouteListResponseDto>("/saved-routes");

  return toSavedRouteList(response);
};

export const createSavedRoute = async (routeId: string) => {
  const body: CreateSavedRouteDto = { routeId };

  return http.post("/saved-routes", body);
};

export const getSavedRouteDetail = async (routeId: string) => {
  const route = await http.get<SavedRouteDetailResponseDto>(
    `/saved-routes/${routeId}`,
  );

  return toSavedRouteDetail(route);
};

/**
 * 완료 토글. 경로 끝이 `completed` 가 아니라 `completion` 입니다.
 *
 * 요청 본문의 `actualCostWon`(실제 지출)은 아직 입력 화면이 없어 보내지
 * 않습니다. 서버는 변경된 상태를 응답으로 돌려줍니다.
 */
export const updateSavedRouteCompletion = async (
  routeId: string,
  body: UpdateSavedRouteCompletionRequest,
) => {
  const request: ToggleSavedRouteCompletionDto = {
    isCompleted: body.isCompleted,
  };

  return http.patch<SavedRouteCompletionResponseDto>(
    `/saved-routes/${routeId}/completion`,
    request,
  );
};

export const deleteSavedRoute = async (routeId: string) => {
  return http.delete(`/saved-routes/${routeId}`);
};
