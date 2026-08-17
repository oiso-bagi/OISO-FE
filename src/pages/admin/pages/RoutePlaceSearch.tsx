import { useState } from "react";

import * as styles from "../components/ui.css";
import { useAdminPlaces } from "../hooks/useAdminContents";
import { useDebouncedValue } from "../lib/useDebouncedValue";
import type { AdminPlace } from "../types";

interface RoutePlaceSearchProps {
  /** 이미 담은 장소는 다시 담지 못하게 표시합니다. */
  addedPlaceIds: Set<string>;
  onAdd: (place: AdminPlace) => void;
}

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

  const placesQuery = useAdminPlaces({
    page: 1,
    size: 20,
    q: debouncedKeyword || undefined,
    // 노출 중지된 장소는 코스에 담을 수 없습니다.
    isActive: true,
  });

  const items = placesQuery.data?.items ?? [];

  const stateMessage = placesQuery.isPending
    ? "불러오는 중…"
    : placesQuery.isError
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

      <div className={styles.searchResultList}>
        {stateMessage ? (
          <p className={styles.tableStateCell}>{stateMessage}</p>
        ) : (
          items.map((place) => {
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
          })
        )}
      </div>
    </section>
  );
}
