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
const { db } = require("../config/firebaseAdmin");
const sanitizeEmail = require("../utils/sanitizeEmail");

/**
 * Checks whether a personal email already exists.
 */
async function emailExists(personalEmail) {
  if (!db) {
    throw new Error(
      "Database is not initialized. Check your .env Firebase credentials."
    );
  }

  const key = sanitizeEmail(personalEmail);
  const snapshot = await db.ref(`usersByEmail/${key}`).once("value");

  return snapshot.exists();
}

/**
 * Creates a new user.
 *
 * The email index is reserved using a Firebase transaction so that
 * two simultaneous registrations cannot use the same email.
 */
async function createUser(userData) {
  if (!db) {
    throw new Error(
      "Database is not initialized. Check your .env Firebase credentials."
    );
  }

  const sanitizedEmail = sanitizeEmail(userData.personalEmail);

  // Generate UID first.
  const newUserRef = db.ref("users").push();
  const uid = newUserRef.key;

  /*
   * Atomically reserve the email.
   *
   * If the email already exists, the transaction is aborted.
   */
  const emailRef = db.ref(`usersByEmail/${sanitizedEmail}`);

  const transactionResult = await emailRef.transaction((currentValue) => {
    if (currentValue !== null) {
      return; // Abort transaction because email is already registered.
    }

    return uid;
  });

  if (!transactionResult.committed) {
    const error = new Error("User with this personal email already exists.");
    error.statusCode = 409;
    throw error;
  }

  const userPayload = {
    name: userData.name || "",
    collegeEnrollmentNo: userData.collegeEnrollmentNo || "",
    collegeEmail: userData.collegeEmail || "",
    personalEmail: userData.personalEmail,
    branch: userData.branch || "",
    yearOfPassing: Number(userData.yearOfPassing) || null,
    phone: userData.phone || "",
    domain: userData.domain,
    role: userData.role || "member",
    status: "pending",
    passwordHash: userData.passwordHash,
    rtfId: userData.rtfId || null,
    createdAt: Date.now(),
    approvedBy: null,
  };

  try {
    /*
     * Write the actual user record.
     *
     * The email has already been atomically reserved above.
     */
    await db.ref(`users/${uid}`).set(userPayload);
  } catch (error) {
    /*
     * If creating the user fails, release the email reservation
     * so the user can try registering again.
     */
    await emailRef.remove();
    throw error;
  }

  return {
    uid,
    ...userPayload,
  };
}

/**
 * Retrieves a user directly by UID.
 */
async function getUserByUid(uid) {
  if (!db) {
    throw new Error(
      "Database is not initialized. Check your .env Firebase credentials."
    );
  }

  const snapshot = await db.ref(`users/${uid}`).once("value");

  if (!snapshot.exists()) {
    return null;
  }

  return {
    uid,
    ...snapshot.val(),
  };
}

/**
 * Fetches a user by personal email.
 */
async function getUserByEmail(personalEmail) {
  if (!db) {
    throw new Error(
      "Database is not initialized. Check your .env Firebase credentials."
    );
  }

  const sanitizedEmail = sanitizeEmail(personalEmail);

  const uidSnapshot = await db
    .ref(`usersByEmail/${sanitizedEmail}`)
    .once("value");

  if (!uidSnapshot.exists()) {
    return null;
  }

  const uid = uidSnapshot.val();

  const userSnapshot = await db
    .ref(`users/${uid}`)
    .once("value");

  if (!userSnapshot.exists()) {
    return null;
  }

  return {
    uid,
    ...userSnapshot.val(),
  };
}

/**
 * Retrieves a user directly by UID.
 */
async function getUserById(uid) {
  if (!db) {
    throw new Error(
      "Database is not initialized. Check your .env Firebase credentials."
    );
  }

  const snapshot = await db.ref(`users/${uid}`).once("value");

  if (!snapshot.exists()) {
    return null;
  }

  return {
    uid,
    ...snapshot.val(),
  };
}

/**
 * Updates specific user fields.
 */
async function updateUser(uid, updateData) {
  if (!db) {
    throw new Error(
      "Database is not initialized. Check your .env Firebase credentials."
    );
  }

  await db.ref(`users/${uid}`).update(updateData);

  return true;
}

module.exports = {
  emailExists,
  createUser,
  getUserByUid,
  getUserByEmail,
  getUserById,
  updateUser,
};