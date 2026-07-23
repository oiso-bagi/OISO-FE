# AGENTS.md

이 문서는 OISO-FE 저장소에서 AI 에이전트가 작업할 때 따라야 할 프로젝트별 기준입니다.

## 프로젝트 개요

- OISO-FE는 Vite 기반 React 19 프론트엔드 프로젝트입니다.
- TypeScript, React Router, TanStack Query, Axios, vanilla-extract, oxlint를 사용합니다.
- 현재 구현된 주요 화면은 홈, 추천 코스, 저장, 설문, 대시보드, 로그인 페이지입니다.

## 현재 구조

- `src/main.tsx`: React 애플리케이션 진입점
- `src/app/App.tsx`: 앱 루트 컴포넌트
- `src/app/router/router.tsx`: React Router 라우팅 설정
- `src/app/layout/`: 공통 레이아웃
- `src/app/providers/`: 앱 전역 provider
- `src/pages/`: 라우트 단위 페이지 컴포넌트
- `src/shared/api/client.ts`: Axios API client
- `src/shared/components/`: 공통 UI 컴포넌트
- `src/shared/styles/`: global style, theme, layout, typography
- `src/shared/assets/`: SVG 등 정적 소스 자산
- `public/`: Vite public asset
- `.github/`: PR, 이슈 템플릿과 GitHub Actions
- `docs/`: 프로젝트 컨벤션과 agent 운영 문서

## 작업 원칙

- 현재 Vite, React, TypeScript, vanilla-extract 구조를 유지합니다.
- 페이지는 `src/pages/*/*Page.tsx`에 두고 라우팅은 `src/app/router/router.tsx`에서 관리합니다.
- 공통 UI는 `src/shared/components/`에 두고, 화면 전용 UI는 우선 해당 page 폴더 가까이에 둡니다.
- API 호출은 `src/shared/api/client.ts`의 Axios client와 TanStack Query 기준을 따릅니다.
- 스타일은 CSS 파일이 아니라 vanilla-extract `*.css.ts` 파일을 사용합니다.
- 기존 사용자의 변경을 되돌리지 않습니다.
- `.env` 값, API key, token, 로컬 secret을 읽거나 출력하지 않습니다.

## 컨벤션 기준

- Git, issue, PR, branch, commit, naming, component export 기준은 기존 `docs/CONVENTION.md`를 그대로 따릅니다.
- typography와 vanilla-extract 관련 세부 기준은 기존 `docs/VANILLA_EXTRACT_TYPOGRAPHY.md`를 그대로 따릅니다.
- 이슈 템플릿과 PR 템플릿은 기존 `.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE.md` 형식을 유지합니다.
- 새 문서나 자동화는 위 기존 컨벤션과 템플릿 내용을 바꾸지 않는 범위에서만 추가합니다.

## React / UI 기준

- 라우트 추가 시 `src/app/router/router.tsx`와 페이지 컴포넌트를 함께 확인합니다.
- 서버 상태는 TanStack Query를 우선 사용하고 query key는 `src/shared/query/queryKeys.ts`에 맞춥니다.
- 공통 버튼, 카드, 헤더, 하단 내비게이션은 기존 shared 컴포넌트를 우선 재사용합니다.
- 색상, typography, spacing은 `src/shared/styles/`의 theme와 typography 기준을 우선합니다.
- UI 변경 시 데스크톱과 모바일 폭에서 텍스트 넘침, 겹침, 탭 가능한 영역을 확인합니다.
- SVG를 React 컴포넌트로 가져올 때는 현재 SVGR/Vite 설정과 `src/svg.d.ts`를 확인합니다.

## API 기준

- API base URL은 `VITE_API_BASE_URL` 환경변수를 사용합니다.
- API client나 인증 동작을 바꿀 때는 `withCredentials` 영향 범위를 확인합니다.
- 백엔드 응답 형태를 화면에 바로 흘리지 말고 필요한 경우 프론트엔드 타입으로 매핑합니다.
- 에러 메시지는 사용자에게 필요한 수준으로 정리하고, 내부 응답이나 민감한 값은 노출하지 않습니다.

## 테스트 및 검증 기준

- 현재 별도 테스트 스크립트는 없으므로 변경 범위에 맞춰 build와 lint를 우선 확인합니다.
- 라우팅, API client, 공통 컴포넌트 변경은 실제 화면 동작까지 확인합니다.
- UI 변경은 가능한 경우 스크린샷이나 브라우저 확인 결과를 PR에 남깁니다.

## 검증 명령

가능하면 변경 범위에 맞춰 아래 명령을 사용합니다.

```bash
pnpm run build
pnpm run lint
pnpm run format:check
```

문서만 수정한 경우 최소한 다음을 확인합니다.

```bash
git diff --check
```

## 리뷰 및 수정 우선순위

다음 문제를 우선적으로 찾고 수정합니다.

- 실제 런타임 버그
- 라우팅 또는 화면 접근 흐름 깨짐
- API 계약 깨짐
- 사용자 입력, 인증, 환경변수 관련 오류
- 반응형 UI 깨짐, 텍스트 겹침, 접근성 저하
- 빌드 또는 정적 분석 실패
- 현재 구조와 어긋나는 책임 분리

단순 취향, 과한 추상화, 현재 기능 범위를 벗어난 대규모 리팩터링은 피합니다.

## 생성물과 제외 대상

다음 파일이나 디렉터리는 보통 직접 수정하지 않습니다.

- `node_modules/`
- `dist/`
- `coverage/`
- `*.tsbuildinfo`
- lockfile은 의존성 변경이 있을 때만 수정합니다.

## 현재 주의사항

- 저장소에는 `pnpm-lock.yaml`이 있습니다. 의존성 작업 전 package manager 기준을 확인합니다.
- `package.json` 스크립트는 npm 명령으로도 실행 가능하지만, lockfile 갱신은 pnpm 기준으로 검토합니다.
- 새로 작성하는 문서는 UTF-8 한국어로 저장합니다.
- README나 문서보다 실제 `src/`, `package.json`, `vite.config.ts`, `tsconfig*.json`을 구현 판단의 최종 근거로 봅니다.
