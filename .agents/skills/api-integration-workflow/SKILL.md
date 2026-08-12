---
name: api-integration-workflow
description: OISO-FE에서 Axios API helper, TanStack Query hook, query key, swagger-typescript-api 기반 생성 타입, 에러 처리를 구현할 때 사용합니다.
---

# API Integration Workflow

API 연동, 서버 상태, query/mutation 흐름을 구현할 때 사용합니다.

## Check First

- `src/shared/api/client.ts`
- `src/shared/query/queryKeys.ts`
- `src/shared/api/generated/types.ts`
- `package.json`의 `api:generate-types` 스크립트
- 호출하는 페이지 또는 컴포넌트
- API method, path, request, response shape

API 계약이 불명확하면 구현 전에 확인합니다. 서버 스펙이 확정되지 않은 필드를 임의로 강하게 고정하지 않습니다.

## Generated API Types

- 서버 Swagger/OpenAPI 스펙에서 내려오는 request/response 타입은 `swagger-typescript-api`로 생성된 `src/shared/api/generated/types.ts`를 우선 사용합니다.
- 타입 생성은 `pnpm run api:generate-types`를 사용합니다. 이 스크립트는 `http://localhost:3000/api-docs/json`에서 스펙을 읽어 `src/shared/api/generated/types.ts`를 갱신합니다.
- API helper에서는 생성 타입을 import하고, 동일한 DTO 타입을 수동으로 다시 선언하지 않습니다.
- 화면에서 쓰기 좋은 모델이 서버 DTO와 다르면 API 경계에서 명시적으로 매핑합니다. 이때 서버 DTO는 generated 타입을 유지하고, 화면 전용 타입은 page 또는 feature 가까이에 둡니다.
- Swagger 스펙이 실행 불가하거나 백엔드가 내려가 있으면 임시 수동 타입을 만들기 전에 사용자에게 계약 확인이 필요하다고 알립니다. 불가피한 임시 타입에는 TODO와 근거를 짧게 남깁니다.
- 생성 파일은 손으로 수정하지 않습니다. 필요한 변경은 Swagger 스펙 또는 매핑 코드에서 처리합니다.

## OISO-FE Rules

- Axios instance는 `apiClient`를 사용합니다.
- API base URL은 `VITE_API_BASE_URL`을 사용합니다.
- `withCredentials` 변경은 인증/쿠키 영향 범위를 확인합니다.
- TanStack Query key에는 결과를 바꾸는 parameter를 포함합니다.
- 서버 응답 타입과 화면 모델이 다르면 경계에서 명시적으로 매핑합니다.
- 사용자에게 내부 에러, stack trace, secret 값을 노출하지 않습니다.

## Workflow

1. API contract를 확인합니다.
2. 필요하면 `pnpm run api:generate-types`로 generated 타입을 갱신합니다.
3. request/response 타입 위치를 확인하고 generated 타입을 우선 import합니다.
4. API helper를 작성합니다.
5. 조회는 query, 변경은 mutation으로 분리합니다.
6. query key에 response-changing parameter를 포함합니다.
7. mutation 후 필요한 경우에만 invalidate 또는 cache update를 추가합니다.
8. error/loading/empty 상태를 호출 화면에서 확인합니다.

## Done

- API helper와 호출 지점의 책임이 분리되었습니다.
- request/response 타입은 가능한 한 generated 타입을 사용합니다.
- generated 타입을 손으로 수정하지 않았습니다.
- query key가 안정적이고 예측 가능합니다.
- cache update 방식이 명확합니다.
- 실패 상태를 조용히 삼키지 않습니다.
- `pnpm run build`, `pnpm run lint`, `pnpm run format:check` 실행 여부를 기록합니다.
