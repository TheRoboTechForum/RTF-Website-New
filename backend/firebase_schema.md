# Firebase Realtime Database — Schema Design (Phase 2)

## Why this comes first
Realtime DB is schemaless — nothing stops two contributors from storing the same kind of data two different ways. This doc is the single source of truth for what goes where. Every `models/*.js` file must match this exactly.

## Architecture note: who talks to Firebase?
We're using **custom auth** (bcrypt + our own JWT), not Firebase Authentication. That means:
- Only the **Express backend** (via `firebase-admin`, using a service account) reads/writes the database.
- The **frontend never connects to Firebase directly** — it only ever calls our own REST API (`/api/...`), which then talks to Firebase.
- Because the Admin SDK always has full access, Realtime DB security rules just need to **lock out all direct client access** (see `database.rules.json` at the bottom) — the real access control (who can see/edit what) is enforced in our own `middlewares/authMiddleware.js` and `roleMiddleware.js`, in code, not in Firebase rules.

## Top-level tree

```
/
├── users/{uid}
├── usersByEmail/{sanitizedEmail}
├── blogs/{blogId}
├── resources/{resourceId}
├── system/
│   └── roomStatus
├── mailLogs/{id}
├── applicants/{applicantId}        (recruitment — temp, pre-member)
└── counters/{domainYearKey}        (for RTF ID serials, Phase 2 later step)
```

## `/users/{uid}`

`uid` is a generated push ID (`ref.push().key` or `uuid`), NOT the email — emails can't be keys directly (see sanitization note below) and users may later change their email.

```json
{
  "name": "string",
  "collegeEnrollmentNo": "string",
  "collegeEmail": "string",
  "personalEmail": "string",
  "branch": "string",
  "yearOfPassing": 2027,
  "phone": "string",
  "domain": "software | electrical | aeromech",
  "role": "member | admin | superadmin",
  "status": "pending | active | rejected",
  "passwordHash": "string (bcrypt hash — NEVER the plain password, NEVER sent to frontend)",
  "rtfId": "string | null   (assigned on approval, not at registration)",
  "createdAt": 1234567890,
  "approvedBy": "uid | null"
}
```

**Login identifier:** we use `personalEmail` as the canonical login email — it's the one field guaranteed to exist and stay stable even if the college email changes or doesn't exist yet (relevant later for recruitment). Confirm if you'd rather use `collegeEmail`.

## `/usersByEmail/{sanitizedEmail}` → `uid`

Realtime DB keys **cannot contain `.`, `#`, `$`, `[`, `]`, or `/`** — so a raw email like `daksh@gmail.com` is an invalid key. We store a sanitized version as the key, pointing at the real `uid`:

```json
{
  "daksh_at_gmail_dot_com": "uid_abc123"
}
```

This index exists purely for two O(1) lookups without needing an `orderByChild` query:
1. **Registration** — "does this email already exist?"
2. **Login** — "look up the uid for this email, then fetch `/users/{uid}` for the password hash"

Every time a user is created, **both** `/users/{uid}` and `/usersByEmail/{sanitized}` must be written together (see `models/userModel.js` — uses a multi-path update so they can never go out of sync).

## `/blogs/{blogId}`
```json
{
  "title": "string",
  "content": "string",
  "authorUid": "string",
  "domain": "software | electrical | aeromech | all",
  "createdAt": 1234567890
}
```

## `/resources/{resourceId}`
```json
{
  "title": "string",
  "url": "string",
  "domain": "software | electrical | aeromech | all",
  "addedBy": "uid",
  "createdAt": 1234567890
}
```

## `/system/roomStatus`
```json
{
  "state": "open | closed",
  "updatedBy": "uid",
  "updatedAt": 1234567890
}
```
Single document, not a list — there's only ever one current status.

## `/mailLogs/{id}`
```json
{
  "sentBy": "uid",
  "subject": "string",
  "recipientCount": 42,
  "domainFilter": "software | electrical | aeromech | all",
  "status": "sent | failed",
  "sentAt": 1234567890
}
```

## `/applicants/{applicantId}` — recruitment (built later, listed here for completeness)
```json
{
  "name": "string",
  "personalEmail": "string",
  "branch": "string",
  "expectedYearOfPassing": 2028,
  "phone": "string",
  "domain": "software | electrical | aeromech",
  "tempRtfId": "string",
  "status": "applied | converted | rejected",
  "createdAt": 1234567890
}
```

## `database.rules.json` (lock direct client access — real access control lives in Express middleware)

```json
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```

Deploy this to both your sandbox project and (eventually) production. It means: nobody can read or write anything directly from a browser/mobile client using a Firebase SDK — only the backend's Admin SDK (which ignores these rules entirely) can touch the data. This is intentional and correct for our architecture.