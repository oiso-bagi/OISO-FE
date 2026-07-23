---
name: api-integration-workflow
description: OISO-FE에서 Axios API helper, TanStack Query hook, query key, 타입, 에러 처리를 구현할 때 사용합니다.
---

# API Integration Workflow

API 연동, 서버 상태, query/mutation 흐름을 구현할 때 사용합니다.

## Check First

- `src/shared/api/client.ts`
- `src/shared/query/queryKeys.ts`
- 호출할 페이지 또는 컴포넌트
- API method, path, request, response shape

API 계약이 불명확하면 구현 전에 확인합니다. 서버 스펙이 확정되지 않은 필드는 임의로 강하게 고정하지 않습니다.

## OISO-FE Rules

- Axios instance는 `apiClient`를 사용합니다.
- API base URL은 `VITE_API_BASE_URL`을 사용합니다.
- `withCredentials` 변경은 인증/쿠키 영향 범위를 확인합니다.
- TanStack Query key에는 결과를 바꾸는 parameter를 포함합니다.
- 서버 응답 타입과 화면 모델이 다르면 경계에서 명시적으로 매핑합니다.
- 사용자에게 내부 에러, stack trace, secret 값을 노출하지 않습니다.

## Workflow

1. API contract를 확인합니다.
2. request/response 타입 위치를 정합니다.
3. API helper를 작성합니다.
4. 조회는 query, 변경은 mutation으로 분리합니다.
5. query key에 response-changing parameter를 포함합니다.
6. mutation 후 필요한 경우에만 invalidate 또는 cache update를 추가합니다.
7. error/loading/empty 상태를 호출 화면에서 확인합니다.

## Done

- API helper와 호출 지점의 책임이 분리되었습니다.
- query key가 안정적이고 예측 가능합니다.
- cache update 방식이 명확합니다.
- 실패 상태를 조용히 삼키지 않습니다.
- `pnpm run build`, `pnpm run lint`, `pnpm run format:check` 실행 여부를 기록했습니다.
