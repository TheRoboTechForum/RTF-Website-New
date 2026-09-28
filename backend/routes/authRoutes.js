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

const { register } = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const { registerSchema } = require('../validators/authValidators');

// POST /api/auth/register
// Request flow: validateRequest checks req.body against
// registerSchema FIRST — if it fails, the request never even
// reaches the `register` controller. If it passes, req.body is
// replaced with the clean, parsed data.
router.post('/register', validateRequest(registerSchema), register);

// ─────────────────────────────────────────────────────────────
// NEXT ENDPOINTS TO ADD HERE (same pattern):
//
// const { login, getMe } = require('../controllers/authController');
// const authMiddleware = require('../middlewares/authMiddleware');
// const { loginSchema } = require('../validators/authValidators');
//
// router.post('/login', validateRequest(loginSchema), login);
//
// // A PROTECTED route — authMiddleware runs first, checks the JWT
// // in the Authorization header, and attaches req.user if valid.
// // If invalid/missing, it responds 401 and getMe never runs.
// router.get('/me', authMiddleware, getMe);
// ─────────────────────────────────────────────────────────────

module.exports = router;