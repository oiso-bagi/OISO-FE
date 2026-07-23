---
name: app-shared-component-workflow
description: OISO-FE의 src/shared/components 아래에 여러 페이지가 재사용하는 공통 컴포넌트를 만들거나 수정할 때 사용합니다.
---

# App Shared Component Workflow

한 페이지가 아니라 여러 페이지에서 재사용할 UI 컴포넌트를 만들 때 사용합니다.

## Check First

- `src/shared/components/**`
- 가까운 page-local 컴포넌트
- `src/shared/styles/theme.css.ts`
- `src/shared/styles/typography.css.ts`
- `docs/CONVENTION.md`

## Boundary

| 위치 | 사용 기준 |
| --- | --- |
| `src/pages/{page}/` | 한 페이지에서만 쓰는 UI |
| `src/shared/components/` | 여러 페이지에서 실제로 재사용하는 UI |

공통 컴포넌트에는 page route, API 호출, analytics, 제품별 긴 비즈니스 로직을 직접 넣지 않습니다.

## Workflow

1. 실제 재사용 근거가 있는지 확인합니다.
2. props API를 작게 정합니다.
3. 지원할 상태를 정합니다: default, disabled, loading, error, selected 등.
4. 스타일은 `Component.css.ts`와 기존 token을 사용합니다.
5. 긴 텍스트, 반응형 폭, focus-visible, disabled 상태를 확인합니다.
6. 필요한 export만 제공합니다.

## Done

- page-local과 shared 경계가 명확합니다.
- public props가 예측 가능합니다.
- 컴포넌트 내부에 route/API 책임이 섞이지 않았습니다.
- 모바일/데스크톱에서 UI가 깨지지 않습니다.
- `pnpm run build`, `pnpm run lint`, `pnpm run format:check` 실행 여부를 기록했습니다.
