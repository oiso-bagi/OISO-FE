import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import XIcon from "@/shared/icons/x.svg?react";

import type { RecommendedRouteStop } from "../api/types/recommendedRoute";
import {
  toKakaoMapDirectionsUrl,
  toKakaoMapSearchUrl,
} from "../utils/kakaoMapLink";
import { formatDuration, formatPrice } from "../utils/routeFormat";

import * as styles from "./StopDetailSheet.css";

interface StopDetailSheetProps {
  stop: RecommendedRouteStop;
  /** 다일 코스면 몇 일차 경유지인지 함께 보여 줍니다. */
  isMultiDay: boolean;
  onClose: () => void;
}

/** 0원은 입장료·이용료가 없는 장소입니다. 값이 없는 것(null)과 구분합니다. */
const formatPlacePrice = (value: number) =>
  value === 0 ? "무료" : formatPrice(value);

/**
 * 경유지 장소 정보 바텀시트.
 *
 * 목록은 한 줄에 이름·카테고리·운영시간만 담아, 머무는 시간과 비용, 관광지
 * 가격 대비 절약액은 여기서 보여 줍니다. 주소·사진은 서버가 아직 내려주지
 * 않아 카카오맵 장소 페이지로 연결합니다.
 *
 * 하단 네비와 지도 위로 올라와야 해서 body 에 붙입니다.
 */
export function StopDetailSheet({
  stop,
  isMultiDay,
  onClose,
}: StopDetailSheetProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * 열리면 닫기 버튼으로 초점을 옮기고, 닫히면 시트를 연 경유지로 되돌립니다.
   * 키보드·스크린리더 사용자가 시트가 열린 걸 모른 채 뒤 목록을 돌지 않게
   * 합니다.
   */
  useEffect(() => {
    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const hasCoordinates = stop.latitude !== null && stop.longitude !== null;

  const touristPremiumWon = stop.touristPremiumWon ?? null;
  const savedPriceWon = stop.savedPriceWon ?? null;
  const hasSaving =
    touristPremiumWon !== null &&
    touristPremiumWon > 0 &&
    savedPriceWon !== null &&
    savedPriceWon > 0;
  const hasPrice = stop.estimatedPriceWon != null || hasSaving;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={styles.sheet}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.handle} aria-hidden />

        <header className={styles.header}>
          <span className={styles.order}>{stop.sequence}</span>

          <div className={styles.titleArea}>
            <h2 id={titleId} className={styles.title}>
              {stop.placeName}
            </h2>

            <div className={styles.tagList}>
              {isMultiDay && (
                <span className={styles.tag}>{stop.dayNumber}일차</span>
              )}
              {stop.category && (
                <span className={styles.tag}>{stop.category}</span>
              )}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            aria-label="장소 정보 닫기"
            onClick={onClose}
          >
            <XIcon className={styles.closeIcon} aria-hidden />
          </button>
        </header>

        <dl className={styles.infoList}>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>운영시간</dt>
            <dd className={styles.infoValue}>
              {stop.operatingHours ?? "정보 없음"}
            </dd>
          </div>

          {stop.stayMinutes != null && (
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>머무는 시간</dt>
              <dd className={styles.infoValue}>
                {formatDuration(stop.stayMinutes)}
              </dd>
            </div>
          )}

          {stop.estimatedPriceWon != null && (
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>예상 비용</dt>
              <dd className={styles.infoValue}>
                {formatPlacePrice(stop.estimatedPriceWon)}
              </dd>
            </div>
          )}
        </dl>

        {hasSaving && (
          <div className={styles.savingBox}>
            <p className={styles.savingTitle}>
              관광지 가격보다 {formatPrice(savedPriceWon)} 아껴요
            </p>
            <p className={styles.savingDescription}>
              관광지 프리미엄 {formatPrice(touristPremiumWon)} 기준
            </p>
          </div>
        )}

        <div className={styles.actions}>
          <a
            className={`${styles.actionLink} ${styles.primaryActionLink}`}
            href={toKakaoMapSearchUrl(stop.placeName)}
            target="_blank"
            rel="noopener noreferrer"
          >
            카카오맵에서 장소 보기
          </a>

          {hasCoordinates && (
            <a
              className={styles.actionLink}
              href={toKakaoMapDirectionsUrl(
                stop.placeName,
                stop.latitude as number,
                stop.longitude as number,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              길찾기
            </a>
          )}
        </div>

        <p className={styles.notice}>
          {hasPrice && "비용은 예상 금액이라 실제와 다를 수 있어요. "}
          장소 정보 출처: ⓒ한국관광공사
        </p>
      </section>
    </div>,
    document.body,
  );
}
