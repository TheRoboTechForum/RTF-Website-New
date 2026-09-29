import { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import NeoButton from '../ui/NeoButton';

/**
 * LoginForm — "Log in" view.
 *
 * Structure (content only — styling pulled entirely from the existing
 * RTF design system: HoloCard-compatible spacing, `input` field classes
 * from Login.jsx, NeoButton, cyan accents):
 *   1. Header — title + "Activate Account" / "Register Account" toggle
 *   2. RTF ID field
 *   3. Password field w/ show/hide toggle
 *   4. "Forgot password" link (left-aligned)
 *   5. Full-width "Sign In" submit button
 *
 * No third-party (Google) sign-in — login is RTF ID + password only.
 *
 * @param {object} props
 * @param {() => void} props.onSwitchToSignup - called when account registration is clicked
 * @param {(credentials: { rtfId: string, password: string }) => void|Promise<void>} [props.onSubmit]
 * @param {() => void} [props.onForgotPassword]
 */
export default function LoginForm({ onSwitchToSignup, onSubmit, onForgotPassword }) {
  const [rtfId, setRtfId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!rtfId.trim() || !password) {
      setError('Please fill in both fields.');
      return;
    }

    if (!onSubmit) {
      // No handler wired up yet — mirrors the existing placeholder
      // behaviour in pages/Login.jsx until auth is connected.
      setError('Member portal coming soon. Contact RTF leader for access.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ rtfId: rtfId.trim(), password });
    } catch (err) {
      setError(err?.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-h2 text-text-primary">Log in</h2>
        <p className="text-sm text-text-secondary mt-2">
          Existing RTF member?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            Activate Account
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* RTF ID */}
        <div>
          <label htmlFor="login-rtfid" className="text-label text-text-muted block mb-2">
            RTF ID
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              id="login-rtfid"
              required
              value={rtfId}
              onChange={(e) => setRtfId(e.target.value)}
              placeholder="Enter your RTF ID"
              autoComplete="username"
              className="w-full pl-10 pr-4 py-3 bg-elevated border border-border rounded-button text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="login-password" className="text-label text-text-muted block mb-2">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="login-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              className="w-full pl-10 pr-11 py-3 bg-elevated border border-border rounded-button text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="-mt-2 text-left">
          {onForgotPassword ? (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot password
            </button>
          ) : (
            <span className="text-xs text-cyan-400/70">Forgot password</span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-button">
            <p className="text-xs font-mono text-amber-400">{error}</p>
          </div>
        )}

        <NeoButton type="submit" disabled={isSubmitting} className="w-full justify-center">
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </NeoButton>
      </form>
    </div>
  );
}