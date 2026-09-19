import { useEffect, useId, useRef, useState } from "react";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";

import XIcon from "@/shared/icons/x.svg?react";

import type { RecommendedRouteStop } from "../api/types/recommendedRoute";
import { DAY_COLOR_FOREGROUND } from "../utils/dayColor";
import {
  toKakaoMapDirectionsUrl,
  toKakaoMapSearchUrl,
} from "../utils/kakaoMapLink";
import { formatPrice } from "../utils/routeFormat";

import * as styles from "./StopCallout.css";

interface StopCalloutProps {
  stop: RecommendedRouteStop;
  /** 핀에 적힌 번호. 일차 안에서의 방문 순서입니다. */
  markerNumber: number;
  markerColor: string;
  /** 다일 코스면 몇 일차 경유지인지 함께 보여 줍니다. */
  isMultiDay: boolean;
  onClose: () => void;
}

/** 0원은 입장료·이용료가 없는 장소입니다. 값이 없는 것(null)과 구분합니다. */
const formatPlacePrice = (value: number) =>
  value === 0 ? "무료" : formatPrice(value);

/**
 * 서비스 지역이 부산뿐이라 모든 주소 앞에 붙는 시·도 이름을 뺍니다. 태그 폭이
 * 좁아, 이것만 빼도 대부분의 주소가 한 줄에 들어옵니다.
 */
const toShortAddress = (address: string) =>
  address.replace(/^부산(광역시)?\s+/, "");

/**
 * 태그는 카카오 지도 위에 떠 있어, 주소를 옆으로 밀면 지도가 같이 끌려갑니다.
 * 지도는 자기 DOM 에서 바로 이벤트를 받으므로, React 보다 먼저 여기서 막습니다.
 * 휠도 막아야 주소 위에서 옆으로 굴릴 때 지도가 확대·축소되지 않습니다.
 */
const MAP_GESTURE_EVENTS = [
  "mousedown",
  "pointerdown",
  "touchstart",
  "touchmove",
  "wheel",
] as const;

/**
 * 주소 한 줄. 태그를 두 줄로 키우지 않고, 넘치면 옆으로 밀어 봅니다.
 * 뒤에 글자가 더 있으면 오른쪽 끝을 흐리게 해 밀 수 있다는 걸 보여 줍니다.
 */
function AddressRow({ address }: { address: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [hasMoreRight, setHasMoreRight] = useState(false);

  const measure = (scroller: HTMLDivElement) => {
    setIsOverflowing(scroller.scrollWidth > scroller.clientWidth + 1);
    setHasMoreRight(
      scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1,
    );
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollLeft = 0;
    measure(scroller);
  }, [address]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const stopPropagation = (event: Event) => event.stopPropagation();

    MAP_GESTURE_EVENTS.forEach((type) =>
      scroller.addEventListener(type, stopPropagation, { passive: true }),
    );

    return () =>
      MAP_GESTURE_EVENTS.forEach((type) =>
        scroller.removeEventListener(type, stopPropagation),
      );
  }, []);

  return (
    <div className={styles.addressRow}>
      <div
        ref={scrollerRef}
        className={styles.addressScroller}
        data-has-more={hasMoreRight}
        // 넘칠 때만 키보드로 초점을 옮겨 화살표로 밀 수 있게 합니다.
        tabIndex={isOverflowing ? 0 : undefined}
        onScroll={(event) => measure(event.currentTarget)}
      >
        {toShortAddress(address)}
      </div>
    </div>
  );
}

/**
 * 지도 핀 위에 붙는 장소 정보 태그.
 *
 * 화면을 가리는 시트 대신 핀 바로 위에 띄워, 이 장소가 코스의 어디쯤인지 보면서
 * 정보를 읽게 합니다. 지도 영역이 작아 한눈에 들어오는 값만 담고, 주소·사진은
 * 서버가 아직 내려주지 않아 카카오맵 장소 페이지로 연결합니다.
 */
export function StopCallout({
  stop,
  markerNumber,
  markerColor,
  isMultiDay,
  onClose,
}: StopCalloutProps) {
  const titleId = useId();

  const hasCoordinates = stop.latitude !== null && stop.longitude !== null;

  const touristPremiumWon = stop.touristPremiumWon ?? null;
  const savedPriceWon = stop.savedPriceWon ?? null;
  const hasSaving =
    touristPremiumWon !== null &&
    touristPremiumWon > 0 &&
    savedPriceWon !== null &&
    savedPriceWon > 0;
  const hasPriceRow = stop.estimatedPriceWon != null || hasSaving;

  const metaItems = [
    isMultiDay ? `${stop.dayNumber}일차` : null,
    stop.category,
    stop.operatingHours ?? "운영시간 정보 없음",
  ].filter((item): item is string => item !== null);

  return (
    <div className={styles.anchor}>
      <section className={styles.callout} aria-labelledby={titleId}>
        <header className={styles.headerRow}>
          <span
            className={styles.order}
            style={{
              backgroundColor: markerColor,
              color: DAY_COLOR_FOREGROUND,
            }}
            aria-hidden
          >
            {markerNumber}
          </span>

          <h3 id={titleId} className={styles.title}>
            {stop.placeName}
          </h3>

          <button
            type="button"
            className={styles.closeButton}
            aria-label="장소 정보 닫기"
            onClick={onClose}
          >
            <XIcon className={styles.closeIcon} aria-hidden />
          </button>
        </header>

        <p className={styles.metaRow}>{metaItems.join(" · ")}</p>

        {stop.address && <AddressRow address={stop.address} />}

        {hasPriceRow && (
          <div className={styles.priceRow}>
            {stop.estimatedPriceWon != null && (
              <span>예상 {formatPlacePrice(stop.estimatedPriceWon)}</span>
            )}

            {hasSaving && (
              <span
                className={styles.savingChip}
                title={`관광지 프리미엄 ${formatPrice(touristPremiumWon)} 기준`}
              >
                {formatPrice(savedPriceWon)} 절약
                <LuArrowDownRight
                  className={styles.arrowIcon}
                  strokeWidth={3}
                  aria-hidden
                />
              </span>
            )}
          </div>
        )}

        <div className={styles.linkRow}>
          <a
            className={styles.link}
            href={toKakaoMapSearchUrl(stop.placeName)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`카카오맵에서 ${stop.placeName} 보기 (새 창)`}
          >
            카카오맵
            <LuArrowUpRight
              className={styles.arrowIcon}
              strokeWidth={3}
              aria-hidden
            />
          </a>

          {hasCoordinates && (
            <a
              className={styles.link}
              href={toKakaoMapDirectionsUrl(
                stop.placeName,
                stop.latitude as number,
                stop.longitude as number,
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${stop.placeName} 길찾기 (새 창)`}
            >
              길찾기
              <LuArrowUpRight
                className={styles.arrowIcon}
                strokeWidth={3}
                aria-hidden
              />
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
