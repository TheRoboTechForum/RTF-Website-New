import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from '../lib/animations';
import HoloCard from '../components/ui/HoloCard';
import NeoButton from '../components/ui/NeoButton';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Construction, ArrowRight } from 'lucide-react';

// ── Validation helpers ──────────────────────────────────────────
const RULES = {
  email: {
    required: 'Email is required.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address.',
    },
  },
  password: {
    required: 'Password is required.',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters.',
    },
  },
};

function validate(field, value) {
  const rule = RULES[field];
  if (!value.trim()) return rule.required;
  if (rule.pattern && !rule.pattern.value.test(value)) return rule.pattern.message;
  if (rule.minLength && value.length < rule.minLength.value) return rule.minLength.message;
  return '';
}

// ── Field input ─────────────────────────────────────────────────
function Field({ id, label, type, value, onChange, onBlur, error, placeholder, icon: Icon, rightSlot }) {
  return (
    <div>
      <label htmlFor={id} className="text-label text-text-muted block mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${error ? 'text-error' : 'text-text-muted'
            }`}
        />
        <input
          type="text"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={id === 'email' ? 'email' : 'new-password'}
          className={[
            'w-full pl-10 py-3 bg-elevated border rounded-button text-sm text-text-primary',
            'placeholder:text-text-muted/50 focus:outline-none focus:ring-1 transition-all duration-200',
            rightSlot ? 'pr-11' : 'pr-4',
            error
              ? 'border-error/60 focus:border-error focus:ring-error/20'
              : 'border-border focus:border-cyan-500/50 focus:ring-cyan-500/20',
          ].join(' ')}
          style={
            id === 'password' && type === 'password'
              ? { WebkitTextSecurity: 'disc', letterSpacing: '0.15em' }
              : {}
          }
        />
        {rightSlot}
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs font-mono text-error"
          >
            <AlertCircle size={12} className="shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Coming Soon overlay ─────────────────────────────────────────
function ComingSoonBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center py-10 px-4"
    >
      {/* Pulsing icon ring */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500/40 flex items-center justify-center">
          <Construction size={26} className="text-cyan-400" />
        </div>
      </div>

      <span className="text-label text-cyan-400 mb-2 block tracking-widest">
        // COMING SOON
      </span>

      <h3 className="font-display font-semibold text-text-primary text-xl mb-3">
        Member Portal Under Construction
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-6">
        We're building a secure portal for RTF members. Reach out to club leadership directly for
        team resources in the meantime.
      </p>

      {/* Terminal-style status lines */}
      <div className="w-full max-w-xs text-left font-mono text-xs space-y-1.5 mb-8 p-4 bg-void/60 border border-border/50 rounded-button">
        {[
          { label: 'Authentication', status: 'pending', color: 'text-amber-400' },
          { label: 'Dashboard', status: 'pending', color: 'text-amber-400' },
          { label: 'Resources', status: 'pending', color: 'text-amber-400' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-text-muted">› {item.label}</span>
            <span className={`${item.color} flex items-center gap-1`}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <NeoButton to="/contact" arrow variant="secondary">
        CONTACT LEADERSHIP
      </NeoButton>
    </motion.div>
  );
}

// ── Main Page ───────────────────────────────────────────────────
export default function Login() {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Live validate on change (only for touched fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  // Validate on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields and run full validation
    const emailErr = validate('email', fields.email);
    const passwordErr = validate('password', fields.password);
    setTouched({ email: true, password: true });
    setErrors({ email: emailErr, password: passwordErr });
    if (emailErr || passwordErr) return;

    // Simulate async auth attempt → redirect to coming soon state
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const isFormDirty = fields.email || fields.password;
  const hasErrors = errors.email || errors.password;

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center px-6 py-28"
    >
      {/* Suppress native browser password-reveal icons (Edge ::-ms-reveal, Chrome) */}
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear,
        input[type="password"]::-webkit-credentials-auto-fill-button,
        input[type="password"]::-webkit-strong-password-auto-fill-button {
          display: none !important;
        }
      `}</style>
      <div className="w-full max-w-md">
        {/* Logo / heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto mb-4 shadow-glow-cyan">
            <span className="font-display font-bold text-cyan-400 text-xl">RTF</span>
          </div>
          <h1 className="text-h2 text-text-primary">Member Login</h1>
          <p className="text-sm text-text-secondary mt-2 max-w-xs mx-auto leading-relaxed">
            Access the RTF member portal for team resources, schedules, and internal tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <HoloCard glow="cyan" className="overflow-hidden">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="coming-soon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ComingSoonBadge />
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-8"
                >
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Email */}
                    <Field
                      id="email"
                      label="EMAIL"
                      type="email"
                      value={fields.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email ? errors.email : ''}
                      placeholder="you@gcoea.ac.in"
                      icon={Mail}
                    />

                    {/* Password */}
                    <Field
                      id="password"
                      label="PASSWORD"
                      type={showPassword ? 'text' : 'password'}
                      value={fields.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password ? errors.password : ''}
                      placeholder="Min. 8 characters"
                      icon={Lock}
                      rightSlot={
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      }
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-mono font-semibold tracking-wider rounded-button transition-all duration-250 group mt-2 ${isSubmitting
                          ? 'bg-cyan-500/50 text-deep/60 cursor-not-allowed'
                          : 'bg-cyan-500 text-deep hover:bg-cyan-400 shadow-glow-cyan hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]'
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          {/* Spinner */}
                          <svg
                            className="animate-spin h-4 w-4 text-deep/80"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          AUTHENTICATING...
                        </>
                      ) : (
                        <>
                          SIGN IN
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-0.5 transition-transform duration-200"
                          />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-center text-text-muted mt-6">
                    Not a member?{' '}
                    <a
                      href="/contact"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-2 hover:underline"
                    >
                      Contact us to join RTF
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </HoloCard>
        </motion.div>
      </div>
    </motion.main>
  );
}
