/**
 * Common Layout Styles
 *
 * 사용 예시)
 * import { pageContent } from "@/shared/styles/layout.css";
 *
 * export function HomePage() {
 *   return (
 *     <main className={pageContent}>
 *
 *     </main>
 *   );
 * }
 */

/**
  * pageContent
- 좌우 페이지 여백(16px)을 제공합니다.
- 내부 컴포넌트는 width: 100%로 사용하는 것을 권장합니다.
- 지도(Map) 등 전체 화면을 사용하는 페이지에는 적용하지 않습니다.
  */

import { style } from "@vanilla-extract/css";

import { vars } from "./theme.css";

export const pageContent = style({
  width: "100%",
  paddingInline: vars.space.md, // 16px
  boxSizing: "border-box",
});
