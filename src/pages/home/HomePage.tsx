import { useNavigate } from "react-router-dom";

import { CountUpAmount } from "@/shared/components/CountUpAmount/CountUpAmount";
import { Skeleton } from "@/shared/components/Skeleton/Skeleton";
import { MiniCardListSkeleton } from "@/shared/components/Skeleton/MiniCardSkeleton";
import { toErrorMessage } from "@/shared/api/apiError";

import { BurstSticker } from "./components/BurstSticker";
import { SavedRouteSummaryCard } from "./components/SavedRouteSummaryCard";
import { useHomeSummary } from "./hooks/useHomeSummary";

import * as styles from "./HomePage.css";

/** 노란 띠에 들어가는 문구. 서비스가 내세우는 세 가지입니다. */
const CLAIMS = [
  "관광지보다 쌉니다!!",
  "동선이 짧습니다!!",
  "로컬 가게 위주!!",
] as const;

export function HomePage() {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useHomeSummary();

  const savedRoutes = data?.savedRoutes;

  const handleStartPlanning = () => {
    // TODO(확인 필요): 여행 계획 시작 CTA 이동 경로. 우선 /survey 로 가정.
    navigate("/survey");
  };

  return (
    <div className={styles.container}>
      <header className={styles.banner}>
        <span className={styles.bannerTitle}>오이소 알뜰 대잔치</span>
        <img className={styles.bannerLogo} src="/oiso_logo.svg" alt="오이소" />
      </header>

      <div className={styles.content}>
        <section className={styles.savingPanel}>
          <BurstSticker
            className={styles.burst}
            topLine="가격"
            bottomLine="파괴"
          />

          <span className={styles.savingTag}>관광지 프리미엄 대비</span>

          <div className={styles.savingAmountRow}>
            {isPending && <Skeleton width="220px" height="50px" />}

            {/* 못 불러온 걸 0원으로 보여 주면 아래 오류 문구와 어긋납니다. */}
            {isError && <strong className={styles.savingAmount}>—</strong>}

            {data && (
              <CountUpAmount
                className={styles.savingAmount}
                value={data.totalSavingAmount}
                prefix="₩"
                unit=""
              />
            )}
          </div>

          {/* 아직 못 받았거나 실패한 걸 0개로 보여 주면 사실과 다릅니다. */}
          <p className={styles.savingCaption}>
            {isPending && "저장한 루트를 불러오는 중이에요"}
            {isError && "절약 정보를 불러오지 못했어요"}
            {data &&
              `저장한 루트 ${data.savedRouteCount}개 기준 · 오늘도 아꼈습니다`}
          </p>

          <ul className={styles.claimList}>
            {CLAIMS.map((claim) => (
              <li key={claim} className={styles.claim}>
                <svg
                  className={styles.claimMark}
                  viewBox="0 0 10 10"
                  aria-hidden
                >
                  <path
                    d="M0 1h10L5 9z"
                    fill="#FF4B1F"
                    stroke="#191512"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                {claim}
              </li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          className={styles.ctaButton}
          onClick={handleStartPlanning}
        >
          <svg className={styles.ctaMark} viewBox="0 0 12 12" aria-hidden>
            <path
              d="M2 1l8 5-8 5z"
              fill="#FFFCF2"
              stroke="#191512"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.ctaLabel}>지금 코스 짜러 가기</span>
        </button>

        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>저장한 루트</h2>
          {savedRoutes && (
            <span className={styles.listCount}>
              {data?.savedRouteCount ?? savedRoutes.length}개
            </span>
          )}
        </div>

        <div className={styles.list}>
          {isPending && (
            <div className={styles.skeletonRow}>
              <MiniCardListSkeleton />
            </div>
          )}

          {isError && (
            <p className={styles.statusText}>
              {toErrorMessage(
                error,
                "루트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
              )}
            </p>
          )}

          {savedRoutes && savedRoutes.length === 0 && (
            <p className={styles.statusText}>아직 저장한 루트가 없어요.</p>
          )}

          {savedRoutes?.map((route) => (
            <SavedRouteSummaryCard key={route.id} route={route} />
          ))}
        </div>
      </div>
    </div>
  );
}
