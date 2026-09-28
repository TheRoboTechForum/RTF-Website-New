# Frontend Contribution Guide

## 1. Local setup

```bash
git clone https://github.com/TheRoboTechForum/RTF-Website-New.git
cd RTF-Website-New
npm install
```

Copy the env template and fill in your **own sandbox Firebase project's** web config (see `firebase-local-setup.md` — do this before running anything that touches auth/data):

```bash
cp .env.example .env.local
```

`.env.local` keys you'll need:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_BASE_URL=http://localhost:5000
```

Run the dev server:
```bash
npm run dev
```

This is **Vite**, not Create React App — env vars must be prefixed `VITE_` and accessed via `import.meta.env.VITE_...`, never `process.env`.

## 2. Where your code goes

Don't guess — match the existing structure exactly:

| You're building... | Goes in |
|---|---|
| A full page/route | `src/pages/` (nest under a subfolder like `Dashboard/` or `Recruitment/` if it's part of a module) |
| A reusable piece of UI specific to one module | `src/components/<module>/` (`auth/`, `dashboard/`, `recruitment/`, `mail/`) |
| A generic, reusable UI primitive (button, card, loader) | `src/components/ui/` — **check here first**, most of what you need (`NeoButton`, `HoloCard`, `ProjectCard`, skeletons) already exists. Don't rebuild it. |
| Any Firebase or backend API call | `src/services/` — never call `fetch`/Firebase directly inside a component |
| Shared state (auth user, role, room status) | `src/context/` |
| Reusable logic (not UI) | `src/hooks/` |
| Route-to-role mapping | `src/routes/AppRoutes.jsx` |
| Input validation | `src/utils/validators.js` |

**Do not touch `src/data/`.** It's static Phase 3 scope — out of bounds for Phase 2 work even if it looks related.

## 3. Coding standards

- **Naming:** components `PascalCase.jsx`, everything else (hooks, services, utils) `camelCase.js`. Hook files must start with `use`.
- **One component per file.** No default-exporting multiple components from one file.
- **Styling:** Tailwind utility classes only — no inline `style={{}}`, no new CSS files unless it's a genuinely global concern in `src/styles/`.
- **Theme:** reuse the existing cyberpunk/neon design language already in the codebase (dark background, cyan/amber/purple accents, `HoloCard`/`NeoButton` visual language). New UI must look like it belongs next to `CyberpunkHero.jsx` and `StatsBar.jsx`, not like a generic Bootstrap form.
- **API calls:** always through `src/services/*.js`, using `axios`, wrapped in try/catch, never raw `fetch` inside a component.
- **Forms:** use React Hook Form (already in the project) + `zod` for validation — don't hand-roll `useState` form handling.
- **No new dependencies** without a squad lead sign-off — check `package.json` first, most of what you need is already installed.
- **Comments:** JSDoc-style comment above any exported function/component explaining what it does, not how (the code shows how).
- **Lint before you push:** `npm run lint` must pass clean.

## 4. AI-agent instructions (read this if you're using Claude/Copilot/ChatGPT to help write code)

> **Strictly follow the existing theme and structure. Do not deviate.**

Give your AI tool these constraints explicitly in the prompt:
- Reuse existing components from `src/components/ui/` instead of generating new ones for the same purpose.
- Match the existing color palette and animation style (Framer Motion, glassmorphism/neon cards) — don't introduce a different visual language.
- Follow the exact folder placement rules in section 2 above.
- Do not modify or add to `src/data/`.
- Do not add new npm packages.
- Output must be something **you** understand well enough to explain in review — per the AI Policy in the root `CONTRIBUTING.md`, unreviewed AI output is not an acceptable PR.

## 5. Before opening a PR

- [ ] `npm run lint` passes
- [ ] Component renders correctly in both light checks you have (desktop width, mobile width)
- [ ] No console errors/warnings
- [ ] No unused imports or commented-out dead code
- [ ] PR description links the issue (`Closes #<number>`)