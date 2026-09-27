// utils/sanitizeEmail.js
// ─────────────────────────────────────────────────────────────
// Firebase Realtime Database keys CANNOT contain: . # $ [ ]  or  /
// An email address like "daksh.t@gmail.com" is therefore an
// INVALID key on its own. We need a reversible-enough, safe
// version of it to use as a key in /usersByEmail/{sanitized}.
//
// We're not trying to make this reversible back to the exact
// original string — we just need it to be:
//   1. A valid Firebase key (no forbidden characters)
//   2. Deterministic (same email always produces the same key,
//      so lookups work)
//   3. Unique enough that two different emails never collide
// ─────────────────────────────────────────────────────────────

/**
 * Converts an email into a Firebase-safe key.
 * Example: "daksh.t@gmail.com" → "daksh_t_at_gmail_dot_com"
 *
 * @param {string} email - raw email address
 * @returns {string} sanitized key safe to use in Firebase RTDB
 */
function sanitizeEmail(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('sanitizeEmail: a valid email string is required');
  }

  return email
    .trim()
    .toLowerCase()
    .replace(/@/g, '_at_')     // @ is not forbidden by Firebase, but we
                                // replace it anyway for readability/consistency
    .replace(/\./g, '_dot_')   // . IS forbidden — must replace
    .replace(/#/g, '_hash_')   // forbidden
    .replace(/\$/g, '_dollar_') // forbidden
    .replace(/\[/g, '_lb_')    // forbidden
    .replace(/\]/g, '_rb_')   // forbidden
    .replace(/\//g, '_slash_')    // Added: Protects against forward slashes
    .replace(/[\x00-\x1F\x7F]/g, ''); //Strips out hidden control characters & newlines
}

module.exports = { sanitizeEmail };
