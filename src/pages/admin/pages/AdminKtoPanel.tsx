import axios from "axios";
import { useEffect, useState } from "react";

import { getErrorStatus, toErrorMessage } from "@/shared/api/apiError";

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
import type {
  AdminKtoCollectResponse,
  KtoCollectResult,
  KtoSource,
} from "../types";

interface KtoSourceInfo {
  source: KtoSource;
  title: string;
  /** 공공데이터포털 서비스명. 신청서·기능설명서와 대조할 때 씁니다. */
  apiName: string;
  /** 적재 건수가 무엇을 센 값인지 */
  countLabel: string;
}

const KTO_SOURCES: KtoSourceInfo[] = [
  {
    source: "TOUR_API",
    title: "국문 관광정보",
    apiName: "KorService2",
    countLabel: "적재 장소",
  },
  {
    source: "RELATED_TOUR",
    title: "연관 관광지",
    apiName: "TarRlteTarService1",
    countLabel: "연관 관광지 연결 장소",
  },
  {
    source: "CONCENTRATION",
    title: "관광지 집중률",
    apiName: "TatsCnctrRateService",
    countLabel: "혼잡도 반영 장소",
  },
];

const RESULT_BADGE: Record<
  KtoCollectResult,
  { label: string; tone: "success" | "warning" | "danger" }
> = {
  SUCCESS: { label: "성공", tone: "success" },
  PARTIAL_SUCCESS: { label: "일부 성공", tone: "warning" },
  FAILURE: { label: "실패", tone: "danger" },
};

const COOLDOWN_MESSAGE =
  "10분 쿨타임 중이에요. 쿨타임이 끝난 뒤 다시 실행해 주세요.";

/**
 * 즉시 동기화 실패 문구.
 *
 * 서버는 쿼터 보호를 위해 10분 안에 다시 부르면 429 로 막습니다. API 요청
 * 오류는 상태 코드 기준의 정해 둔 문구를 쓰고, 목 데이터처럼 직접 던진 에러만
 * 그 메시지를 씁니다.
 */
const toCollectErrorMessage = (error: unknown) => {
  if (getErrorStatus(error) === 429) return COOLDOWN_MESSAGE;

  // 응답이 없는 네트워크 오류·타임아웃도 axios 원문 대신 안내 문구로 바꿉니다.
  if (axios.isAxiosError(error)) {
    return toErrorMessage(error, "수집을 시작하지 못했어요.");
  }

  return toAdminErrorMessage(error, "수집을 시작하지 못했어요.");
};

const toCollectDoneMessage = ({
  updatedCount,
  failureCount,
  cooldownUntil,
}: AdminKtoCollectResponse) =>
  [
    `수집을 마쳤어요. ${formatNumber(updatedCount)}건을 갱신했어요.`,
    failureCount > 0 ? `${formatNumber(failureCount)}건은 실패했어요.` : "",
    // 쿨타임 정보가 없으면 언제 다시 되는지 알 수 없어 안내하지 않습니다.
    cooldownUntil ? "10분 뒤 다시 실행할 수 있어요." : "",
  ]
    .filter(Boolean)
    .join(" ");

