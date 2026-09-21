// routes/authRoutes.js
// ─────────────────────────────────────────────────────────────
// A route file's ONLY job: map an HTTP method + path to a
// controller function, running any middleware (validation, auth
// checks) in between. NO business logic belongs in this file.
//
// This is the file to copy when starting a new module — e.g.
// routes/recruitmentRoutes.js, routes/mailRoutes.js — same shape,
// different controller.
// ─────────────────────────────────────────────────────────────

const express = require('express');
const router = express.Router();

const { register , getMe} = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerSchema } = require('../validators/authValidators');

// POST /api/auth/register
// Request flow: validateRequest checks req.body against
// registerSchema FIRST — if it fails, the request never even
// reaches the `register` controller. If it passes, req.body is
// replaced with the clean, parsed data.
router.post('/register', validateRequest(registerSchema), register);



// GET /api/auth/me
//
// Protected route:
// 1. authMiddleware runs first.
// 2. It checks the JWT from the Authorization header.
// 3. If the JWT is valid, it attaches the user's uid to req.user.
// 4. getMe uses that uid to fetch the user from /users/{uid}.
// 5. If the token is missing/invalid, authMiddleware returns 401
//    and getMe never runs.
//
// No business logic belongs in this route file.
// The actual user fetching is handled by the getMe controller
router.get('/me', authMiddleware, getMe);


// ─────────────────────────────────────────────────────────────
// NEXT ENDPOINTS TO ADD HERE (same pattern):
//
// const { login, getMe } = require('../controllers/authController');
// const authMiddleware = require('../middlewares/authMiddleware');
// const { loginSchema } = require('../validators/authValidators');
//
// router.post('/login', validateRequest(loginSchema), login);
//

// ─────────────────────────────────────────────────────────────


module.exports = router;