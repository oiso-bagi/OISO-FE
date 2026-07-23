# Agent Indexing

이 문서는 OISO-FE의 agent 문서가 Codex에 어떻게 노출되는지 정의합니다.

## Automatically Loaded

Codex는 작업 시작 시 `AGENTS.md` 계층을 읽습니다.

- 전역: `~/.codex/AGENTS.override.md` 또는 `~/.codex/AGENTS.md`
- 프로젝트: repo root부터 현재 작업 디렉터리까지 각 경로의 `AGENTS.override.md` 또는 `AGENTS.md`
- 하위 디렉터리 문서가 나중에 합쳐지므로 더 가까운 지침이 우선합니다.

OISO-FE의 현재 자동 로드 지침:

```text
AGENTS.md
```

`AGENTS.md`는 상세 설명서가 아니라 agent entrypoint입니다. 프로젝트 개요, 작업 원칙, 금지 사항, 필수 검증 기준만 남기고 상세 구현 규칙은 `docs/`, `.github/`로 연결합니다.

## Source Layers

| Path | Indexed as | Rule |
| --- | --- | --- |
| `AGENTS.md` | 자동 instruction entrypoint | 짧은 라우팅과 필수 원칙만 둡니다. |
| `README.md` | 사람용 repo entrypoint | 프로젝트 소개와 빠른 시작을 둡니다. |
| `docs/CONVENTION.md` | Existing convention | 팀에서 기존에 사용하던 Git, issue, PR, naming, component export 기준입니다. |
| `docs/VANILLA_EXTRACT_TYPOGRAPHY.md` | Design system note | typography 구현 세부 기준입니다. |
| `docs/agent/*` | agent harness policy | Codex 인덱싱, config, hook 책임을 설명합니다. |
| `.github/*` | GitHub templates | Issue/PR template과 CI 기준을 둡니다. |
| `src/**` | runtime source | 실제 React 구현을 확인합니다. |
| `public/**` | public assets | 정적 asset source를 확인합니다. |
| `package.json` | scripts/package source | 실행 스크립트와 의존성 기준을 확인합니다. |
| `vite.config.ts` | build config source | Vite plugin, alias, build 기준을 확인합니다. |

## Repo Skills

Repo-scoped Codex skill은 필요해질 때만 `.agents/skills` 아래에 둡니다.

```text
.agents/
  skills/
    frontend-task-orchestrator/
    page-feature-workflow/
    api-integration-workflow/
    app-shared-component-workflow/
    frontend-fundamentals-review/
```

현재 `.agents/skills`에는 OISO-FE에서 가볍게 사용할 필수 skill만 둡니다.

DONGCHIMI 전용 모노레포, 디자인시스템, E2E, 배포, 성능 skill은 현재 OISO-FE 구조에 맞지 않으므로 추가하지 않습니다.

각 skill은 `SKILL.md` frontmatter에 `name`과 `description`을 가져야 합니다. Codex는 처음에는 skill의 이름, 설명, 경로만 컨텍스트에 넣고, 실제로 skill을 선택할 때 전체 `SKILL.md`를 읽습니다.

UI에서 직접 호출할 필요가 있는 skill은 같은 디렉터리 아래 `agents/openai.yaml`을 둘 수 있습니다. 이 파일은 skill 본문을 대체하지 않고 호출 prompt metadata만 담당합니다.

## Referenced Documents

다음 문서는 자동 instruction chain이 아니라 `AGENTS.md` 또는 agent가 필요할 때 참조하는 자료입니다.

- `docs/agent/`: agent 문서, config, hook 운영 기준
- `.github/`: PR template, GitHub issue template, workflow
- `docs/CONVENTION.md`: 기존 팀 컨벤션
- `docs/VANILLA_EXTRACT_TYPOGRAPHY.md`: typography와 vanilla-extract 기준

이 파일들은 실행 지침이 아니라 근거 문서입니다. 모든 내용을 `AGENTS.md`에 복사하지 않고 링크로 유지합니다.

## Path Rules

- 새 agent 문서는 `docs/agent/` 아래에 추가합니다.
- 새 repo skill은 `.agents/skills/*/SKILL.md`에 둡니다.
- skill UI metadata 경로는 `.agents/skills/*/agents/openai.yaml`만 사용합니다.
- `skills/` 루트 디렉터리는 사용하지 않습니다.
- `.agents/skills` 아래에 skill을 중첩 그룹으로 만들지 않습니다.
- 하위 디렉터리에 다른 규칙이 꼭 필요할 때만 해당 디렉터리에 `AGENTS.md`를 추가합니다.
- 하위 `AGENTS.md`에는 root 문서의 긴 규칙을 복사하지 않고, local 추가 규칙만 둡니다.
- runtime, package manager, 검증 명령은 `package.json`을 기준으로 유지합니다. 현재 skill 문서에는 OISO-FE의 현재 package manager인 pnpm 기준 명령만 적습니다.

## Verification

문서 인덱싱을 바꾼 뒤 확인할 것:

```bash
rg --files -g "AGENTS.md" -g "AGENTS.override.md"
rg -n "이전 프로젝트명|이전 기술스택|다른 제품군 전용 경로" AGENTS.md docs .github
git diff --check
```

코드 변경이 함께 있으면 변경 범위에 따라 아래 명령을 추가로 검토합니다.

```bash
pnpm run build
pnpm run lint
pnpm run format:check
```

Codex 인식 문제가 있으면 Codex 세션을 재시작합니다. Codex는 새 세션을 시작할 때 instruction chain을 다시 구성합니다.

## Official References

- [AGENTS.md discovery](https://developers.openai.com/codex/guides/agents-md)
- [Skills discovery](https://developers.openai.com/codex/skills)
