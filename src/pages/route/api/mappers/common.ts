/** 추천 루트와 저장 루트 매퍼가 공유하는 변환 규칙입니다. */

import type { TransportationType } from "../types/recommendedRoute";

const CATEGORY_LABELS: Record<string, string> = {
  MARKET: "전통시장",
  CAFE: "카페",
  FOOD: "맛집",
  CULTURE: "문화·체험",
  NATURE: "자연·관광",
  EXPERIENCE: "체험",
  VIEWPOINT: "관광·포토",
  ETC: "기타",
};

/**
 * 카테고리 코드를 화면 라벨로 바꿉니다.
 *
 * 서버가 분류하지 못한 장소는 null 을 내려주므로 그대로 통과시켜 화면에서
 * 태그를 감춥니다. 여기서 "기타" 로 채우면 실제 `ETC` 와 구분되지 않습니다.
 * 알 수 없는 코드는 그대로 노출해, 새 카테고리가 추가돼도 빈칸이 되지 않게
 * 합니다.
 */
export const toCategoryLabel = (category: string | null) =>
  category === null ? null : (CATEGORY_LABELS[category] ?? category);

/** `openTime`/`closeTime` 을 화면이 쓰던 단일 문자열로 합칩니다. */
export const toOperatingHours = (
  openTime: string | null,
  closeTime: string | null,
): string | null => {
  if (openTime && closeTime) return `${openTime}-${closeTime}`;

  return openTime ?? closeTime;
};

/**
 * 서버는 절약 금액을 양수로 내려주지만, 화면은 "절약 -25,000원" 처럼 음수로
 * 표기해 왔습니다. 표기 규칙을 바꾸지 않도록 여기서 부호를 뒤집습니다.
 */
export const toSavingAmount = (savingsWon: number) =>
  savingsWon === 0 ? 0 : -savingsWon;

/** 상세 응답의 `"WALKING + BUS"` 를 목록과 같은 배열 형태로 되돌립니다. */
export const parseTransportType = (value: string): TransportationType[] =>
  value
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean) as TransportationType[];

/** 서버 sequence 는 0 부터라 화면 표기(1 부터)에 맞춰 올립니다. */
export const toDisplaySequence = (sequence: number) => sequence + 1;
