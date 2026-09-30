// src/components/auth/RegisterForm.jsx
// ─────────────────────────────────────────────────────────────
// THIS COMPONENT IS THE TEMPLATE. When you build any other form
// (ApplicationForm, MailComposer, etc.), copy this exact pattern:
//
//   1. useForm + zodResolver → gives you register(), handleSubmit(),
//      and formState.errors for free, matched against a zod schema
//   2. handleSubmit(onSubmit) → onSubmit only ever runs with data
//      that ALREADY passed frontend validation
//   3. Inside onSubmit: call the service function, not axios directly
//   4. On success → tell the parent (via a callback prop) so IT
//      decides what happens next (redirect, show message, etc.) —
//      this component doesn't own navigation logic
//   5. On error → distinguish field-level errors (show under the
//      specific input) from general errors (show as a banner/toast)
//
// Styling note: fields use the same token set as LoginForm.jsx /
// pages/Login.jsx (bg-elevated, border-border, text-text-primary,
// focus:border-cyan-500/50 …) rather than a bare `.input` class —
// that class doesn't exist anywhere in globals.css, which is why
// typed text used to be invisible (browser default black-on-dark).
// ─────────────────────────────────────────────────────────────

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Hash,
  Calendar,
  Phone,
  GraduationCap,
  Layers,
  ChevronDown,
  FileText,
} from 'lucide-react';
import {
  registerSchema,
  BRANCH_OPTIONS,
  DOMAIN_OPTIONS,
  MIN_YEAR_OF_PASSING,
  MAX_YEAR_OF_PASSING,
} from '../../utils/validators';
import { registerUser } from '../../services/authService';
import NeoButton from '../ui/NeoButton';
import { toast } from 'react-toastify';

const inputClasses =
  'w-full pl-10 pr-4 py-3 bg-elevated border border-border rounded-button text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all';

const selectClasses =
  'w-full appearance-none pl-10 pr-9 py-3 bg-elevated border border-border rounded-button text-sm text-text-primary focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all';

/** Text/email/tel/number input with a leading icon, label above, and an error line below. */
function Field({ id, label, icon: Icon, error, registration, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="text-label text-text-muted block mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input id={id} className={inputClasses} {...registration} {...inputProps} />
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5">{error.message}</p>}
    </div>
  );
}

/** Password input with a leading lock icon and a show/hide toggle. */
function PasswordField({ id, label, error, registration, placeholder }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="text-label text-text-muted block mb-2">
        {label}
      </label>
      <div className="relative">
        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete="new-password"
          className={`${inputClasses} pr-11`}
          {...registration}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5">{error.message}</p>}
    </div>
  );
}

/** Native select with a leading icon, styled to match the text inputs. */
function SelectField({ id, label, icon: Icon, error, registration, placeholder, options, getValue, getLabel }) {
  return (
    <div>
      <label htmlFor={id} className="text-label text-text-muted block mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <select id={id} defaultValue="" className={selectClasses} {...registration}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={getValue(opt)} value={getValue(opt)}>
              {getLabel(opt)}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5">{error.message}</p>}
    </div>
  );
}

/**
 * @param {{ onSuccess: (message: string) => void }} props
 *   onSuccess is called with a message once registration succeeds —
 *   the parent (AuthCard / Register.jsx) decides what to render next.
 */
export default function RegisterForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(registerSchema) });

  const [formError, setFormError] = useState(null);
  const [marksheetFile, setMarksheetFile] = useState(null);

  const onSubmit = async (data) => {
    setFormError(null);

    if (!marksheetFile) {
      setFormError('Please upload your combined marksheet PDF.');
      return;
    }

    if (marksheetFile.type !== 'application/pdf') {
      setFormError('Only PDF files are allowed.');
      return;
    }

    if (marksheetFile.size > 5 * 1024 * 1024) {
      setFormError('Marksheet PDF must be 5 MB or smaller.');
      return;
    }

    const { confirmPassword, ...payload } = data;
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('marksheet', marksheetFile);

    try {
      const result = await registerUser(formData);
      toast.success(result.message || 'Registration successful!', {
        position: 'top-center',
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      onSuccess(result.message);
    } catch (err) {
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          setError(field, { message: messages[0] });
        });
      } else {
        setFormError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {formError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-button">
          <p className="text-xs font-mono text-red-400">{formError}</p>
        </div>
      )}

      <Field
        id="reg-name"
        label="Full Name"
        icon={User}
        placeholder="Your full name"
        error={errors.name}
        registration={register('name')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          id="reg-enrollment"
          label="College Enrollment No."
          icon={Hash}
          placeholder="8-digit number"
          inputMode="numeric"
          maxLength={8}
          error={errors.collegeEnrollmentNo}
          registration={register('collegeEnrollmentNo')}
        />
        <Field
          id="reg-year"
          label="Year of Passing"
          icon={Calendar}
          type="number"
          placeholder={String(MIN_YEAR_OF_PASSING)}
          min={MIN_YEAR_OF_PASSING}
          max={MAX_YEAR_OF_PASSING}
          error={errors.yearOfPassing}
          registration={register('yearOfPassing')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          id="reg-college-email"
          label="College Email"
          icon={Mail}
          type="email"
          placeholder="you@gcoea.ac.in"
          error={errors.collegeEmail}
          registration={register('collegeEmail')}
        />
        <Field
          id="reg-personal-email"
          label="Personal Email"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          error={errors.personalEmail}
          registration={register('personalEmail')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField
          id="reg-branch"
          label="Branch"
          icon={GraduationCap}
          placeholder="Select Branch"
          error={errors.branch}
          registration={register('branch')}
          options={BRANCH_OPTIONS}
          getValue={(b) => b}
          getLabel={(b) => b}
        />
        <SelectField
          id="reg-domain"
          label="Domain"
          icon={Layers}
          placeholder="Select Domain"
          error={errors.domain}
          registration={register('domain')}
          options={DOMAIN_OPTIONS}
          getValue={(d) => d.value}
          getLabel={(d) => d.label}
        />
      </div>

      <Field
        id="reg-phone"
        label="Phone Number"
        icon={Phone}
        type="tel"
        placeholder="10-digit mobile number"
        inputMode="numeric"
        maxLength={10}
        error={errors.phone}
        registration={register('phone')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <PasswordField
          id="reg-password"
          label="Password"
          placeholder="Create a password"
          error={errors.password}
          registration={register('password')}
        />
        <PasswordField
          id="reg-confirm-password"
          label="Confirm Password"
          placeholder="Re-enter password"
          error={errors.confirmPassword}
          registration={register('confirmPassword')}
        />
      </div>

      {/* <div>
        <label htmlFor="marksheet" className="text-label text-text-muted block mb-2">
          Upload Combined Marksheets
        </label>
        <p className="text-xs text-text-muted mb-2">
          Please combine your 10th, 12th, CET, JEE Main, and/or Diploma marksheets into a single PDF.
          Only PDF files are accepted. Maximum file size: 5 MB.
        </p>
        <div className="relative">
          <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            id="marksheet"
            type="file"
            accept="application/pdf,.pdf"
            className={`${inputClasses} pl-10`}
            onChange={(event) => setMarksheetFile(event.target.files?.[0] || null)}
          />
        </div>
        {marksheetFile && (
          <p className="text-xs text-cyan-300 mt-2">Selected: {marksheetFile.name}</p>
        )}
      </div> */}

      <NeoButton type="submit" disabled={isSubmitting} className="w-full justify-center">
        {isSubmitting ? 'Submitting…' : 'Register'}
      </NeoButton>
    </form>
  );
}