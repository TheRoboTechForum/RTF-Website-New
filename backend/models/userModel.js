// models/userModel.js
// ─────────────────────────────────────────────────────────────
// Model functions for Firebase Realtime Database.
//
// User structure:
// /users/{yearOfPassing}/{rtfId}
//
// Email index:
// /usersByEmail/{sanitizedEmail}
//
// Controllers must NOT call db.ref(...) directly.
// ─────────────────────────────────────────────────────────────
const { db } = require("../config/firebaseAdmin");
const sanitizeEmail = require("../utils/sanitizeEmail");

/**
 * Checks whether a personal email already exists.
 * User structure:
 *
 * /users/{yearOfPassing}/{rtfId}
 *
 * {
 *   uid,
 *   name,
 *   collegeEnrollmentNo,
 *   collegeEmail,
 *   personalEmail,
 *   branch,
 *   yearOfPassing,
 *   phone,
 *   domain,
 *   role,
 *   status,
 *   passwordHash,
 *   rtfId,
 *   createdAt,
 *   approvedBy
 * }
 */

/**
 * Checks whether a personal email is already registered.
 *
 * Uses the /usersByEmail index for O(1) lookup.
 *
 * @param {string} personalEmail
 * @returns {Promise<boolean>}
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
  getUserByRtfId,
  rtfIdExists,
};