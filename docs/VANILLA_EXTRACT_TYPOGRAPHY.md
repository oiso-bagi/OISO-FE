# Typography 사용 가이드

이 프로젝트의 글자 스타일은 `src/shared/styles/typography.ts`와 `src/shared/styles/typography.css.ts`를 함께 사용합니다.

- `typography.css.ts`: 컴포넌트의 `className`에 넣는 클래스
- `typography.ts`: `.css.ts` 파일에서 조합하는 스타일 객체

## 컴포넌트에서 사용하기

컴포넌트에서는 필요한 typography 클래스를 `className`에 넣습니다.

```tsx
import * as typo from "@/shared/styles/typography.css";

export function Example() {
  return (
    <>
      <h1 className={typo.title1}>제목</h1>
      <p className={typo.body6}>본문</p>
      <span className={typo.detail2}>상세 텍스트</span>
    </>
  );
}
```

## CSS 파일에서 조합하기

`.css.ts` 파일에서 typography 스타일을 다른 스타일과 함께 사용할 때는 `typographyStyles`를 가져와 `style([ ... ])` 배열로 조합합니다.

```ts
import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typographyStyles } from "@/shared/styles/typography";

export const label = style([
  typographyStyles.detail4,
  {
    color: vars.color.neutral500,
  },
]);
```

## 잘못된 사용법

`typo.detail4` 같은 값은 `fontSize` 값이 아니라 vanilla-extract가 만든 클래스 이름입니다.
따라서 CSS 속성값으로 넣으면 안 됩니다.

```ts
// 잘못된 예
export const label = style({
  fontSize: typo.detail4,
});
```

## theme 토큰을 직접 쓰는 경우

대부분의 화면 텍스트는 `typography.css.ts` 또는 `typographyStyles`를 먼저 사용합니다.

단, 기존 typography 스타일과 의미가 맞지 않고 `fontSize`, `fontWeight`, `fontFamily` 같은 개별 값만 필요한 특수한 경우에는 `theme.css.ts`의 토큰을 직접 사용할 수 있습니다.

```ts
import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const customText = style({
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
});
```

## 정리

- `.tsx`에서는 `className={typo.body6}`처럼 사용합니다.
- `.css.ts`에서는 `style([typographyStyles.body6, { ... }])`처럼 조합합니다.
- `fontSize: typo.body6`처럼 클래스 이름을 CSS 속성값으로 넣지 않습니다.
- 새로운 typography 값이 필요하면 `typography.ts`에 스타일 객체를 추가하고, `typography.css.ts`에서 클래스로 export합니다.
