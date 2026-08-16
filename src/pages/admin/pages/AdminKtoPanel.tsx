import { useEffect, useState } from "react";

import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { ConfirmDialog } from "../components/ConfirmDialog";
import * as styles from "../components/ui.css";
import {
  useAdminKtoStatus,
  useTriggerKtoCollect,
} from "../hooks/useAdminDashboard";
import { toAdminErrorMessage } from "../lib/adminCache";
import { formatDateTime, formatNumber, formatRemaining } from "../lib/format";

export function AdminKtoPanel() {
  const statusQuery = useAdminKtoStatus();
  const trigger = useTriggerKtoCollect();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const status = statusQuery.data;
  const cooldownUntilMs = status?.cooldownUntil
    ? new Date(status.cooldownUntil).getTime()
    : null;

  /**
   * 쿨타임이 남아 있는 동안만 1초마다 다시 그려 남은 시간을 갱신합니다.
   *
   * 끝나면 타이머를 멈추고 현황을 한 번 다시 읽습니다. 폴링은 수집 중일 때만
   * 도는데 수집은 몇 초 만에 끝나고 쿨타임은 10분이라, 이때 재조회하지 않으면
   * 화면의 사용량·쿨타임이 계속 낡은 값으로 남습니다.
   */
  const [now, setNow] = useState(() => Date.now());
  const { refetch } = statusQuery;

  useEffect(() => {
    if (cooldownUntilMs === null || cooldownUntilMs <= Date.now()) return;

    const timer = setInterval(() => {
      const current = Date.now();

      setNow(current);

      if (current >= cooldownUntilMs) {
        clearInterval(timer);
        void refetch();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownUntilMs, refetch]);

  const remaining =
    cooldownUntilMs === null ? null : formatRemaining(cooldownUntilMs, now);

  const isCollecting = status?.isCollecting ?? false;
  const isQuotaExhausted = (status?.remainingCount ?? 0) <= 0;

  const isTriggerDisabled =
    statusQuery.isPending ||
    statusQuery.isError ||
    isCollecting ||
    remaining !== null ||
    isQuotaExhausted ||
    trigger.isPending;

  const note = statusQuery.isError
    ? "현황을 불러오지 못해 수집을 실행할 수 없어요."
    : isCollecting
      ? "수집이 진행 중입니다. 끝나면 자동으로 갱신됩니다."
      : remaining !== null
        ? `쿨타임이 ${remaining} 남았어요.`
        : isQuotaExhausted
          ? "오늘 사용 가능한 쿼터를 모두 사용했어요."
          : "혼잡도 데이터를 지금 한 번 수집합니다.";

  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>KTO 공공데이터 배치</h2>

      {trigger.error && (
        <p className={styles.inlineError} role="alert">
          {toAdminErrorMessage(trigger.error, "수집을 시작하지 못했어요.")}
        </p>
      )}

      <div className={styles.sectionBody}>
        <div className={styles.ktoGrid}>
          <div className={styles.ktoField}>
            <span className={styles.ktoFieldLabel}>일일 한도</span>
            <span className={styles.ktoFieldValue}>
              {status ? formatNumber(status.dailyLimit) : "—"}
            </span>
          </div>

          <div className={styles.ktoField}>
            <span className={styles.ktoFieldLabel}>사용</span>
            <span className={styles.ktoFieldValue}>
              {status ? formatNumber(status.usedCount) : "—"}
            </span>
          </div>

          <div className={styles.ktoField}>
            <span className={styles.ktoFieldLabel}>잔여</span>
            <span className={styles.ktoFieldValue}>
              {status ? formatNumber(status.remainingCount) : "—"}
            </span>
          </div>

          <div className={styles.ktoField}>
            <span className={styles.ktoFieldLabel}>마지막 수집</span>
            <span className={styles.ktoNote}>
              {status?.lastCollectedAt
                ? formatDateTime(status.lastCollectedAt)
                : "기록 없음"}
            </span>
          </div>

          <div className={styles.ktoField}>
            <span className={styles.ktoFieldLabel}>마지막 결과</span>
            <span>
              {status?.lastCollectStatus ? (
                <Badge
                  tone={
                    status.lastCollectStatus === "SUCCESS"
                      ? "success"
                      : "danger"
                  }
                >
                  {status.lastCollectStatus === "SUCCESS" ? "성공" : "실패"}
                </Badge>
              ) : (
                <span className={styles.cellMuted}>—</span>
              )}
            </span>
          </div>

          <div className={styles.ktoField}>
            <span className={styles.ktoFieldLabel}>현재 상태</span>
            <span>
              {isCollecting ? (
                <Badge tone="accent">수집 중</Badge>
              ) : (
                <Badge>대기</Badge>
              )}
            </span>
          </div>
        </div>

        <div className={styles.ktoFooter}>
          <Button
            tone="primary"
            disabled={isTriggerDisabled}
            onClick={() => setIsConfirmOpen(true)}
          >
            {isCollecting ? "수집 중…" : "수동 수집 실행"}
          </Button>
          <span className={styles.ktoNote}>{note}</span>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="지금 수집을 실행할까요?"
        // 외부 API 쿼터를 소모하는 동작이라 남은 양을 함께 보여 줍니다.
        description={`KTO 공공데이터를 즉시 수집합니다. 오늘 남은 쿼터 ${
          status ? formatNumber(status.remainingCount) : "-"
        }건 중 일부를 사용하며, 실행 후에는 10분간 다시 실행할 수 없어요.`}
        confirmLabel="수집 실행"
        isPending={trigger.isPending}
        onConfirm={() => {
          trigger.mutate();
          setIsConfirmOpen(false);
        }}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </section>
  );
}
