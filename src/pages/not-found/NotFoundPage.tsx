import { Link } from "react-router-dom";

import * as styles from "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="not-found-title">
        <div className={styles.statusBadge} aria-hidden="true">
          404
        </div>

        <h1 id="not-found-title" className={styles.title}>
          루트를 찾을 수 없어요
        </h1>
        <p className={styles.description}>
          요청하신 페이지가 없거나 이동했어요
        </p>

        <Link className={styles.homeLink} to="/">
          홈으로 돌아가기
        </Link>
      </section>
    </main>
  );
}
