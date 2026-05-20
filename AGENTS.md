# Agent Instructions

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

## Source-of-Truth Guardrail

For this project, the canonical working copy is on the VPS:

- VPS host: `agency-vps-public`
- VPS path: `/opt/agency-workspace/tauro`
- GitHub repo: `Julianb233/tauro-realty`
- Production alias: `https://taurorealty.com`

Before editing, deploying, or summarizing production state, verify the VPS and GitHub source:

```bash
ssh agency-vps-public 'cd /opt/agency-workspace/tauro && git fetch origin && git status --short --branch && git rev-parse --short HEAD && git log --oneline -1'
```

Production deploys must come from the VPS worktree and the intended GitHub branch, normally `main`. Do not deploy a local Mac branch, local preview, or feature branch to production unless Julian explicitly approves that branch as the production source. Local browser previews are for inspection only after the VPS/GitHub source has been identified.

For Tauro/LYL naming: the ready Tauro Realty website lives on `main` in `Julianb233/tauro-realty`. Do not replace it with a construction/holding page unless Julian explicitly says to publish a holding page and confirms the target domain.

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

<!-- AI_ACROBATICS_SOURCE_PREFLIGHT_START -->
# AI Acrobatics Agent Contract

Before non-trivial AI Acrobatics work, run the local source preflight:

```bash
~/.ai-acrobatics/agent-preflight/agent-source-preflight.sh --print
```

Use Obsidian as the source router:

```bash
OBSIDIAN_VAULT="${OBSIDIAN_VAULT:-/opt/agency-workspace/obsidian-vault}" /opt/agency-workspace/obsidian-vault/Tools/obsidian-context-router.sh route "<task>"
```

Load the cited MOCs, SOPs, Laws, and project files before editing or debugging. Verify live evidence before reporting status. If blocked, name the exact missing file, auth, service, platform signal, or source-of-truth mismatch. Write durable workflow/source changes back to the vault or memory.
<!-- AI_ACROBATICS_SOURCE_PREFLIGHT_END -->
