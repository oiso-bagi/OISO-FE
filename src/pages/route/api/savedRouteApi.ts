import { http } from "@/shared/api/http";

import type {
  SavedRouteDetailResponse,
  SavedRouteListResponse,
  UpdateSavedRouteCompletedRequest,
} from "./types/savedRoute";

export const getSavedRoutes = async () => {
  return http.get<SavedRouteListResponse>("/saved-routes");
};

// TODO: 저장 엔드포인트 명세 확인 필요 (POST /saved-routes 로 가정)
export const createSavedRoute = async (routeId: number) => {
  return http.post("/saved-routes", { routeId });
};

export const getSavedRouteDetail = async (routeId: number) => {
  return http.get<SavedRouteDetailResponse>(`/saved-routes/${routeId}`);
};

export const updateSavedRouteCompleted = async (
  routeId: number,
  body: UpdateSavedRouteCompletedRequest,
) => {
  return http.patch(`/saved-routes/${routeId}/completed`, body);
};

export const deleteSavedRoute = async (routeId: number) => {
  return http.delete(`/saved-routes/${routeId}`);
};
