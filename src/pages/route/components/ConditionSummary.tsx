import { Link } from "react-router-dom";

import * as styles from "./ConditionSummary.css";

interface ConditionSummaryProps {
  durationDays: number;
  dailyBudgetWon: number;
  /** 화면에 보여 줄 여행 테마 이름. 한글로 들어옵니다. */
  travelStyleNames: string[];
  /** 조건을 고치러 갈 경로 */
  editTo: string;
}

/**
 * 어떤 조건으로 찾은 추천인지 보여 주고, 그 자리에서 고치게 합니다.
 *
 * 조건은 설문 화면이 저장하고 화면 어디에도 드러나지 않아, 사용자가 자기가
 * 무엇으로 검색했는지 알 수 없었습니다.
 */
export function ConditionSummary({
  durationDays,
  dailyBudgetWon,
  travelStyleNames,
  editTo,
}: ConditionSummaryProps) {
  const parts = [
    `${durationDays}일`,
    `하루 ${dailyBudgetWon.toLocaleString("ko-KR")}원`,
  ];

  if (travelStyleNames.length > 0) parts.push(travelStyleNames.join(", "));

  return (
    <div className={styles.summary}>
      <p className={styles.conditionText}>{parts.join(" · ")}</p>

      <Link to={editTo} className={styles.editButton}>
        조건 수정
      </Link>
    </div>
  );
}
