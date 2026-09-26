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
const express = require("express");
const router = express.Router();

const { register, login } = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const { registerSchema, loginSchema } = require('../validators/authValidators');

// POST /api/auth/register
// Request flow: validateRequest checks req.body against
// registerSchema FIRST — if it fails, the request never even
// reaches the `register` controller. If it passes, req.body is
// replaced with the clean, parsed data.
router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

// POST /api/auth/login
router.post(
  "/login",
  validateRequest(loginSchema),
  login
);

module.exports = router;