function KtoSourceCard({ source, title, apiName, countLabel }: KtoSourceInfo) {
  const statusQuery = useAdminKtoStatus(source);
  const trigger = useTriggerKtoCollect(source);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const status = statusQuery.data;
  const cooldownUntilMs = status?.cooldownUntil
    ? new Date(status.cooldownUntil).getTime()
    : null;

  /**
   * 쿨타임이 남아 있는 동안만 1초마다 다시 그려 남은 시간을 갱신합니다.
   *
   * 끝나면 타이머를 멈추고 현황을 한 번 다시 읽습니다. 폴링은 수집 중일 때만
   * 도는데 수집은 금방 끝나고 쿨타임은 10분이라, 이때 재조회하지 않으면
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

  const isCollecting = (status?.isCollecting ?? false) || trigger.isPending;
  const isQuotaExhausted = (status?.remainingCount ?? 0) <= 0;

  const isTriggerDisabled =
    statusQuery.isPending ||
    statusQuery.isError ||
    isCollecting ||
    remaining !== null ||
    isQuotaExhausted;

  const note = statusQuery.isError
    ? "현황을 불러오지 못해 동기화할 수 없어요."
    : isCollecting
      ? "수집이 진행 중입니다. 끝나면 자동으로 갱신됩니다."
      : remaining !== null
        ? `쿨타임이 ${remaining} 남았어요.`
        : isQuotaExhausted
          ? "오늘 사용 가능한 쿼터를 모두 사용했어요."
          : "매일 자동으로 수집하며, 필요하면 지금 바로 수집할 수 있어요.";

  const resultBadge = status?.lastCollectResult
    ? RESULT_BADGE[status.lastCollectResult]
    : null;

  return (
    <article className={styles.ktoCard}>
      <header className={styles.ktoCardHeader}>
        <div>
          <h3 className={styles.ktoCardTitle}>{title}</h3>
          <span className={styles.ktoCardApi}>{apiName}</span>
        </div>

        <Button
          tone="primary"
          disabled={isTriggerDisabled}
          onClick={() => setIsConfirmOpen(true)}
        >
          {isCollecting ? "동기화 중…" : "즉시 동기화"}
        </Button>
      </header>

      <div className={styles.ktoCardBody}>
        <div>
          <span className={styles.ktoFieldLabel}>{countLabel}</span>
          <p className={styles.ktoCount}>
            {status ? formatNumber(status.loadedCount) : "—"}
            <span className={styles.statUnit}>곳</span>
          </p>
        </div>

        <dl className={styles.ktoRows}>
          <div className={styles.ktoRow}>
            <dt className={styles.ktoFieldLabel}>오늘 호출</dt>
            <dd className={styles.ktoRowValue}>
              {status
                ? `${formatNumber(status.usedCount)} / ${formatNumber(status.dailyLimit)}`
                : "—"}
            </dd>
          </div>

          <div className={styles.ktoRow}>
            <dt className={styles.ktoFieldLabel}>마지막 수집</dt>
            <dd className={styles.ktoRowValue}>
              {status?.lastCollectedAt
                ? formatDateTime(status.lastCollectedAt)
                : "기록 없음"}
            </dd>
          </div>

          <div className={styles.ktoRow}>
            <dt className={styles.ktoFieldLabel}>마지막 결과</dt>
            <dd className={styles.ktoRowValue}>
              {resultBadge ? (
                <Badge tone={resultBadge.tone}>{resultBadge.label}</Badge>
              ) : (
                <span className={styles.cellMuted}>—</span>
              )}
            </dd>
          </div>

          <div className={styles.ktoRow}>
            <dt className={styles.ktoFieldLabel}>현재 상태</dt>
            <dd className={styles.ktoRowValue}>
              {isCollecting ? (
                <Badge tone="accent">수집 중</Badge>
              ) : (
                <Badge>대기</Badge>
              )}
            </dd>
          </div>
        </dl>

        {/* 실패·부분 성공이면 서버가 남긴 사유를 함께 보여 줍니다. */}
        {status?.lastMessage && status.lastCollectResult !== "SUCCESS" && (
          <p className={styles.ktoNote}>{status.lastMessage}</p>
        )}
      </div>

      <footer className={styles.ktoCardFooter}>
        {trigger.isError && (
          <p className={styles.inlineError} role="alert">
            {toCollectErrorMessage(trigger.error)}
          </p>
        )}

        {trigger.isSuccess && (
          <p className={styles.ktoDone} role="status">
            {toCollectDoneMessage(trigger.data)}
          </p>
        )}

        <span className={styles.ktoNote}>{note}</span>
      </footer>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title={`${title} 데이터를 지금 수집할까요?`}
        // 외부 API 쿼터를 소모하는 동작이라 남은 양을 함께 보여 줍니다.
        description={`오늘 남은 호출 ${
          status ? formatNumber(status.remainingCount) : "-"
        }건 중 일부를 사용하며, 실행 후에는 10분간 다시 실행할 수 없어요.`}
        confirmLabel="즉시 동기화"
        isPending={trigger.isPending}
        onConfirm={() => {
          trigger.mutate();
          setIsConfirmOpen(false);
        }}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </article>
  );
}

/**
 * KTO 공공데이터 적재 현황.
 *
 * 공공데이터 신청서에 "자동 배치 + 관리자 수동 즉시 수집 병행 운영"으로 적어
 * 두어, API 마다 현황과 즉시 동기화 버튼을 둡니다. 쿨타임·쿼터도 API 마다
 * 따로라 카드도 서로 독립적으로 동작합니다.
 */
export function AdminKtoPanel() {
  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>KTO 공공데이터 적재 현황</h2>

      <div className={`${styles.sectionBody} ${styles.ktoCards}`}>
        {KTO_SOURCES.map((info) => (
          <KtoSourceCard key={info.source} {...info} />
        ))}
      </div>
    </section>
  );
}
