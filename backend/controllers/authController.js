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
const {
  hashPassword,
  comparePassword,
  generateAccessToken,
} = require("../services/authService");
const { generateRtfId } = require("../services/idGeneratorService");
const asyncHandler = require("../utils/asyncHandler");


const { appendUserToSheet } = require('../services/sheetsService');

/**
/**
 * POST /api/auth/register
 */
const register = asyncHandler(async (req, res) => {
  // 1. Destructure domain, yearOfPassing, personalEmail, password, and collect the rest
  const { personalEmail, password, domain, yearOfPassing, ...rest } = req.body;

  // 2. Validate required fields
  if (!personalEmail || !password || !domain || !yearOfPassing) {
    const error = new Error(
      "personalEmail, password, domain, and yearOfPassing are required fields."
    );
    error.statusCode = 400;
    throw error;
  }

  // 3. Check duplicate user
  const existingUser = await userModel.getUserByEmail(personalEmail);
  if (existingUser) {
    const error = new Error(
      "User with this personal email already exists."
    );
    error.statusCode = 409;
    throw error;
  }

  // 4. Hash password
  const passwordHash = await hashPassword(password);

  // 5. Create user in Firebase DB
  // Passing domain and yearOfPassing together with rest
  const { uid, rtfId } = await userModel.createUser({
    ...rest,
    domain,
    yearOfPassing,
    personalEmail,
    passwordHash,
  });

  // 6. Prepare data & Append to Google Sheets (non-blocking)
  const sheetData = {
    ...rest,
    domain,
    yearOfPassing,
    personalEmail,
    uid,
    rtfId,
    status: 'pending',
    createdAt: Date.now(),
  };

  appendUserToSheet(sheetData);

  // 7. Respond
  res.status(201).json({
    success: true,
    message: "Registration successful. Account pending approval.",
    data: {
      uid,
      rtfId,
    },
  });
});


/**
 * POST /api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { rtfId, password } = req.body;

  // 1. Validate input
  if (!rtfId || !password) {
    const error = new Error(
      "Both rtfId and password are required."
    );
    error.statusCode = 400;
    throw error;
  }

  // 2. Find user
  const user = await userModel.getUserByRtfId(rtfId);

  if (!user) {
    const error = new Error("Invalid credentials.");
    error.statusCode = 401;
    throw error;
  }

  // 3. Compare password
  const isPasswordValid = await comparePassword(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    const error = new Error("Invalid credentials.");
    error.statusCode = 401;
    throw error;
  }

  // 4. Check account status
  if (user.status !== "active") {
    const error = new Error(
      "Your account has not been approved yet."
    );
    error.statusCode = 403;
    throw error;
  }

  // 5. Generate JWT
  const token = generateAccessToken({
    uid: user.uid,
    role: user.role,
    domain: user.domain,
  });

  // 6. Remove passwordHash
  const { passwordHash: _, ...safeUserData } = user;

  // 7. Send response
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: safeUserData,
    },
  });
});

module.exports = {
  register,
  login,
};