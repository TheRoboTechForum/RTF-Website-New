// services/authService.js
// ─────────────────────────────────────────────────────────────
// Business logic for authentication that ISN'T tied to a single
// HTTP request: hashing passwords, comparing them, and signing/
// verifying JWTs. Controllers call these — they never call
// bcrypt/jsonwebtoken directly themselves.
// ─────────────────────────────────────────────────────────────

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10; // higher = slower but more secure; 10 is a solid default

/**
 * Hashes a plain-text password before storing it.
 * NEVER store req.body.password directly — always hash first.
 * @param {string} plainPassword
 * @returns {Promise<string>} bcrypt hash
 */
async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Compares a login attempt's plain password against the stored hash.
 * @param {string} plainPassword - what the user typed at login
 * @param {string} hash - what's stored in /users/{uid}/passwordHash
 * @returns {Promise<boolean>} true if they match
 */
async function comparePassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

/**
 * Signs a JWT for a logged-in/approved user.
 * We embed uid and role in the payload — roleMiddleware.js reads
 * decoded.role directly instead of hitting the DB on every request.
 * @param {{ uid: string, role: string, domain: string }} payload
 * @returns {string} signed JWT
 */
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d', // adjust based on how long you want sessions to last
  });
}

/**
 * Verifies and decodes a JWT. Throws if invalid/expired —
 * authMiddleware.js catches this and responds with 401.
 * @param {string} token
 */
function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  hashPassword,
  comparePassword,
  generateAccessToken,
  verifyAccessToken,
};