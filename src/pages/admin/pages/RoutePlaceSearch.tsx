import { useEffect, useRef, useState } from "react";

import * as styles from "../components/ui.css";
import { useAdminPlaceSearch } from "../hooks/useAdminContents";
import { useDebouncedValue } from "../lib/useDebouncedValue";
import type { AdminPlace } from "../types";

interface RoutePlaceSearchProps {
  /** 이미 담은 장소는 다시 담지 못하게 표시합니다. */
  addedPlaceIds: Set<string>;
  onAdd: (place: AdminPlace) => void;
}

/** 목록 끝에 닿기 조금 전에 다음 페이지를 불러와, 스크롤이 멈추지 않게 합니다. */
const LOAD_MORE_MARGIN = "0px 0px 120px 0px";

export function RoutePlaceSearch({
  addedPlaceIds,
  onAdd,
}: RoutePlaceSearchProps) {
  /**
   * 이 검색은 폼 안에서만 쓰고 공유할 일이 없어 URL 에 넣지 않습니다.
   * 목록 화면과 달리 "이 검색어로 연 화면" 을 주고받을 일이 없습니다.
   */
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword);

  const placesQuery = useAdminPlaceSearch({
    q: debouncedKeyword || undefined,
    // 노출 중지된 장소는 코스에 담을 수 없습니다.
    isActive: true,
  });

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = placesQuery;

  /**
   * 페이지를 이어 붙이는 동안 서버 목록이 바뀌면(장소 노출 변경 등) 같은 장소가
   * 두 페이지에 걸쳐 나올 수 있어 한 번만 보여 줍니다.
   */
  const seenPlaceIds = new Set<string>();
  const items = (placesQuery.data?.pages ?? [])
    .flatMap((page) => page.items)
    .filter((place) => {
      if (seenPlaceIds.has(place.id)) return false;

      seenPlaceIds.add(place.id);
      return true;
    });

  const listRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 검색어가 바뀌면 새 결과의 처음부터 보여 줍니다.
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [debouncedKeyword]);

  /**
   * 결과 목록(자체 스크롤 영역) 끝이 보이면 다음 페이지를 불러옵니다.
   *
   * 다음 페이지 요청이 실패하면 멈춥니다. 끝이 계속 보이는 상태라 자동으로
   * 다시 부르면 실패 요청이 끝없이 반복되므로, 아래 "다시 시도" 로 넘깁니다.
   */
  useEffect(() => {
    const root = listRef.current;
    const target = loadMoreRef.current;

    if (!root || !target) return;
    if (!hasNextPage || isFetchingNextPage || isFetchNextPageError) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void fetchNextPage();
      },
      { root, rootMargin: LOAD_MORE_MARGIN },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError]);

  const stateMessage = placesQuery.isPending
    ? "불러오는 중…"
    : placesQuery.isError && items.length === 0
      ? "장소를 불러오지 못했어요."
      : items.length === 0
        ? "조건에 맞는 장소가 없어요."
        : null;

  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>장소 검색</h2>

      <div className={styles.filterBar}>
        <input
          type="search"
          className={styles.searchInput}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="장소명 또는 주소 검색"
          aria-label="장소 검색"
        />
      </div>

      <div ref={listRef} className={styles.searchResultList}>
        {stateMessage ? (
          <p className={styles.tableStateCell}>{stateMessage}</p>
        ) : (
          <>
            {items.map((place) => {
              const isAdded = addedPlaceIds.has(place.id);

              return (
                <button
                  key={place.id}
                  type="button"
                  className={styles.searchResultItem}
                  disabled={isAdded}
                  onClick={() => onAdd(place)}
                >
                  <span className={styles.stopName}>
                    <span>{place.name}</span>
                    <span
                      className={`${styles.cellMuted} ${styles.cellEllipsis}`}
                    >
                      {place.address}
                    </span>
                  </span>

                  <span className={styles.cellMuted}>
                    {isAdded ? "담음" : "+ 담기"}
                  </span>
                </button>
              );
            })}

            {hasNextPage && (
              <div ref={loadMoreRef} className={styles.searchLoadMore}>
                {isFetchNextPageError ? (
                  <>
                    <span>더 불러오지 못했어요.</span>
                    <button
                      type="button"
                      className={styles.searchLoadMoreRetry}
                      onClick={() => void fetchNextPage()}
                    >
                      다시 시도
                    </button>
                  </>
                ) : (
                  <span aria-live="polite">
                    {isFetchingNextPage ? "더 불러오는 중…" : ""}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
