// validators/authValidators.js
// ─────────────────────────────────────────────────────────────
// zod schemas describing exactly what a valid request body looks
// like for each auth endpoint. Keep validation rules HERE, not
// scattered inside controllers — one place to check/update them.
// ─────────────────────────────────────────────────────────────

const { z } = require('zod');

// Exactly 4 allowed domains
const ALLOWED_DOMAINS = [
  'software',
  'electronics',
  'aeromech',
];

// Preprocess logic converts inputs like "Electronics", "ELECTRONICS" -> "electronics"
const domainValidation = z.preprocess(
  (val) => (typeof val === 'string' ? val.trim().toLowerCase() : val),
  z.enum(ALLOWED_DOMAINS, {
    errorMap: () => ({ message: 'Choose a valid domain' }),
  })
);

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  collegeEnrollmentNo: z.string().trim().min(3, 'Enter a valid enrollment number'),
  collegeEmail: z.string().trim().email('Enter a valid college email'),
  personalEmail: z.string().trim().email('Enter a valid personal email'),
  branch: z.string().trim().min(2, 'Branch is required'),
  yearOfPassing: z.coerce
    .number()
    .int()
    .min(2024, 'Year of passing looks invalid')
    .max(2035, 'Year of passing looks invalid'),
  phone: z.string().trim().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  
  // Case-insensitive domain validation for the 4 domains
  domain: domainValidation,

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// Placeholder for login route
// const loginSchema = z.object({
//   personalEmail: z.string().trim().email('Enter a valid personal email'),
//   password: z.string().min(1, 'Password is required'),
// });

module.exports = {
  registerSchema,
//   loginSchema,
};