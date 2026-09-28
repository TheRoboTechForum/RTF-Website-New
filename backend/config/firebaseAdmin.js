// config/firebaseAdmin.js
// ─────────────────────────────────────────────────────────────
// Initializes the Firebase Admin SDK ONCE, using your sandbox
// project's service account credentials from .env (see
// contribution-guide/firebase-local-setup.md if you haven't set
// this up yet).
//
// The Admin SDK has FULL access to the database — it ignores
// database.rules.json entirely. This is why the frontend must
// NEVER get these credentials; only this backend process holds them.
// ─────────────────────────────────────────────────────────────

const admin = require('firebase-admin');

// The private key in .env has literal "\n" characters (since .env
// values are single-line strings) — we convert them back to real
// newlines here, or the SDK will reject the key as malformed.
const firebaseConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// Guard against accidentally initializing twice (can happen if this
// file gets required from multiple places during hot-reload).
if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
  console.log('✅ Firebase Admin initialized');
}

// db is what every models/*.js file will import and use to read/write.
const db = admin.database();

module.exports = { admin, db };