import { useLocation } from "react-router-dom";

import type { DataSourcesLinkState } from "@/shared/components/DataAttribution/DataAttribution";
import { Header } from "@/shared/components/header/Header";
import { pageContent } from "@/shared/styles/layout.css";

import { DATA_SOURCES, OTHER_SERVICES } from "./dataSources";
import * as styles from "./DataSourcesPage.css";

/**
 * 링크가 넘긴 이전 경로로 돌아갑니다.
 *
 * 주소를 직접 입력해 들어오면 state 가 없어 홈으로 보냅니다. 로그인 전이면
 * 홈이 다시 로그인 화면으로 보냅니다.
 */
const resolveBackPath = (state: unknown) => {
  const from = (state as Partial<DataSourcesLinkState> | null)?.from;

  // 앱 안의 경로만 받습니다. `//` 로 시작하면 다른 호스트로 해석될 수 있습니다.
  if (
    typeof from === "string" &&
    from.startsWith("/") &&
    !from.startsWith("//")
  ) {
    return from;
  }

  return "/";
};

export function DataSourcesPage() {
  const location = useLocation();

  return (
    <main className={styles.page}>
      <Header backTo={resolveBackPath(location.state)} title="데이터 출처" />

      <div className={`${pageContent} ${styles.content}`}>
        <header className={styles.introduction}>
          <h2 className={styles.introductionTitle}>오이소가 사용하는 데이터</h2>
          <p className={styles.summary}>
            오이소는 한국관광공사 공공데이터와 외부 API를 활용해 부산 여행
            코스를 추천합니다. 서비스에 사용한 데이터와 쓰임새를 안내합니다.
          </p>
        </header>

        <ul className={styles.sourceList}>
          {DATA_SOURCES.map((source) => (
            <li key={source.name} className={styles.sourceCard}>
              <span className={styles.providerBadge}>{source.provider}</span>
              <h3 className={styles.sourceName}>{source.name}</h3>
              <p className={styles.description}>{source.description}</p>

              <p className={styles.usageLabel}>쓰이는 곳</p>
              <ul className={styles.usageList}>
                {source.usages.map((usage) => (
                  <li key={usage}>{usage}</li>
                ))}
              </ul>

              <p className={styles.license}>{source.license}</p>
            </li>
          ))}
        </ul>

        <section className={styles.otherServices}>
          <h3 className={styles.otherServicesTitle}>그 밖에 사용하는 서비스</h3>
          <ul className={styles.usageList}>
            {OTHER_SERVICES.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </section>

        <p className={styles.notice}>
          추천 코스의 운영시간, 혼잡도, 이동 시간은 제공받은 데이터를 바탕으로
          한 참고 정보이며 실제와 다를 수 있습니다.
        </p>
      </div>
    </main>
  );
}
