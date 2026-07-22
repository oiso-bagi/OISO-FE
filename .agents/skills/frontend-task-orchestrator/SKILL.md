---
name: frontend-task-orchestrator
description: OISO-FE 프론트엔드 작업을 페이지, API 연동, shared 컴포넌트, 품질 점검 흐름으로 가볍게 라우팅할 때 사용합니다.
---

# Frontend Task Orchestrator

OISO-FE에서 프론트엔드 작업을 시작할 때 가장 먼저 적용하는 가벼운 라우팅 스킬입니다.

## Source Of Truth

- `AGENTS.md`
- `docs/CONVENTION.md`
- `docs/VANILLA_EXTRACT_TYPOGRAPHY.md`
- `package.json`
- `src/app/router/router.tsx`
- `src/pages/**`
- `src/shared/**`

## Routing

| 요청 유형 | 사용할 스킬 |
| --- | --- |
| 페이지 추가, 라우트 변경, 화면 단위 기능 | `page-feature-workflow` |
| API helper, Axios, TanStack Query, query key | `api-integration-workflow` |
| 여러 페이지에서 재사용할 UI | `app-shared-component-workflow` |
| 구현 후 코드 품질 점검 또는 리뷰 | `frontend-fundamentals-review` |

여러 유형이 섞이면 사용자 경험에 가까운 순서로 진행합니다.

1. page/route
2. API/query
3. shared component
4. fundamentals review

## OISO-FE Rules

- 기존 컨벤션과 템플릿은 `docs/CONVENTION.md`와 `.github/*`를 그대로 따릅니다.
- 페이지는 `src/pages/{name}/{Name}Page.tsx` 패턴을 우선합니다.
- 라우팅은 `src/app/router/router.tsx`에서 확인합니다.
- 공통 UI는 실제 재사용이 있을 때만 `src/shared/components/`로 둡니다.
- 스타일은 vanilla-extract `*.css.ts`를 사용합니다.
- 환경변수와 secret 값은 읽거나 출력하지 않습니다.

## Verification

변경 범위에 맞춰 실행합니다.

```bash
pnpm run build
pnpm run lint
pnpm run format:check
git diff --check
```

PowerShell에서 실행 정책 문제가 있으면 `.cmd` 실행 파일을 사용합니다.
