// validators/authValidators.js
// ─────────────────────────────────────────────────────────────
// zod schemas describing exactly what a valid request body looks
// like for each auth endpoint. Keep validation rules HERE, not
// scattered inside controllers — one place to check/update them.
// ─────────────────────────────────────────────────────────────

const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  collegeEnrollmentNo: z.string().min(3, 'Enter a valid enrollment number'),
  collegeEmail: z.string().email('Enter a valid college email'),
  personalEmail: z.string().email('Enter a valid personal email'),
  branch: z.string().min(2, 'Branch is required'),
  yearOfPassing: z.coerce
    .number()
    .int()
    .min(2024, 'Year of passing looks invalid')
    .max(2035, 'Year of passing looks invalid'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  domain: z.enum(['software', 'electrical', 'aeromech'], {
    errorMap: () => ({ message: 'Choose a valid domain' }),
  }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// Placeholder for when you build the login route next — same
// pattern, smaller schema. Uncomment and use in loginController.js.
// const loginSchema = z.object({
//   personalEmail: z.string().email(),
//   password: z.string().min(1, 'Password is required'),
// });

module.exports = {
  registerSchema,
  // loginSchema,
};