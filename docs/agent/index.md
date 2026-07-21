# Agent Harness

이 디렉터리는 OISO-FE에서 Codex와 다른 coding agent가 참고하는 문서 운영 기준을 정리합니다.

OISO-FE는 Vite, React 19, TypeScript, React Router, TanStack Query, Axios, vanilla-extract, oxlint 기반의 프론트엔드 저장소입니다.

## Layer Model

| Layer | Source of truth | Role |
| --- | --- | --- |
| Entry point | `AGENTS.md` | agent가 먼저 읽는 프로젝트별 작업 원칙 |
| Project guide | `README.md`, `package.json`, `vite.config.ts` | 프로젝트 실행, 의존성, 빌드 설정 확인 |
| Existing convention | `docs/CONVENTION.md` | 팀에서 기존에 사용하던 Git, issue, PR, naming, component export 기준 |
| Design system notes | `docs/VANILLA_EXTRACT_TYPOGRAPHY.md` | typography와 vanilla-extract 운영 기준 |
| Agent policy | `docs/agent/*.md` | agent 문서, config, hook 운영 기준 |
| GitHub automation | `.github/**` | Issue/PR template과 CI 기준 |
| Runtime source | `src/**`, `package.json`, `tsconfig*.json` | 실제 React/Vite 구현 기준 |

## Documents

- [Indexing](./indexing.md): agent가 어떤 문서를 언제 참고해야 하는지 설명합니다.
- [Config](./config.md): 전역 Codex 설정과 repo-local 설정의 책임 범위를 설명합니다.
- [Hooks](./hooks.md): repo-local hook 도입 기준과 안전 원칙을 설명합니다.

## Current Shape

```text
AGENTS.md
.github/
  ISSUE_TEMPLATE/
  workflows/
  CODEOWNERS
  PULL_REQUEST_TEMPLATE.md
  labeler.yml
docs/
  agent/
    config.md
    hooks.md
    index.md
    indexing.md
  CONVENTION.md
  VANILLA_EXTRACT_TYPOGRAPHY.md
src/
  app/
  pages/
  shared/
public/
package.json
vite.config.ts
tsconfig.json
```

`.agents/` 디렉터리에는 OISO-FE에서 가볍게 사용할 필수 repo-local skill만 둡니다.

현재 등록된 skill:

- `frontend-task-orchestrator`
- `page-feature-workflow`
- `api-integration-workflow`
- `app-shared-component-workflow`
- `frontend-fundamentals-review`

## Maintenance Rule

- `AGENTS.md`는 agent가 작업 전 확인해야 하는 짧은 허브로 유지합니다.
- Git, issue, PR, branch, commit, naming, component export 기준은 기존 `docs/CONVENTION.md`를 그대로 따릅니다.
- typography와 vanilla-extract 관련 세부 기준은 기존 `docs/VANILLA_EXTRACT_TYPOGRAPHY.md`를 그대로 따릅니다.
- React, Router, Query, API client, vanilla-extract 책임은 실제 `src/` 구조를 기준으로 설명합니다.
- CI workflow는 PR과 `main`, `develop` branch push에서 실행합니다.
- 개인 선호 설정은 repo에 커밋하지 않고 사용자 전역 Codex config에 둡니다.
- repo-local config와 hook은 팀 공통 정책이 필요할 때만 추가합니다.
- repo-local skill은 OISO-FE 구조에 맞는 필수 작업 흐름만 유지하고, DONGCHIMI 전용 모노레포, 디자인시스템, E2E, 배포, 성능 skill은 추가하지 않습니다.
- `.env` 값과 로컬 secret은 읽거나 출력하지 않습니다.
- 의존성 작업 전 `pnpm-lock.yaml`과 package manager 기준을 확인합니다.

## Refresh Checklist

agent 문서를 갱신할 때는 아래 순서로 확인합니다.

- 실제 구조는 `src/`, `public/`, `.github/`에서 먼저 확인합니다.
- 실행 스크립트와 package manager 정보는 `package.json`을 확인합니다.
- Git, issue, PR, coding 규칙은 기존 `docs/CONVENTION.md`와 `.github/*` 템플릿을 변경하지 않는지 확인합니다.
- React/vanilla-extract 관련 설명은 실제 `src/` 구조와 `docs/VANILLA_EXTRACT_TYPOGRAPHY.md`가 어긋나지 않는지 확인합니다.
- 문서-only 변경은 최소 `git diff --check`로 공백 문제를 확인합니다.
- 코드 변경이 포함되면 변경 범위에 따라 `pnpm run build`, `pnpm run lint`, `pnpm run format:check`를 검토합니다.

## Official References

- [AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Skills](https://developers.openai.com/codex/skills)
- [Config basics](https://developers.openai.com/codex/config-basic)
- [Hooks](https://developers.openai.com/codex/hooks)
