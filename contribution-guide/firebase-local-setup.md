# Firebase Local Setup (Required for Backend Work)

## Why this exists

The real RTF Firebase project holds real member data. No contributor develops against it directly — you build and test against your **own free sandbox Firebase project**, structured identically to production. Only a maintainer's deployed backend ever touches the real RTF database. This means anyone can contribute, test fully, and open a PR without ever holding real credentials.

## Step 1 — Create your own Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and sign in with any personal Google account.
2. Click **Add project** → name it something like `rtf-sandbox-<yourname>` → you can disable Google Analytics for this, it's not needed.
3. Wait for it to finish provisioning.

## Step 2 — Enable Realtime Database

1. In your new project's console, go to **Build → Realtime Database**.
2. Click **Create Database**.
3. Choose any region close to you.
4. Start in **test mode** (open read/write, no auth rules) — this is fine for a personal sandbox, never do this on the real project.
5. Copy the database URL shown at the top (looks like `https://rtf-sandbox-yourname-default-rtdb.firebaseio.com`) — you'll need it shortly.

## Step 3 — Enable Authentication (for testing login/register)

1. Go to **Build → Authentication → Get started**.
2. Enable the **Email/Password** sign-in method.

## Step 4 — Get your backend credentials (service account)

1. Click the gear icon → **Project settings → Service accounts**.
2. Click **Generate new private key** → confirm → a `.json` file downloads.
3. Open that file. You need three values from it for `backend/.env`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the `\n` characters as-is, wrap the whole value in quotes in `.env`)
4. Add the database URL from Step 2 as `FIREBASE_DATABASE_URL`.

**Never commit this downloaded JSON file anywhere.** Delete it from your Downloads folder once you've copied the values into `.env`, or keep it somewhere outside the repo entirely.

## Step 5 — Get your frontend web config

1. Still in Project settings, scroll to **Your apps** → click the `</>` (web) icon → register a nickname (e.g. `rtf-sandbox-web`) → no need for Firebase Hosting.
2. It shows a `firebaseConfig` object — copy each value into your **frontend** `.env.local` (see `frontend-guide.md` for the exact key names): API key, auth domain, database URL, project ID, storage bucket, messaging sender ID, app ID.

## Step 6 — Run the app against your sandbox

```bash
# terminal 1 — backend
cd backend
npm run dev

# terminal 2 — frontend
npm run dev
```

Register a test user through the app's own Register page. Check your Firebase console's Realtime Database tab — you should see the data appear live under `/users/...`. If it's there, your sandbox is wired correctly and you're fully isolated from production.

## Step 7 — Working on recruitment (Google Sheets)

The recruitment module writes to Google Sheets, not Firebase. For local testing:

1. Create your own blank Google Sheet.
2. In [Google Cloud Console](https://console.cloud.google.com), create a project (can be the same sandbox project or a separate one), enable the **Google Sheets API**, and create a service account + key (similar process to Step 4).
3. Share your test Google Sheet with that service account's email (found in the key JSON) with Editor access.
4. Put the Sheet ID (from its URL) and the service account key into `backend/.env` as `GOOGLE_SHEETS_ID` and `GOOGLE_SERVICE_ACCOUNT_KEY`.

## Step 8 — Open your PR as normal

Your sandbox data is yours to break, reset, or delete freely — there's a **Clear data** option under Realtime Database settings if you want to start fresh. None of it ever touches the real RTF project. A maintainer reviews your *code*, not your test data, and merges. Only after merge does a maintainer point the deployed backend at the real RTF credentials — that step is never part of a contributor's local setup.

## Common issues

| Problem | Fix |
|---|---|
| `FIREBASE_PRIVATE_KEY` errors on server start | Make sure newlines are preserved — wrap the value in double quotes in `.env` and don't strip the `\n` characters |
| Frontend can't reach backend | Check `VITE_API_BASE_URL` in `.env.local` matches where your backend is actually running (`http://localhost:5000` by default) |
| "Permission denied" writing to Realtime Database | Confirm you left it in test mode (Step 2) — production-mode rules will block writes until you configure them |
| Sheets API `403` error | Confirm you shared the Sheet with the service account's email, not just your own Google account |