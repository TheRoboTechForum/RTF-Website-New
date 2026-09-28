import { useState } from 'react';
import { X } from 'lucide-react';
import HoloCard from '../ui/HoloCard';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

/**
 * AuthCard — single container that toggles between the "Log in" and
 * "Create Account" views, using the site's existing HoloCard / NeoButton
 * design tokens throughout.
 *
 * - Login is RTF ID + password only (see LoginForm.jsx).
 * - "Create Account" uses the existing member-application RegisterForm.jsx
 *   (name, collegeEnrollmentNo, collegeEmail, personalEmail, branch,
 *   yearOfPassing, phone, domain, password) — same component the /register
 *   page already drives, so both entry points submit through one
 *   validated path (see utils/validators.js + services/authService.js).
 *
 * Usage:
 *   <AuthCard
 *     onLogin={async ({ rtfId, password }) => { ... }}
 *     onForgotPassword={() => { ... }}
 *   />
 *
 * Pass `onClose` if this is rendered inside a modal/dialog — it renders
 * the top-right "X". Omit it (e.g. used as a full page like pages/Login.jsx)
 * and the close button is hidden.
 *
 * @param {object} props
 * @param {'login'|'signup'} [props.initialView='login']
 * @param {() => void} [props.onClose]
 * @param {(credentials: { rtfId: string, password: string }) => void|Promise<void>} [props.onLogin]
 * @param {() => void} [props.onForgotPassword]
 * @param {string} [props.className]
 */
export default function AuthCard({
  initialView = 'login',
  onClose,
  onLogin,
  onForgotPassword,
  className = '',
}) {
  const [view, setView] = useState(initialView);
  const [successMessage, setSuccessMessage] = useState(null);

  const switchToLogin = () => {
    setSuccessMessage(null);
    setView('login');
  };

  return (
    <HoloCard
      glow="cyan"
      className={`relative p-8 mx-auto transition-[max-width] duration-300 ${
        view === 'login' ? 'max-w-sm' : 'max-w-2xl'
      } ${className}`}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>
      )}

      {view === 'login' && (
        <LoginForm
          onSwitchToSignup={() => setView('signup')}
          onSubmit={onLogin}
          onForgotPassword={onForgotPassword}
        />
      )}

      {view === 'signup' && successMessage && (
        <div className="text-center space-y-3 py-4">
          <p className="text-emerald-400 text-sm">{successMessage}</p>
          <p className="text-sm text-text-muted">
            You'll be able to log in once your domain admin approves your request.
          </p>
          <button
            type="button"
            onClick={switchToLogin}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium mt-2"
          >
            Back to Log in
          </button>
        </div>
      )}

      {view === 'signup' && !successMessage && (
        <div>
          <div className="mb-6">
            <h2 className="text-h2 text-text-primary">Create Account</h2>
            <p className="text-xs text-text-muted mt-1 uppercase tracking-wide">
              For existing RTF members only
            </p>
            <p className="text-sm text-text-secondary mt-2">
              Already have an account?{' '}
              <button
                type="button"
                onClick={switchToLogin}
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Log in
              </button>
            </p>
          </div>
          <RegisterForm onSuccess={setSuccessMessage} />
        </div>
      )}
    </HoloCard>
  );
}