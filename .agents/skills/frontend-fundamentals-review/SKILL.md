---
name: frontend-fundamentals-review
description: OISO-FE 프론트엔드 변경 후 가볍게 readability, predictability, cohesion, coupling을 점검할 때 사용합니다.
---

# Frontend Fundamentals Review

구현 후 또는 리뷰 요청 시 가볍게 품질을 점검합니다. 큰 체크리스트가 아니라 실제 위험을 찾는 용도입니다.

## Review Order

1. 런타임 버그
2. 라우팅/사용자 흐름 깨짐
3. API 계약 또는 query key 오류
4. 상태와 side effect 예측 가능성
5. 컴포넌트 책임 분리
6. 스타일/반응형/텍스트 겹침
7. build/lint 실패 가능성

## Readability

- 컴포넌트가 한 번에 읽히는 크기인지 봅니다.
- 조건부 렌더링이 너무 깊지 않은지 봅니다.
- 이름이 역할을 설명하는지 봅니다.
- 반복되는 JSX는 의미 있는 컴포넌트나 데이터 구조로 정리할 수 있는지 봅니다.

## Predictability

- props, state, query key가 같은 입력에 같은 결과를 만드는지 봅니다.
- effect가 너무 많은 책임을 하지 않는지 봅니다.
- loading, error, empty 상태가 빠지지 않았는지 봅니다.
- mutation 후 cache 영향이 명확한지 봅니다.

## Cohesion

- page, shared component, API helper의 책임이 섞이지 않았는지 봅니다.
- 한 hook 또는 컴포넌트가 서로 다른 이유로 자주 바뀌게 생겼는지 봅니다.

## Coupling

- shared component가 특정 page route나 API response에 묶이지 않았는지 봅니다.
- page-local 구현을 섣불리 shared로 올리지 않았는지 봅니다.
- 환경변수, secret, 내부 에러를 UI에 노출하지 않았는지 봅니다.

## Output

리뷰 결과는 심각도 순으로 짧게 작성합니다.

```markdown
## Frontend Fundamentals Review

- Findings:
- Risks:
- Suggested fixes:
- Verification:
```

문제가 없으면 그렇게 말하고, 남은 검증 공백만 적습니다.
