import { Link, useLocation } from "react-router-dom";

import * as styles from "./DataAttribution.css";

export const DATA_SOURCES_PATH = "/data-sources";

export const DATA_ATTRIBUTION_TEXT =
  "데이터 출처: ⓒ한국관광공사 · 카카오모빌리티 · Google";

/**
 * 출처 안내 페이지에서 뒤로가기로 돌아올 경로.
 *
 * 안내 페이지는 로그인 전 화면에서도 열려야 해서 하단 네비가 없는 레이아웃에
 * 있습니다. 어느 화면에서 왔는지 알 수 없으므로 링크가 state 로 넘깁니다.
 */
export interface DataSourcesLinkState {
  from: string;
}

type DataAttributionProps = {
  variant?: keyof typeof styles.variant;
  className?: string;
};

/**
 * 데이터 출처 한 줄.
 *
 * 공모전 주최측 요구로 모든 페이지에 남깁니다. 누르면 API별 쓰임새를
 * 안내하는 페이지로 이동합니다.
 */
export function DataAttribution({
  variant = "page",
  className,
}: DataAttributionProps) {
  const location = useLocation();
  const state: DataSourcesLinkState = {
    from: `${location.pathname}${location.search}`,
  };

  return (
    <Link
      to={DATA_SOURCES_PATH}
      state={state}
      className={
        className
          ? `${styles.variant[variant]} ${className}`
          : styles.variant[variant]
      }
    >
      {DATA_ATTRIBUTION_TEXT}
    </Link>
  );
}
