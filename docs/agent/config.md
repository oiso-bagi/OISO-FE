# Agent Config

이 문서는 OISO-FE에서 Codex config를 어디에 둘지 정의합니다.

## Default Policy

Repo에는 기본적으로 `.codex/config.toml`을 두지 않습니다.

개인 선호, 모델 선택, context window, approval/sandbox 선호 같은 로컬 설정은 사용자 전역 config에 둡니다.

```text
~/.codex/config.toml
```

OISO-FE의 팀 공통 기준은 Codex config가 아니라 저장소 파일과 문서에서 확인합니다.

```text
AGENTS.md
package.json
vite.config.ts
tsconfig.json
tsconfig.app.json
tsconfig.node.json
docs/CONVENTION.md
.github/
```

API key, token, 로컬 secret은 repo에 커밋하지 않습니다. 로컬 실행에는 `.env`를 사용할 수 있지만, agent는 `.env` 값을 읽거나 출력하지 않습니다. 예시가 필요하면 secret 값 없이 `.env.example`만 둡니다.

## When To Add Repo Config

다음 조건 중 하나가 있을 때만 repo-local config를 검토합니다.

- 모든 팀원이 같은 Codex feature flag를 사용해야 합니다.
- repo-local MCP server나 sandbox 정책이 필요합니다.
- project instruction fallback filename처럼 repo 문서 탐색 동작을 공통으로 바꿔야 합니다.
- hook을 repo-local로 도입해야 하고 config inline 방식이 더 명확합니다.

이 경우 위치는 다음 중 하나를 사용합니다.

```text
.codex/config.toml
.codex/hooks.json
```

## Responsibility Split

| Setting type | Location | Rule |
| --- | --- | --- |
| model preference | `~/.codex/config.toml` | 개인 설정 |
| context window | `~/.codex/config.toml` | 개인 설정 |
| approval/sandbox preference | `~/.codex/config.toml` | 개인 설정, 팀 합의 전 repo 금지 |
| local API URL / secret | `.env` 또는 repo 밖 개인 env file | 개인 secret, 값 읽기/출력 금지 |
| package scripts | `package.json` | 팀 공통 실행 기준 |
| Vite config | `vite.config.ts` | 팀 공통 dev/build 기준 |
| TypeScript config | `tsconfig*.json` | 팀 공통 타입 검사 기준 |
| style tokens | `src/shared/styles/` | UI 공통 기준 |
| Codex hook policy | `~/.codex/hooks.json` 또는 개인 Codex config | 개인 자동화, repo 금지 |
| shared hook policy | `.codex/hooks.json` | 팀 정책이 있을 때만 |
| shared fallback filenames | `.codex/config.toml` | repo 문서 구조가 요구할 때만 |

## Package Manager Note

현재 저장소에는 `pnpm-lock.yaml`이 있습니다. 의존성 추가, lockfile 갱신, install 명령 실행 전에는 pnpm 기준 사용 여부를 확인합니다.

문서와 일반 코드 변경만으로는 lockfile을 수정하지 않습니다.

## Git Identity Guard

개인 장비에서 Codex가 이 repo의 commit 또는 push 명령을 실행할 때는 로컬 정책(예: Codex hook 또는 사용자별 git hook)으로 본인 계정 기준을 강제할 수 있습니다.

이 정책은 협업자에게 전파되지 않도록 해야 하므로 repo의 `.githooks/` 또는 `core.hooksPath`로 관리하지 않습니다. 팀 전체에 적용해야 하는 hook은 별도 합의 후 `.codex/hooks.json`에 추가하고, PR에서 영향 범위와 trust 요구사항을 명시합니다.

## Verification

config를 추가하거나 바꾼 뒤 확인할 것:

```bash
git diff --check
```

repo-local config를 추가했다면 PR 설명에 팀 공통 정책으로 둔 이유를 적습니다.
