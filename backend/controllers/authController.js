// controllers/authController.js
// ─────────────────────────────────────────────────────────────
// THIS FILE IS THE TEMPLATE. When you build any other module
// (recruitment, mail, room status), copy this same pattern:
//   1. Receive already-validated req.body (validation happened
//      in middleware, BEFORE this function even runs)
//   2. Call model/service functions — never touch Firebase or
//      bcrypt/jwt directly in here
//   3. Return a consistent { success, data } or throw an error
//      with a .statusCode (asyncHandler + errorHandler take it
//      from there)
// ─────────────────────────────────────────────────────────────

const userModel = require('../models/userModel');
const { hashPassword } = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * POST /api/auth/register
 * Body (already validated by validateRequest(registerSchema)):
 *   name, collegeEnrollmentNo, collegeEmail, personalEmail,
 *   branch, yearOfPassing, phone, domain, password
 *
 * Flow:
 *   1. Check personalEmail isn't already registered
 *   2. Hash the password (NEVER store it plain)
 *   3. Create the user record (status: "pending")
 *   4. Return success — the frontend shows a
 *      "awaiting domain admin approval" message, NOT a logged-in state.
 *      (No JWT is issued here — the account can't log in until approved.
 *      The login endpoint, built the same way, checks status === "active".)
 */
const register = asyncHandler(async (req, res) => {
  const { personalEmail, password, ...rest } = req.body;

  // 1. Duplicate check
  const alreadyExists = await userModel.emailExists(personalEmail);
  if (alreadyExists) {
    // Throwing an error with .statusCode is how we control the
    // HTTP status code that errorHandler.js eventually sends.
    const err = new Error('An account with this email already exists');
    err.statusCode = 409; // 409 Conflict
    throw err;
  }

  // 2. Hash the password — this is the ONLY place a password
  //    should ever be touched in plain text, and it happens
  //    immediately, before anything is stored.
  const passwordHash = await hashPassword(password);

  // 3. Create the record via the model (model handles the
  //    /users + /usersByEmail multi-path write internally)
  const { uid } = await userModel.createUser({
    ...rest,
    personalEmail,
    passwordHash,
  });

  // 4. Respond — 201 Created, consistent { success, data } shape
  res.status(201).json({
    success: true,
    data: {
      uid,
      message: 'Registration received. Your domain admin will review your request.',
    },
  });
});

// ─────────────────────────────────────────────────────────────
// NEXT UP (build these the same way, as separate functions below,
// once register is tested and working):
//
// const login = asyncHandler(async (req, res) => {
//   1. userModel.getUserByEmail(personalEmail)
//   2. if not found → 401 "Invalid credentials" (don't reveal
//      whether it was the email or password that was wrong)
//   3. if found but status !== "active" → 403 "Account pending approval"
//   4. comparePassword(password, user.passwordHash) → if false, 401
//   5. generateAccessToken({ uid, role, domain })
//   6. res.json({ success: true, data: { token, user: {...safe fields} } })
//      — NEVER include passwordHash in what you send back!
// });
//
// const getMe = asyncHandler(async (req, res) => {
//   // req.user is attached by authMiddleware.js after verifying the JWT
//   const user = await userModel.getUserByUid(req.user.uid);
//   res.json({ success: true, data: user });
// });
// ─────────────────────────────────────────────────────────────

module.exports = {
  register,
  // login,
  // getMe,
};