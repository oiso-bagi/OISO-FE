# Agent Hooks

이 문서는 OISO-FE에서 Codex hooks를 도입할 때의 기준을 정의합니다.

## Default Policy

Repo에는 기본적으로 hook을 두지 않습니다.

Hook은 Codex lifecycle 중 deterministic script를 실행하므로, 잘못 만들면 모든 agent 작업에 비용과 실패 지점을 추가합니다. 문서나 `AGENTS.md` 지침으로 충분한 규칙은 hook으로 만들지 않습니다.

## When To Add Hooks

다음처럼 반복적이고 안전성이 중요한 정책만 hook 후보입니다.

- destructive shell command 차단 또는 확인
- `.env`, API base URL secret, API key, token 전송 방지
- 문서 변경 PR에서 필수 검증 누락 경고
- lockfile 변경 시 package manager 확인 안내
- UI 공통 스타일이나 라우터 변경 시 필요한 로컬 검증 안내
- `.github/workflows/` 변경 시 CI 영향 확인 안내

## Recommended First Hook

도입한다면 첫 hook은 `PreToolUse` 기반 destructive command guard로 제한합니다.

차단 또는 확인 후보:

- `git reset --hard`
- `git clean -fd`
- `git checkout --`
- recursive delete
- `.env` 삭제 또는 출력
- `public/` 또는 `src/shared/styles/` 대량 삭제
- lockfile 삭제 또는 강제 재생성

## Repo Shape

Hook을 추가할 때는 다음 구조를 사용합니다.

```text
.codex/
  hooks.json
  hooks/
    pre_tool_use_policy.py
```

## Review Rule

- 새 hook은 PR에서 동작 목적, 이벤트, matcher, 실패 시 처리 방식을 설명합니다.
- hook script는 작고 deterministic해야 합니다.
- 네트워크 호출, 긴 실행, 사용자 데이터 전송은 기본 금지합니다.
- secret 값을 로그나 agent 응답에 남기지 않습니다.
- hook 도입 후 `/hooks` 또는 Codex startup warning에서 trust 상태를 확인합니다.

## Verification

hook을 추가하거나 수정한 뒤 확인할 것:

```bash
git diff --check
```

코드 hook을 추가했다면 hook 자체의 단위 검증 또는 dry-run 결과를 PR에 적습니다.

## Official References

- [Hooks](https://developers.openai.com/codex/hooks)
