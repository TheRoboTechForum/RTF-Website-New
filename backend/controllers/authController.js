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
const { generateTempRtfId } = require("../services/idGeneratorService");
const asyncHandler = require("../utils/asyncHandler");


/**
 * POST /api/auth/register
 */

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


// controllers/authController.js
const { createUser, getUserByEmail } = require('../models/userModel');
const { hashPassword, /* comparePassword, generateAccessToken*/ } = require('../services/authService');
const { generateTempRtfId } = require('../services/idGeneratorService');

/**
 * REGISTER CONTROLLER
 * Path: POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const {
      name,
      collegeEnrollmentNo,
      collegeEmail,
      personalEmail,
      branch,
      yearOfPassing,
      phone,
      domain,
      password,
    } = req.body;

    // 1. Basic validation
    if (!personalEmail || !password || !domain || !yearOfPassing) {
      return res.status(400).json({
        success: false,
        error: 'personalEmail, password, domain, and yearOfPassing are required fields.',
      });
    }

    // 2. Check if user already exists using O(1) email lookup
    const existingUser = await getUserByEmail(personalEmail);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User with this personal email already exists.',
      });
    }

    // 3. Hash the plain password
    const passwordHash = await hashPassword(password);

    // 4. Generate Temporary RTF ID (e.g., SD27-T01@RTF)
    const rtfId = await generateTempRtfId(domain, yearOfPassing);

    // 5. Save user via userModel (creates /users/{uid} and /usersByEmail/{sanitizedEmail})
    const newUser = await createUser({
      name,
      collegeEnrollmentNo,
      collegeEmail,
      personalEmail,
      branch,
      yearOfPassing,
      phone,
      domain,
      rtfId,             // Temporary RTF ID assigned on registration
      passwordHash,
      role: 'member',    // default role
      status: 'pending', // default status
      createdAt: Date.now(),
    });

    // 6. Omit sensitive fields from output
    const { passwordHash: _, ...safeUserData } = newUser;

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Account pending approval.',
      data: {
        user: safeUserData,
      },
    });
  } catch (error) {
    console.error('Error in register controller:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
};

/**
 * LOGIN CONTROLLER
 * Path: POST /api/auth/login
 */
// const login = async (req, res) => {
//   try {
//     const { personalEmail, password } = req.body;

//     // 1. Input validation
//     if (!personalEmail || !password) {
//       return res.status(400).json({
//         success: false,
//         error: 'Both personalEmail and password are required.',
//       });
//     }

//     // 2. O(1) Fast Lookup via /usersByEmail/{sanitizedEmail}
//     const user = await getUserByEmail(personalEmail);
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         error: 'Invalid credentials.',
//       });
//     }

//     // 3. Compare password with stored bcrypt hash
//     const isPasswordValid = await comparePassword(password, user.passwordHash);
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         error: 'Invalid credentials.',
//       });
//     }

//     // 4. Generate JWT Access Token
//     const token = generateAccessToken({
//       uid: user.uid,
//       role: user.role,
//       domain: user.domain,
//     });

    // 5. Remove passwordHash from response data
//     const { passwordHash, ...safeUserData } = user;

//     return res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       data: {
//         token,
//         user: safeUserData,
//       },
//     });
//   } catch (error) {
//     console.error('Error in login controller:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Internal Server Error',
//     });
//   }
// };

//   res.status(200).json({
//     success: true,
//     message: 'Login successful',
//     data: {
//       token,
//       user: safeUser,
//     },
//   });
// });
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


  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: safeUser,
    },
  });
});
module.exports = {
  register,
//   login,
};