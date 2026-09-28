# RTF Website — Contribution Guide

This folder is the single entry point for anyone contributing to Phase 2 of the RTF website. Read this file first, then jump to the guide for what you're working on.

| Guide | Read this if you're working on... |
|---|---|
| [`frontend-guide.md`](./frontend-guide.md) | React pages, components, UI, anything under `src/` |
| [`backend-guide.md`](./backend-guide.md) | Express routes, controllers, models, anything under `backend/` |
| [`firebase-local-setup.md`](./firebase-local-setup.md) | **Required before backend work** — sets up your own sandbox Firebase project so you never touch the real RTF database |

## Before you start, anywhere

1. Read the root [`CONTRIBUTING.md`](../CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](../CODE_OF_CONDUCT.md) — the AI Policy in `CONTRIBUTING.md` applies fully here: AI-assisted code is fine, but you must understand and be able to explain every line you submit.
2. Check the full module breakdown in [`docs/phase2-documentation.md`](../docs/phase2-documentation.md) before picking up an issue — it explains *why* each module works the way it does, not just what to build.
3. Pick an open GitHub Issue, assign yourself, and branch off `dev`:
   ```bash
   git checkout dev
   git pull
   git checkout -b feature/12-mail-composer-ui
   ```
   Branch naming: `feature/<issue-number>-<short-description>`.
4. Open your PR **into `dev`**, not `main`. Link the issue number in the PR description (`Closes #12`).
5. A squad lead reviews before merge. This is also what makes your contribution resume/LinkedIn-verifiable — the merged PR is public.

## Ground rules for every contribution

- Strictly follow the existing folder structure — see [`../project-structure.md`](../project-structure.md) and the file-placement rules in each guide below. Don't invent new top-level folders.
- Don't touch `src/data/` — that's Phase 3 scope, explicitly out of bounds right now.
- Don't add new libraries without checking with a squad lead first (keeps 20 people's `package.json` from drifting).
- One feature/fix per PR. Small PRs get reviewed faster.

Questions? Ask in the Discord before guessing — faster for you and keeps everyone's mental model in sync.