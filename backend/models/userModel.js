// models/userModel.js
// ─────────────────────────────────────────────────────────────
// This is a "model" for a NoSQL database — NOT a schema class like
// you'd get from Mongoose. It's just: (1) a documented shape for
// what lives at /users/{uid}, and (2) plain functions that are the
// ONLY way the rest of the app reads/writes that path.
//
// Full schema reference: docs/firebase-schema.md
//
// RULE: controllers never call `db.ref(...)` directly. They only
// ever call functions from a model file. This is what keeps 20
// different people's code writing the SAME shape of data.
// ─────────────────────────────────────────────────────────────

const { db } = require('../config/firebaseAdmin');
const { sanitizeEmail } = require('../utils/sanitizeEmail');

/**
 * Shape stored at /users/{uid}:
 * {
 *   name, collegeEnrollmentNo, collegeEmail, personalEmail,
 *   branch, yearOfPassing, phone, domain, role, status,
 *   passwordHash, rtfId, createdAt, approvedBy
 * }
 */

/**
 * Checks whether a personal email is already registered.
 * Uses the /usersByEmail index instead of scanning all users —
 * O(1) lookup instead of O(n).
 * @param {string} personalEmail
 * @returns {Promise<boolean>}
 */
async function emailExists(personalEmail) {
  const key = sanitizeEmail(personalEmail);
  const snapshot = await db.ref(`usersByEmail/${key}`).get();
  return snapshot.exists();
}

/**
 * Creates a new user. Writes to BOTH /users/{uid} and
 * /usersByEmail/{sanitized} in a single atomic multi-path update,
 * so the two paths can never go out of sync (e.g. server crashes
 * between two separate writes).
 *
 * @param {object} userData - everything except uid (uid is generated here)
 * @returns {Promise<{ uid: string }>}
 */
async function createUser(userData) {
  const newUserRef = db.ref('users').push(); // generates a unique uid
  const uid = newUserRef.key;

  const record = {
    ...userData,
    status: 'pending', // every new registration starts pending admin approval
    rtfId: null,        // assigned later, on approval
    createdAt: Date.now(),
    approvedBy: null,
  };

  const sanitizedKey = sanitizeEmail(userData.personalEmail);

  // Multi-path update — Firebase applies both writes together or neither.
  const updates = {};
  updates[`users/${uid}`] = record;
  updates[`usersByEmail/${sanitizedKey}`] = uid;

  await db.ref().update(updates);

  return { uid };
}

/**
 * Fetches a user by their uid.
 * @param {string} uid
 * @returns {Promise<object|null>}
 */
async function getUserByUid(uid) {
  const snapshot = await db.ref(`users/${uid}`).get();
  return snapshot.exists() ? snapshot.val() : null;
}

/**
 * Fetches a user by personal email — used at login.
 * Two-step lookup: sanitized email → uid, then uid → full record.
 * @param {string} personalEmail
 * @returns {Promise<object|null>} the user record WITH uid attached, or null
 */
async function getUserByEmail(personalEmail) {
  const key = sanitizeEmail(personalEmail);
  const uidSnapshot = await db.ref(`usersByEmail/${key}`).get();

  if (!uidSnapshot.exists()) return null;

  const uid = uidSnapshot.val();
  const user = await getUserByUid(uid);

  return user ? { uid, ...user } : null;
}

module.exports = {
  emailExists,
  createUser,
  getUserByUid,
  getUserByEmail,
};