/**
 * 일차별 색.
 *
 * 지도 마커·경로선과 일차 선택 탭이 같은 색을 써야 "1일차 = 파랑" 이 눈에
 * 남습니다. 한 곳에서만 정의해 두 화면이 어긋나지 않게 합니다.
 */

/** 최대 5일차까지 서로 구분되는 색 */
const DAY_COLORS = ["#1E88E5", "#FB8C00", "#8E24AA", "#43A047", "#00ACC1"];

export const getDayColor = (dayNumber: number) =>
  DAY_COLORS[(dayNumber - 1) % DAY_COLORS.length];

/** 일차 색 위에 얹는 글자색. 어두운 색이 섞여 있어 흰색으로 통일합니다. */
export const DAY_COLOR_FOREGROUND = "#FFFFFF";
