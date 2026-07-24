import type { ReactNode } from "react";

import TrashcanIcon from "@/shared/assets/svg/trashcan.svg?react";
import LocationIcon from "@/shared/assets/svg/location.svg?react";
import RecommendBadgeIcon from "@/shared/assets/svg/recommendBadge.svg?react";

import * as styles from "./RouteBox.css";

export interface RouteSummaryItem {
  label: string;
  value: string;
  variant?: "default" | "primary" | "secondary";
}

export interface RouteBoxProps {
  variant?: "default" | "editable";

  title: string;
  placeCount: number;
  distance: string;
  transportation: ReactNode;

  summaryItems: [
    // 무조건 4개. 튜플 타입으로 고정
    RouteSummaryItem,
    RouteSummaryItem,
    RouteSummaryItem,
    RouteSummaryItem,
  ];

  recommendationRate?: number;
  isRecommended?: boolean;

  isCompleted?: boolean;
  isExpanded?: boolean;

  /** 완료 토글·삭제 진행 중이면 해당 버튼을 비활성화합니다. */
  disabled?: boolean;

  // 펼쳐진 상태에서 표시할 경유지 목록 등을 전달
  // 사용하는 페이지에 넣기
  children?: ReactNode;

  onToggleExpanded: () => void;
  onToggleCompleted?: () => void;
  onDelete?: () => void;
}

export function RouteBox({
  variant = "default",
  title,
  placeCount,
  distance,
  transportation,
  summaryItems,
  recommendationRate,
  isRecommended = false,
  isCompleted = false,
  isExpanded = false,
  disabled = false,
  children,
  onToggleExpanded,
  onToggleCompleted,
  onDelete,
}: RouteBoxProps) {
  const isEditable = variant === "editable";
  const hasRecommendationRate = typeof recommendationRate === "number";

  return (
    <article className={styles.container}>
      {isEditable && (
        <div className={styles.editHeader}>
          <span className={styles.completedText}>여행을 완료하셨나요?</span>

          <button
            type="button"
            role="switch"
            className={styles.toggleButton}
            data-checked={isCompleted}
            aria-checked={isCompleted}
            aria-label={
              isCompleted ? "여행 완료 상태 취소" : "여행 완료 상태로 변경"
            }
            disabled={disabled}
            onClick={onToggleCompleted}
          >
            <span className={styles.toggleThumb} data-checked={isCompleted} />
          </button>

          <button
            type="button"
            className={styles.deleteButton}
            aria-label={`${title} 루트 삭제`}
            disabled={disabled}
            onClick={onDelete}
          >
            <TrashcanIcon className={styles.deleteIcon} aria-hidden />
          </button>
        </div>
      )}

      <div className={styles.titleRow} data-recommended={isRecommended}>
        <h3 className={styles.title}>{title}</h3>

        {hasRecommendationRate && (
          <span className={styles.recommendationRate}>
            추천도 {recommendationRate}%
          </span>
        )}

        {isRecommended && (
          <RecommendBadgeIcon
            className={styles.recommendBadge}
            role="img"
            aria-label="추천 루트"
          />
        )}
      </div>

      <div className={styles.routeInfo}>
        <span className={styles.routeInfoItem}>
          <LocationIcon className={styles.locationIcon} aria-hidden />
          {placeCount}개 장소
        </span>

        <span>{distance}</span>

        <span className={styles.transportation}>{transportation}</span>
      </div>

      <div className={styles.summaryList}>
        {summaryItems.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className={styles.summaryItem({
              variant: item.variant ?? "default",
            })}
          >
            <span className={styles.summaryLabel}>{item.label}</span>

            <strong className={styles.summaryValue}>{item.value ?? "-"}</strong>
          </div>
        ))}
      </div>

      {isExpanded ? (
        <>
          {children}
          <button
            type="button"
            className={styles.detailButton}
            onClick={onToggleExpanded}
            aria-expanded={true}
          >
            간단히 보기
            <span aria-hidden>↑</span>
          </button>
        </>
      ) : (
        <button
          type="button"
          className={styles.detailButton}
          onClick={onToggleExpanded}
          aria-expanded={false}
        >
          상세 보기
          <span aria-hidden>→</span>
        </button>
      )}
    </article>
  );
}
