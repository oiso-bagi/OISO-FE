/**
 * Header 공통 컴포넌트
 *
 * 사용 예시)
 * <Header
 *   backTo="/"
 *   rightText="3개"
 *   rightVariant="count"
 * />
 *
 * - backTo : 뒤로가기 경로 (생략 시 뒤로가기 버튼 미표시)
 * - title  : 헤더 제목
 * - rightText: 오른쪽 또는 제목 옆에 표시할 내용
 * - rightVariant:
 *   - count: 제목 바로 옆에 표시
 *   - outline: 헤더 오른쪽 끝에 표시
 *   - accent: 헤더 오른쪽 끝에 표시
 * - onClickRight: 전달 시 rightText를 button으로 렌더링
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import backIcon from "../../assets/svg/back.svg";
import * as typo from "@/shared/styles/typography.css";
import * as styles from "./Header.css";

type HeaderRightVariant = "count" | "outline" | "accent";
// "count"     // 저장한 루트 3개
// "outline"   // 다시하기
// "accent"    // 로그아웃

type HeaderProps = {
  title?: string;
  backTo?: string;

  rightText?: ReactNode;
  rightVariant?: HeaderRightVariant;
  onClickRight?: () => void;
};

export function Header({
  title,
  backTo,
  rightText,
  rightVariant = "outline",
  onClickRight,
}: HeaderProps) {
  const isCountVariant = rightVariant === "count";

  const rightContent =
    rightText &&
    (onClickRight ? (
      <button
        type="button"
        className={styles.rightArea({
          variant: rightVariant,
        })}
        onClick={onClickRight}
      >
        {rightText}
      </button>
    ) : (
      <span
        className={styles.rightArea({
          variant: rightVariant,
        })}
      >
        {rightText}
      </span>
    ));

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

        {isCountVariant && rightContent}
      </div>

      {!isCountVariant && rightContent}
    </header>
  );
}
