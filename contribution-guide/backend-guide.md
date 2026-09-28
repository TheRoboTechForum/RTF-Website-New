# Backend Contribution Guide

## 1. Before you write a single line

**Set up your own sandbox Firebase project first.** You will never use the real RTF Firebase credentials during development. Follow `firebase-local-setup.md` completely before continuing — everything below assumes you already have your own `backend/.env` filled in with your own sandbox project's credentials.

## 2. Local setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env` with **your own sandbox Firebase project's** service account details (from `firebase-local-setup.md`) plus placeholder mail credentials:

```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

GMAIL_USER=
GMAIL_APP_PASSWORD=

GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_KEY=
```

Run it:
```bash
npm run dev
```
(`nodemon` should be configured so this restarts on file changes — check `package.json` scripts.)

`.env` is gitignored. **Never commit it, never paste real values into an issue/PR/Discord message.** `.env.example` should only ever contain key *names*, never real values.

## 3. Architecture — MVC over a NoSQL (Firebase Realtime DB) backend

We're using Express in a standard MVC shape, but since Firebase Realtime DB is schemaless, "Model" here doesn't mean a Mongoose/Sequelize schema — it means two things per model file:

1. A comment block documenting the exact JSON shape stored at that path.
2. Plain functions that read/write that path, so every controller talks to the database through the same shape instead of each person inventing their own field names.

**Example — `models/userModel.js` (documented shape + helpers, not written out yet, just the idea):**
```js
/**
 * Path: /users/{uid}
 * Shape:
 * {
 *   name: string,
 *   collegeEnrollmentNo: string,
 *   collegeEmail: string,
 *   personalEmail: string,
 *   branch: string,
 *   yearOfPassing: number,
 *   phone: string,
 *   domain: "software" | "electrical" | "aeromech",
 *   role: "member" | "admin" | "superadmin",
 *   rtfId: string,
 *   status: "pending" | "active" | "rejected",
 *   createdAt: number,
 *   approvedBy: string | null
 * }
 */
// exported functions: getUser(uid), createUser(uid, data), updateUser(uid, data), listUsersByDomain(domain)
```

**Request flow:** `routes/*.js` → `middlewares/` (auth check, role check) → `controllers/*.js` (request/response handling, calls services + models) → `models/*.js` (talks to Firebase) / `services/*.js` (business logic: ID generation, mail sending, Sheets writes).

**Rule of thumb:** controllers never call the Firebase Admin SDK directly — always go through a model function. This is what keeps the data shape consistent across 20 different people's code.

## 4. Where your code goes

| You're building... | Goes in |
|---|---|
| A new URL endpoint | `routes/<module>Routes.js` — just wires method+path to a controller function |
| The logic for what that endpoint does | `controllers/<module>Controller.js` |
| Reading/writing a specific DB path | `models/<name>Model.js` |
| Reusable business logic not tied to one request (ID generation, sending mail, writing to Sheets) | `services/` |
| Auth/role checks, error formatting, file upload handling | `middlewares/` |
| Constants like domain codes | `constants/` |

## 5. Coding standards

- `camelCase.js` for all files.
- Every route handler wrapped in `asyncHandler` (in `utils/`) so errors go to `errorHandler` middleware instead of crashing the process.
- Every controller function: validate input (zod/joi) → call service/model → return consistent JSON shape:
  ```json
  { "success": true, "data": {...} }
  { "success": false, "error": "message" }
  ```
- No business logic inside route files — routes only map path → controller.
- No direct Firebase calls inside controllers — go through `models/`.
- JSDoc comment above every exported function.
- Log meaningful actions (registration, approval, mail sent) via `utils/logger.js`, not raw `console.log`.
- `multer` (image handling, Phase 3/4) — the `middlewares/upload.js` file exists as a stub now; don't wire it up until that phase is actually scoped, just leave it empty/commented.

## 6. AI-agent instructions

> **Strictly follow the MVC structure and file-placement rules above. Do not deviate.**

If using an AI tool:
- Tell it explicitly: controllers call models, never Firebase directly.
- Tell it the exact `/users/{uid}` style path shapes documented in each model file — don't let it invent new field names.
- Tell it not to hardcode credentials anywhere, always `process.env.*`.
- Output must still be reviewed and understood by you before the PR, per the AI Policy in the root `CONTRIBUTING.md`.

## 7. Before opening a PR

- [ ] Tested against **your own sandbox Firebase project**, not production
- [ ] No hardcoded secrets anywhere in the diff
- [ ] Consistent `{ success, data }` / `{ success, error }` response shape
- [ ] Errors go through `errorHandler`, not raw try/catch swallowing
- [ ] PR description links the issue (`Closes #<number>`)