import type { createBrowserRouter } from "react-router-dom";

import { GA_MEASUREMENT_ID } from "@/shared/config/env";

/**
 * GA4 이벤트 수집.
 *
 * 측정 ID 가 없으면 스크립트를 아예 불러오지 않고 모든 호출이 조용히
 * 무시됩니다. 로컬·프리뷰 배포의 클릭이 운영 지표에 섞이지 않게 하려면
 * 환경변수를 운영에만 넣으면 됩니다.
 */

/**
 * 수집하는 이벤트.
 *
 * 흐름의 관문만 잡습니다. `설문 완료 → 코스 펼침 → 저장 → 지도 진입 → 여행 완료`
 * 가 이어져 단계별 이탈이 그대로 깔때기가 됩니다.
 * 더 늘리면 심는 비용은 늘고 읽히는 건 줄어듭니다.
 */
type AnalyticsEvent =
  | { name: "survey_complete"; params: SurveyCompleteParams }
  | { name: "route_expand"; params: RouteExpandParams }
  | { name: "route_save"; params: RouteSaveParams }
  | { name: "map_view"; params: MapViewParams }
  | { name: "trip_complete"; params: TripCompleteParams };

type SurveyCompleteParams = {
  duration_days: number;
  daily_budget_won: number;
  style_count: number;
};

type RouteExpandParams = {
  route_id: string;
  /** 정렬된 추천 목록에서의 순위. 1 부터 셉니다. */
  rank: number;
};

type RouteSaveParams = {
  route_id: string;
};

type MapViewParams = {
  route_id: string;
  /** 추천에서 바로 열었는지, 저장한 뒤 다시 열었는지 */
  source: "recommended" | "saved";
};

type TripCompleteParams = {
  route_id: string;
  /** 어느 화면에서 완료했는지 */
  from: "saved_list" | "map";
};

type GtagArgs =
  | ["js", Date]
  | ["config", string, Record<string, unknown>]
  | ["event", string, Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

const isEnabled = () => GA_MEASUREMENT_ID !== "" && Boolean(window.gtag);

const toPagePath = (location: { pathname: string; search: string }) =>
  `${location.pathname}${location.search}`;

const trackPageView = (pagePath: string) => {
  if (!isEnabled()) return;

  window.gtag?.("event", "page_view", {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
    page_title: document.title,
  });
};

/** 흐름 이벤트 한 건을 보냅니다. 측정 ID 가 없으면 아무 일도 일어나지 않습니다. */
export const trackEvent = <T extends AnalyticsEvent>(
  name: T["name"],
  params: T["params"],
) => {
  if (!isEnabled()) return;

  window.gtag?.("event", name, params);
};

const loadGtag = () => {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: GtagArgs) {
    window.dataLayer?.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());

  /**
   * 자동 page_view 를 끕니다. SPA 라 첫 진입에서 한 번만 보내지고 이후 화면
   * 이동이 잡히지 않습니다. 라우터 변화에 맞춰 직접 보냅니다.
   */
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
};

type AppRouter = ReturnType<typeof createBrowserRouter>;

/**
 * 수집을 켜고 화면 이동을 따라 붙습니다.
 *
 * 레이아웃마다 훅을 넣으면 관리자·로그인처럼 다른 레이아웃을 쓰는 화면이
 * 빠집니다. 라우터를 한 번 구독해 전 화면을 한 곳에서 잡습니다.
 */
export const installAnalytics = (router: AppRouter) => {
  if (GA_MEASUREMENT_ID === "") return;

  loadGtag();
  trackPageView(toPagePath(window.location));

  let lastLocationKey = router.state.location.key;

  router.subscribe((state) => {
    // 이동이 끝난 뒤 한 번만 보냅니다. 로딩 중 상태 변화까지 세면 중복됩니다.
    if (state.navigation.state !== "idle") return;
    if (state.location.key === lastLocationKey) return;

    lastLocationKey = state.location.key;
    trackPageView(toPagePath(state.location));
  });
};
