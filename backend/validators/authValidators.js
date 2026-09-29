// validators/authValidators.js
// ─────────────────────────────────────────────────────────────
// zod schemas describing exactly what a valid request body looks
// like for each auth endpoint. Keep validation rules HERE, not
// scattered inside controllers — one place to check/update them.
// ─────────────────────────────────────────────────────────────

const { z } = require('zod');

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    personalEmail: z.string().email('Enter a valid personal email'),
    branch: z.string().min(1, 'Branch selection is required'),
    yearOfPassing: z.coerce
      .number()
      .int()
      .refine((val) => [2030, 2029].includes(val), {
        message: 'Year of passing must be 2030 (1st Yr) or 2029 (DSY)',
      }),
    phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    domain: z.enum(['software', 'electrical', 'aero', 'mech']),
    tenthScore: z.coerce.number().min(0).max(100, '10th score must be between 0 and 100'),

    // Optional fields depending on yearOfPassing
    twelfthScore: z.coerce.number().min(0).max(100).optional(),
    cetScore: z.coerce.number().min(0).max(100).optional(),
    jeeMainScore: z.coerce.number().min(0).max(100).optional(),
    diplomaScore: z.coerce.number().min(0).max(100).optional(),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
  })
  .superRefine((data, ctx) => {
    if (data.yearOfPassing === 2030) {
      // 1st Year conditional validation
      if (data.twelfthScore === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '12th percentage is required for 1st Year students',
          path: ['twelfthScore'],
        });
      }
      if (data.cetScore === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CET percentage is required for 1st Year students',
          path: ['cetScore'],
        });
      }
    } else if (data.yearOfPassing === 2029) {
      // DSY conditional validation
      if (data.diplomaScore === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Diploma percentage is required for DSY students',
          path: ['diplomaScore'],
        });
      }
    }
  });

module.exports = {
  registerSchema,
};