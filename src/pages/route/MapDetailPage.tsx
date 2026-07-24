import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import backIcon from "@/shared/assets/svg/back.svg";

import { RouteMap } from "./components/RouteMap";
import { RouteStopList } from "./components/RouteStopList";
import { useRecommendedRouteDetail } from "./hooks/useRecommendedRouteDetail";
import { useSavedRouteDetail } from "./hooks/useSavedRouteDetail";

import * as styles from "./MapDetailPage.css";

/**
 * 코스 하나를 지도로 크게 보는 풀스크린 읽기전용 페이지.
 * /map/:id?source=recommended|saved
 * (저장/삭제/네비 기능은 P2)
 */
export function MapDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const routeId = Number(id) || null;
  // source 미지정/기타 값은 저장 루트로 간주 (현재 진입점이 저장 루트뿐)
  const isSaved = searchParams.get("source") !== "recommended";

  // 두 훅 모두 호출하되 source 에 맞는 쪽만 enabled
  const recommended = useRecommendedRouteDetail(isSaved ? null : routeId);
  const saved = useSavedRouteDetail(isSaved ? routeId : null);
  const { data: route, isPending, isError } = isSaved ? saved : recommended;

  const isInvalid = routeId === null;

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="이전 페이지로 이동"
        >
          <img src={backIcon} alt="" className={styles.backIcon} />
        </button>

        <h1 className={styles.title}>{route?.name ?? "루트 지도"}</h1>
      </header>

      <div className={styles.mapArea}>
        <RouteMap stops={route?.stops ?? []} />
      </div>

      <div className={styles.listArea}>
        {!isInvalid && isPending && (
          <p className={styles.statusText}>루트를 불러오는 중…</p>
        )}

        {(isInvalid || isError) && (
          <p className={styles.statusText}>
            루트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </p>
        )}

        {route && <RouteStopList stops={route.stops} />}
      </div>
    </div>
  );
}
