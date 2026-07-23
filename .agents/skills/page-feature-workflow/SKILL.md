---
name: page-feature-workflow
description: OISO-FE에서 페이지 또는 라우트 단위 화면 기능을 추가, 수정, 검증할 때 사용합니다.
---

# Page Feature Workflow

페이지, 라우트, 화면 단위 사용자 흐름을 구현할 때 사용합니다.

## Check First

- `src/app/router/router.tsx`
- 대상 페이지: `src/pages/**`
- 사용 layout: `src/app/layout/AppLayout.tsx` 또는 `src/app/layout/AuthLayout.tsx`
- 공통 컴포넌트: `src/shared/components/**`
- 공통 스타일: `src/shared/styles/**`
- 팀 컨벤션: `docs/CONVENTION.md`

## Workflow

1. 라우트가 필요한 작업인지 확인합니다.
2. 기존 layout 안에서 들어갈 화면인지 확인합니다.
3. page-local UI와 shared UI를 구분합니다.
4. 화면 상태가 서버 데이터에 의존하면 `api-integration-workflow`를 함께 사용합니다.
5. 폼 submit, validation, loading, error 흐름이 있으면 page 안에서 책임을 작게 나눕니다.
6. 스타일은 `*.css.ts`와 기존 theme/typography를 우선 사용합니다.
7. 모바일과 데스크톱에서 텍스트 넘침, UI 겹침, 하단 내비게이션 간섭을 확인합니다.

## Placement

```text
src/pages/{page-name}/{PageName}Page.tsx
src/pages/{page-name}/{PageName}Page.css.ts
```

한 페이지에서만 쓰는 작은 컴포넌트는 page 폴더 근처에 둡니다. 두 페이지 이상에서 실제로 재사용될 때 `src/shared/components/`로 이동합니다.

## Done

- route, layout, navigation 영향이 확인되었습니다.
- 기존 shared 컴포넌트와 style token을 우선 사용했습니다.
- API/폼/상태 책임이 page 컴포넌트에 과도하게 몰리지 않았습니다.
- `pnpm run build`, `pnpm run lint`, `pnpm run format:check` 실행 여부를 기록했습니다.
