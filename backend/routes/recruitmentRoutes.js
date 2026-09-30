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
const multer = require('multer');

const { recruitmentRegister } = require('../controllers/recruitmentController');
const validateRequest = require('../middlewares/validateRequest');
const { recruitmentRegisterSchema } = require('../validators/recruitmentValidators');

const parseRecruitmentFields = multer().none();
console.log("entering into register-recruitment ");

router.post(
  '/register-recruitment',
  parseRecruitmentFields,
  validateRequest(recruitmentRegisterSchema),
  recruitmentRegister
);

module.exports = router;