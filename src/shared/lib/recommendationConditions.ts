/**
 * 설문에서 고른 추천 조건을 화면 간에 전달하는 저장소입니다.
 *
 * 설문 화면과 추천 화면이 라우트로 분리되어 있어 상태를 직접 넘길 수 없고,
 * 새로고침 후에도 같은 추천 결과를 보여줘야 하므로 localStorage 를 씁니다.
 * `onboardingFlow` 와 같은 방식입니다.
 *
 * - 설문 화면: 완료 시 `saveRecommendationConditions` 로 저장
 * - 추천 화면: `readRecommendationConditions` 로 읽어 조건 기반 추천을 요청하고,
 *   값이 없으면 전체 추천 목록을 보여줍니다.
 */

const storageKey = "oiso:recommendation-conditions";

export interface RecommendationConditions {
  /** 추천 옵션 API 의 travelStyles[].slug 값 */
  travelStyleSlugs: string[];
  durationDays: number;
  dailyBudgetWon: number;
}

const isValid = (value: unknown): value is RecommendationConditions => {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<RecommendationConditions>;

  return (
    Array.isArray(candidate.travelStyleSlugs) &&
    candidate.travelStyleSlugs.every((slug) => typeof slug === "string") &&
    typeof candidate.durationDays === "number" &&
    typeof candidate.dailyBudgetWon === "number"
  );
};

export const readRecommendationConditions =
  (): RecommendationConditions | null => {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return null;

      const parsed: unknown = JSON.parse(raw);

      // 저장 형식이 바뀌었거나 손상된 값이면 조건 없이 전체 목록으로 폴백합니다.
      return isValid(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

export const saveRecommendationConditions = (
  conditions: RecommendationConditions,
): boolean => {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(conditions));
    return true;
  } catch {
    // 시크릿 모드 등 저장이 막힌 환경.
    return false;
  }
};

export const clearRecommendationConditions = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // 삭제 실패는 무시합니다.
  }
};
