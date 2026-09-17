/**
 * 하단 네비게이션 크기.
 *
 * 네비가 화면 아래에 고정돼 있어, 콘텐츠 하단 여백·지도 페이지 높이·토스트
 * 위치가 모두 이 높이를 기준으로 계산됩니다. 한 곳이라도 어긋나면 마지막
 * 콘텐츠가 가려지거나 지도 페이지가 화면을 넘치므로 여기서만 값을 바꿉니다.
 */

const ICON_ROW_HEIGHT_PX = 72;
const ATTRIBUTION_HEIGHT_PX = 18;

/** 아이콘 줄 아래 데이터 출처 줄 높이 */
export const BOTTOM_NAV_ATTRIBUTION_HEIGHT = `${ATTRIBUTION_HEIGHT_PX}px`;

/** 홈 인디케이터 영역을 뺀 네비 높이 (아이콘 줄 + 데이터 출처 줄) */
export const BOTTOM_NAV_HEIGHT = `${ICON_ROW_HEIGHT_PX + ATTRIBUTION_HEIGHT_PX}px`;

/** 홈 인디케이터 영역까지 포함한 네비 높이 */
export const BOTTOM_NAV_TOTAL_HEIGHT = `calc(${BOTTOM_NAV_HEIGHT} + env(safe-area-inset-bottom, 0px))`;
