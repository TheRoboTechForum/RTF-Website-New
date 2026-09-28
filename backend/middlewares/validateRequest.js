// middlewares/validateRequest.js
// ─────────────────────────────────────────────────────────────
// A REUSABLE middleware — don't hand-write validation logic
// inside every controller. Instead, define a zod schema per
// route (see validators/authValidators.js) and plug it in here.
//
// Usage in a route file:
//   const { registerSchema } = require('../validators/authValidators');
//   router.post('/register', validateRequest(registerSchema), register);
// ─────────────────────────────────────────────────────────────

/**
 * @param {import('zod').ZodSchema} schema - a zod schema to validate req.body against
 */
function validateRequest(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // .flatten() turns zod's error tree into a simple
      // { fieldName: [messages] } object — easy for the frontend
      // to map onto specific form fields.
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        fieldErrors: result.error.flatten().fieldErrors,
      });
    }

    // Replace req.body with the *parsed* data — zod can coerce
    // types (e.g. string "2027" → number 2027 if schema says so),
    // so downstream code should use this cleaned version.
    req.body = result.data;
    next();
  };
}

module.exports = validateRequest;