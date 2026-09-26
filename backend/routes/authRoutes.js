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

const { register, login } = require("../controllers/authController");
const validateRequest = require("../middlewares/validateRequest");
const {
  registerSchema,
  loginSchema,
} = require("../validators/authValidators");

// POST /api/auth/register
router.post(
  "/register",
  validateRequest(registerSchema),
  register
);

// POST /api/auth/login
router.post(
  "/login",
  validateRequest(loginSchema),
  login
);

module.exports = router;