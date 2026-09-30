// controllers/recruitmentController.js.js
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

const { generateTemporaryRtfId } = require('../services/idGeneratorService');
const asyncHandler = require('../utils/asyncHandler');
const { appendUserToSheet } = require('../services/sheetsService');

/**
 * POST /api/recruitment/register-recruitment
 */
const recruitmentRegister = asyncHandler(async (req, res) => {
  const {
    name,
    personalEmail,
    branch,
    yearOfPassing,
    phone,
    domain,
    ...rest
  } = req.body;

  if (!name || !personalEmail || !branch || !yearOfPassing || !phone || !domain) {
    const error = new Error(
      'name, personalEmail, branch, yearOfPassing, phone, and domain are required fields.'
    );
    error.statusCode = 400;
    throw error;
  }

  const rtfId = generateTemporaryRtfId(domain, phone);

  const sheetData = {
    name,
    personalEmail,
    branch,
    yearOfPassing,
    phone,
    domain,
    rtfId,
    ...rest,
    status: 'pending',
    createdAt: Date.now(),
  };

  await appendUserToSheet(sheetData);

  res.status(201).json({
    success: true,
    message: 'Registration successful. Account pending approval.',
    data: {
      rtfId,
    },
  });
});

module.exports = {
  recruitmentRegister,
};