import type { RecommendationConditions } from "@/shared/lib/recommendationConditions";

import * as styles from "./ConditionSummary.css";

interface ConditionSummaryProps {
  conditions: RecommendationConditions;
  onEdit: () => void;
}

/**
 * 어떤 조건으로 찾은 추천인지 보여 주고, 그 자리에서 고치게 합니다.
 *
 * 조건은 설문 화면이 저장하고 화면 어디에도 드러나지 않아, 사용자가 자기가
 * 무엇으로 검색했는지 알 수 없었습니다.
 */
export function ConditionSummary({
  conditions,
  onEdit,
}: ConditionSummaryProps) {
  /** 이름을 저장하기 전에 설문을 마친 사용자는 slug 만 갖고 있습니다. */
  const styleNames =
    conditions.travelStyleLabels ?? conditions.travelStyleSlugs;

  const parts = [
    `${conditions.durationDays}일`,
    `하루 ${conditions.dailyBudgetWon.toLocaleString("ko-KR")}원`,
  ];

  if (styleNames.length > 0) parts.push(styleNames.join(", "));

  return (
    <div className={styles.summary}>
      <p className={styles.conditionText}>{parts.join(" · ")}</p>

      <button type="button" className={styles.editButton} onClick={onEdit}>
        조건 수정
      </button>
    </div>
  );
}
