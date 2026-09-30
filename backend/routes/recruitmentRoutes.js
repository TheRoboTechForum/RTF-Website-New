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

const { recruitmentRegister } = require('../controllers/recruitmentController');
const validateRequest = require('../middlewares/validateRequest');
const { recruitmentRegisterSchema } = require('../validators/recruitmentValidators');

// POST /api/auth/register
// Request flow: validateRequest checks req.body against
// registerSchema FIRST — if it fails, the request never even
// reaches the `register` controller. If it passes, req.body is
// replaced with the clean, parsed data.
router.post('/register-recruitment', validateRequest(recruitmentRegisterSchema), recruitmentRegister);

module.exports = router;