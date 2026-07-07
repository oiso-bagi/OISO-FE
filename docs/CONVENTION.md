## 커밋 컨벤션

| 형식 | `type: 메시지 (#이슈번호)`      |
| ---- | ------------------------------- |
| 예시 | `feat: 로그인 기능 구현 (#123)` |

이슈 번호가 없는 경우 `(#이슈번호)`는 생략할 수 있습니다.

```bash
feat: 로그인 기능 구현 (#123)
fix: 로그인 버튼 클릭 오류 수정
chore: vanilla extract 설정
```

| 타입       | 설명                         |
| ---------- | ---------------------------- |
| `feat`     | 새로운 기능                  |
| `fix`      | 버그 수정                    |
| `docs`     | 문서 변경                    |
| `style`    | 코드 포맷팅 (로직 변경 없음) |
| `refactor` | 리팩토링                     |
| `test`     | 테스트 추가/수정             |
| `chore`    | 빌드, 설정 등 기타           |
| `design`   | UI/UX 디자인 변경            |
| `ci`       | CI/CD 관련 변경              |
| `perf`     | 성능 개선                    |

---

## 브랜치 컨벤션

| 형식 | `type/설명-이슈번호` |
| ---- | -------------------- |
| 예시 | `feat/login-12`      |

브랜치명에는 공백을 사용하지 않습니다.

```bash
feat/login-12
fix/login-error-15
design/main-page-20
refactor/api-client-31
```

| 타입       | 설명               |
| ---------- | ------------------ |
| `feat`     | 새로운 기능        |
| `fix`      | 버그 수정          |
| `refactor` | 리팩토링           |
| `design`   | UI/UX 디자인 변경  |
| `chore`    | 빌드, 설정 등 기타 |
| `docs`     | 문서 작업          |
| `ci`       | CI/CD 관련 변경    |

---

## 네이밍 컨벤션

### 폴더 / 파일

| 대상                        | 규칙                | 예시                               |
| --------------------------- | ------------------- | ---------------------------------- |
| 폴더명                      | `kebab-case`        | `navigation-bar`, `server-actions` |
| 일반 파일 `.ts`             | `camelCase`         | `calculate.ts`, `apiClient.ts`     |
| 컴포넌트 파일 `.tsx`        | `PascalCase`        | `Button.tsx`, `ProductList.tsx`    |
| 페이지 컴포넌트 파일        | `PascalCase + Page` | `HomePage.tsx`, `LoginPage.tsx`    |
| Vanilla Extract 스타일 파일 | `컴포넌트명.css.ts` | `Button.css.ts`, `HomePage.css.ts` |

---

### 변수 / 함수

| 대상         | 규칙                              | 예시                                |
| ------------ | --------------------------------- | ----------------------------------- |
| 변수명       | `camelCase`                       | `userName`, `itemCount`             |
| 함수명       | `camelCase`                       | `fetchProducts()`, `handleSubmit()` |
| 상수명       | `UPPER_SNAKE_CASE`                | `MAX_COUNT`, `API_URL`              |
| boolean 변수 | `is`, `has`, `can`, `should` 사용 | `isOpen`, `hasToken`, `canSubmit`   |

```ts
const userName = "sandy";
const itemCount = 3;

const isOpen = true;
const hasToken = false;
const canSubmit = true;

const MAX_COUNT = 10;
```

---

### 컴포넌트

| 대상            | 규칙                | 예시                        |
| --------------- | ------------------- | --------------------------- |
| 컴포넌트명      | `PascalCase`        | `Layout`, `LoginForm`       |
| 페이지 컴포넌트 | `PascalCase + Page` | `HomePage`, `DashboardPage` |

컴포넌트는 `named export`를 사용합니다.

```tsx
export function ProductList() {
  return <div>상품 리스트</div>;
}
```

화살표 함수로 작성하는 경우에도 `named export`를 사용합니다.

```tsx
export const ProductList = () => {
  return <div>상품 리스트</div>;
};
```

`default export`는 사용하지 않습니다.

```tsx
// ❌ 사용하지 않음
const ProductList = () => {
  return <div>상품 리스트</div>;
};

export default ProductList;
```

```tsx
// ✅ 권장
export function ProductList() {
  return <div>상품 리스트</div>;
}
```

---

### Export 규칙

컴포넌트는 `named export`를 사용합니다.

```tsx
export function LoginForm() {
  return <form>로그인 폼</form>;
}
```

유틸 함수도 `named export`를 사용합니다.

```ts
export const fetchItems = () => {
  /* ... */
};

export const updateUser = () => {
  /* ... */
};
```

타입도 `named export`를 사용합니다.

```ts
export type User = {
  id: number;
  name: string;
  email: string;
};
```
