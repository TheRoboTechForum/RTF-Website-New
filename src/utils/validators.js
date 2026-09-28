// src/utils/validators.js
// ─────────────────────────────────────────────────────────────
// Frontend validation MIRRORS the backend's zod schema
// (backend/validators/authValidators.js) — same rules, so the
// user gets instant feedback in the browser instead of waiting
// for a round trip to find out their password is too short.
//
// IMPORTANT: this does NOT replace backend validation. The
// backend validates again, independently — never trust the
// frontend alone, since a request could bypass the UI entirely.
// ─────────────────────────────────────────────────────────────

import { z } from 'zod';

/** Single source of truth for the branch dropdown — used by RegisterForm too. */
export const BRANCH_OPTIONS = [
  'Computer Science',
  'Information Technology',
  'Mechanical',
  'Electrical',
  'Civil',
  'Instrumentation',
];

/** Single source of truth for the domain dropdown — used by RegisterForm too. */
export const DOMAIN_OPTIONS = [
  { value: 'software', label: 'Software Domain' },
  { value: 'electrical', label: 'Electrical Domain' },
  { value: 'aeromech', label: 'Aeronautics & Mechanical Domain' },
];

// Matches name@gcoea.ac.in as well as any subdomain, e.g. name@cse.gcoea.ac.in
const GCOEA_EMAIL_REGEX = /^[\w.+-]+@(?:[\w-]+\.)*gcoea\.ac\.in$/i;

/** Earliest selectable "Year of Passing" — also drives the input's min attribute. */
export const MIN_YEAR_OF_PASSING = 2026;
/** Latest selectable "Year of Passing". */
export const MAX_YEAR_OF_PASSING = 2035;

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    collegeEnrollmentNo: z
      .string()
      .regex(/^\d{8}$/, 'Enrollment number must be exactly 8 digits'),
    collegeEmail: z
      .string()
      .email('Enter a valid college email')
      .regex(GCOEA_EMAIL_REGEX, 'College email must be a gcoea.ac.in address'),
    personalEmail: z.string().email('Enter a valid personal email'),
    branch: z.enum(BRANCH_OPTIONS, {
      errorMap: () => ({ message: 'Select a valid branch' }),
    }),
    yearOfPassing: z.coerce
      .number()
      .int()
      .min(MIN_YEAR_OF_PASSING, `Year of passing must be ${MIN_YEAR_OF_PASSING} or later`)
      .max(MAX_YEAR_OF_PASSING, 'Year of passing looks invalid'),
    phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    domain: z.enum(['software', 'electrical', 'aeromech'], {
      errorMap: () => ({ message: 'Choose a domain' }),
    }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string(),
  })
  // cross-field validation: confirmPassword must match password.
  // This only exists on the frontend — there's no need to send
  // confirmPassword to the backend at all.
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // shows the error under this specific field
  });

/**
 * Login now happens with RTF ID + password only (no email/username).
 * No format is enforced on the ID beyond "non-empty" since RTF IDs
 * aren't necessarily the same shape as the 8-digit enrollment number —
 * tighten this regex once the backend's RTF ID format is confirmed.
 */
export const loginSchema = z.object({
  rtfId: z.string().trim().min(1, 'RTF ID is required'),
  password: z.string().min(1, 'Password is required'),
});