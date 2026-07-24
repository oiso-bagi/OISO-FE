import { useNavigate } from "react-router-dom";

import DownIcon from "@/shared/assets/svg/down.svg?react";
import { Skeleton } from "@/shared/components/Skeleton/Skeleton";
import { MiniCardListSkeleton } from "@/shared/components/Skeleton/MiniCardSkeleton";
import { formatPrice } from "@/pages/route/utils/routeFormat";

import { SavedRouteSummaryCard } from "./components/SavedRouteSummaryCard";
import { useHomeSummary } from "./hooks/useHomeSummary";

import * as styles from "./HomePage.css";

export function HomePage() {
  const navigate = useNavigate();

  const { data, isPending, isError } = useHomeSummary();

  const savedRoutes = data?.savedRoutes;

  const handleStartPlanning = () => {
    // TODO(확인 필요): 여행 계획 시작 CTA 이동 경로. 우선 /survey 로 가정.
    navigate("/survey");
  };

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <img className={styles.oisoBadge} src="/oiso_logo.svg" alt="오이소" />

          <div className={styles.heroTexts}>
            <h1 className={styles.heroTitle}>부산으로 오이소 ~</h1>
            <p className={styles.heroSubtitle}>
              나만의 똑똑한 여행을 시작하세요
            </p>
          </div>
        </div>

        <button
          type="button"
          className={styles.ctaButton}
          onClick={handleStartPlanning}
        >
          <span aria-hidden>+</span>
          여행 계획 시작하기
        </button>
      </header>

      <section className={styles.savingCard}>
        <div className={styles.savingCardHeader}>
          <span className={styles.savingIconBox}>
            <DownIcon className={styles.savingIcon} aria-hidden />
          </span>

          <div className={styles.savingTexts}>
            <strong className={styles.savingCardTitle}>
              관광지 프리미엄 대비 아낀 돈
            </strong>
            <p className={styles.savingCardCaption}>저장된 루트 기준</p>
          </div>
        </div>

        {isPending ? (
          <Skeleton width="160px" height="34px" />
        ) : (
          <strong className={styles.savingAmount}>
            {formatPrice(data?.totalSavingAmount ?? null)}
          </strong>
        )}
      </section>

      <section className={styles.savedSection}>
        <div className={styles.savedSectionHeader}>
          <h2 className={styles.savedSectionTitle}>저장한 루트</h2>

          {savedRoutes && (
            <span className={styles.countBadge}>{savedRoutes.length}개</span>
          )}
        </div>

        {isPending && <MiniCardListSkeleton />}

        {isError && (
          <p className={styles.statusText}>
            루트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </p>
        )}

        {savedRoutes && savedRoutes.length === 0 && (
          <p className={styles.statusText}>아직 저장한 루트가 없어요.</p>
        )}

        {savedRoutes && savedRoutes.length > 0 && (
          <div className={styles.savedList}>
            {savedRoutes.map((route) => (
              <SavedRouteSummaryCard key={route.id} route={route} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
