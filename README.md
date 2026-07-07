# OISO-FE

OISO 서비스의 프론트엔드 레포지토리입니다.

## Tech Stack

- React
- TypeScript
- Vite
- Vanilla Extract
- React Router
- TanStack Query
- Axios
- pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

## Folder Structure

```src/
├─ app/
├─ pages/
├─ shared/
└─ main.tsx
```

### 1. Code Convention

- [Code Convention](./docs/CONVENTION.md)

### 2. 컴포넌트 작성 규칙

컴포넌트는 `named export`를 사용합니다.

```tsx
export function Button() {
  return <button>Button</button>;
}
```

`default export`는 사용하지 않습니다.

```tsx
// ❌ 사용하지 않음
export default Button;
```

```tsx
// ✅ 권장
export function Button() {
  return <button>Button</button>;
}
```

컴포넌트명은 `PascalCase`를 사용합니다.

```tsx
export function HomePage() {
  return <div>Home Page</div>;
}
```

---

### 3. Import 순서

Import는 아래 순서를 따릅니다.

1. 외부 라이브러리
2. 내부 절대경로
3. 상대경로
4. 스타일 파일

```tsx
// 1. 외부 라이브러리
import { useState } from "react";

// 2. 내부 절대경로
import { Button } from "@/shared/components/button/Button";

// 3. 상대경로
import { useHomeData } from "./hooks/useHomeData";

// 4. 스타일 파일
import * as styles from "./HomePage.css";
```

---

### 4. 스타일 규칙

스타일은 `Vanilla Extract`를 사용합니다.

컴포넌트 스타일 파일은 컴포넌트 파일과 같은 폴더에 작성합니다.

```txt
Button.tsx
Button.css.ts
```

스타일 파일명은 `컴포넌트명.css.ts` 형식을 따릅니다.

```txt
HomePage.tsx
HomePage.css.ts
```

예시:

```ts
// Button.css.ts
import { style } from "@vanilla-extract/css";

export const button = style({
  padding: "12px 16px",
  borderRadius: "8px",
  fontSize: "16px",
});
```

```tsx
// Button.tsx
import * as styles from "./Button.css";

export function Button() {
  return <button className={styles.button}>Button</button>;
}
```

---

### 5. 타입 규칙

컴포넌트의 props 타입은 컴포넌트 파일 내부에 작성합니다.

```tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

여러 파일에서 재사용되는 타입은 별도 파일로 분리합니다.

```txt
types/
└─ user.ts
```

```ts
export type User = {
  id: number;
  name: string;
  email: string;
};
```

Boolean 타입 변수는 `is`, `has`, `can`, `should`를 사용합니다.

```ts
const isOpen = true;
const hasToken = false;
const canSubmit = true;
const shouldShowModal = false;
```

---

### 6. 함수 네이밍

이벤트 핸들러 함수는 `handle`로 시작합니다.

```tsx
const handleClickButton = () => {
  console.log("button clicked");
};
```

```tsx
const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};
```

API 요청 함수는 동사 + 도메인 형태로 작성합니다.

```ts
const getUserInfo = async () => {};
const postLogin = async () => {};
const patchUserProfile = async () => {};
const deleteSavedRoute = async () => {};
```

커스텀 훅은 `use`로 시작합니다.

```ts
const useLoginForm = () => {};
const useSavedRoutes = () => {};
```
