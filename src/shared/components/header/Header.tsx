/**
 * Header 공통 컴포넌트
 *
 * 사용 예시)
 * <Header
 *   backTo="/"
 *   title="저장한 루트"
 *   right={<Badge>3개</Badge>}
 * />
 *
 * - backTo : 뒤로가기 경로 (생략 시 뒤로가기 버튼 미표시)
 * - title  : 헤더 제목
 * - right  : 오른쪽 영역에 표시할 컴포넌트(버튼, Badge, 아이콘 등)
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import backIcon from "../../assets/svg/back.svg";
import * as typo from "@/shared/styles/typography.css";
import * as styles from "./Header.css";

type HeaderProps = {
  title?: string;
  backTo?: string;
  right?: ReactNode;
};

export function Header({ title, backTo, right }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {backTo && (
          <Link
            to={backTo}
            className={styles.backButton}
            aria-label="이전 페이지로 이동"
          >
            <img src={backIcon} alt="" className={styles.backIcon} />
          </Link>
        )}

        {title && <h1 className={`${typo.title2} ${styles.title}`}>{title}</h1>}
      </div>

      {right && <div className={styles.right}>{right}</div>}
    </header>
  );
}
