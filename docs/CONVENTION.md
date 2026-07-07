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

## 이슈 컨벤션

이슈는 작업 단위별로 생성합니다.

### 이슈 제목 형식

```txt
[type] 작업 내용
```

### 이슈 제목 예시

```txt
[Feat] 로그인 페이지 구현
[Fix] 로그인 버튼 클릭 오류 수정
[Docs] README 수정
[Design] 메인 페이지 UI 구현
```

### 이슈 타입

| 타입       | 설명                         |
| ---------- | ---------------------------- |
| `Feat`     | 새로운 기능 구현             |
| `Fix`      | 버그 수정                    |
| `Docs`     | 문서 작성 및 수정            |
| `Design`   | UI/UX 디자인 작업            |
| `Refactor` | 코드 리팩토링                |
| `Chore`    | 설정, 패키지, 빌드 관련 작업 |
| `Test`     | 테스트 코드 작성 및 수정     |

### 이슈 작성 형식

```md
## 작업 내용

- 구현할 기능 또는 수정할 내용을 작성합니다.

## 작업 상세

- [ ] 작업 1
- [ ] 작업 2
- [ ] 작업 3

## 참고 사항

- 참고할 디자인, API 문서, 기타 사항을 작성합니다.
```

### 이슈 작성 예시

```md
## 작업 내용

- 로그인 페이지 UI를 구현합니다.

## 작업 상세

- [ ] 이메일 입력창 구현
- [ ] 비밀번호 입력창 구현
- [ ] 로그인 버튼 구현
- [ ] 로그인 API 연결

## 예상 작업기간

## 피그마 스크린샷

## 참고 사항

- Figma 로그인 페이지 디자인 참고
```

---

## PR 컨벤션

PR은 하나의 이슈 또는 하나의 작업 단위로 생성합니다.

### PR 제목 형식

```txt
[type] 작업 내용
```

### PR 제목 예시

```txt
[Feat] 로그인 페이지 구현
[Fix] 로그인 버튼 클릭 오류 수정
[Docs] 프로젝트 컨벤션 문서 추가
```

### PR 작성 형식

```md
## 작업 내용

- 이번 PR에서 작업한 내용을 작성합니다.

## 변경 사항

- 주요 변경 사항을 작성합니다.

## 확인 방법

- 리뷰어가 어떻게 확인하면 되는지 작성합니다.

## 스크린샷

- UI 변경 사항이 있는 경우 스크린샷을 첨부합니다.

## 관련 이슈

close #이슈번호
```

### PR 작성 예시

```md
## 작업 내용

- 로그인 페이지 UI를 구현했습니다.
- 로그인 API 요청 함수를 추가했습니다.

## 변경 사항

- `LoginPage.tsx` 추가
- `LoginForm` 컴포넌트 추가
- `postLogin` API 함수 추가

## 확인 방법

- `/login` 경로로 접속합니다.
- 이메일과 비밀번호를 입력합니다.
- 로그인 버튼 클릭 시 API 요청이 발생하는지 확인합니다.

## 스크린샷

- UI 변경 사항이 있는 경우 첨부합니다.

## 관련 이슈

close #12
```

### PR 규칙

- PR은 작업한 브랜치에서 `develop` 브랜치로 생성합니다.
- PR 생성 전 로컬에서 실행 여부를 확인합니다.
- 충돌이 발생한 경우 해결 후 리뷰를 요청합니다.
- 리뷰 반영 후 merge합니다.
- UI 변경이 있는 경우 스크린샷을 첨부합니다.

---

## Git Flow

브랜치는 `main`, `develop`, 작업 브랜치로 구분합니다.

### 브랜치 역할

| 브랜치       | 설명                                |
| ------------ | ----------------------------------- |
| `main`       | 배포 가능한 최종 코드가 있는 브랜치 |
| `develop`    | 개발 중인 코드가 모이는 브랜치      |
| `feat/*`     | 새로운 기능 개발 브랜치             |
| `fix/*`      | 버그 수정 브랜치                    |
| `refactor/*` | 리팩토링 브랜치                     |
| `design/*`   | UI/UX 작업 브랜치                   |
| `docs/*`     | 문서 작업 브랜치                    |
| `chore/*`    | 설정 및 기타 작업 브랜치            |

### 작업 흐름

```txt
main
  ↑
develop
  ↑
작업 브랜치
```

### 작업 순서

1. 이슈를 생성합니다.
2. `develop` 브랜치에서 최신 코드를 가져옵니다.
3. 작업 브랜치를 생성합니다.
4. 작업 후 커밋합니다.
5. 원격 브랜치에 push합니다.
6. GitHub에서 PR을 생성합니다.
7. 코드 리뷰 후 `develop` 브랜치에 merge합니다.
8. 배포 시점에 `develop` 브랜치를 `main` 브랜치에 merge합니다.

### 명령어 예시

```bash
# develop 브랜치로 이동
git checkout develop

# 최신 코드 가져오기
git pull origin develop

# 작업 브랜치 생성
git checkout -b feat/login-12

# 작업 후 파일 추가
git add .

# 커밋
git commit -m "feat: 로그인 페이지 구현 (#12)"

# 원격 브랜치에 push
git push origin feat/login-12
```

### 브랜치명 예시

```txt
feat/login-12
fix/login-error-15
design/home-page-20
refactor/api-client-31
docs/readme-3
chore/vanilla-extract-5
```

### Merge 규칙

- 작업 브랜치는 직접 `main`에 merge하지 않습니다.
- 모든 기능 작업은 PR을 통해 `develop`에 merge합니다.
- `main` 브랜치는 배포 가능한 상태만 유지합니다.
- PR merge 후 작업 브랜치는 삭제합니다.

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
