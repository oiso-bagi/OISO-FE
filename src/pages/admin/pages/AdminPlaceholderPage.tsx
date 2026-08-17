import { PageHeader } from "../components/PageHeader";
import * as styles from "../components/ui.css";

interface AdminPlaceholderPageProps {
  title: string;
  description: string;
  /** 후속 이슈에서 채울 내용 요약 */
  planned: string[];
}

/**
 * 후속 이슈에서 구현할 화면의 자리입니다.
 * 라우팅과 레이아웃이 먼저 동작하는지 확인하기 위해 둡니다.
 */
export function AdminPlaceholderPage({
  title,
  description,
  planned,
}: AdminPlaceholderPageProps) {
  return (
    <>
      <PageHeader title={title} description={description} />

      <div className={styles.placeholder}>
        <strong>이 화면은 후속 이슈에서 구현합니다.</strong>
        <span>{planned.join(" · ")}</span>
      </div>
    </>
  );
}
