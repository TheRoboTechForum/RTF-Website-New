import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../lib/animations';
import HoloCard from '../components/ui/HoloCard';
import NeoButton from '../components/ui/NeoButton';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — wire to Firebase / Supabase / custom backend
    setError('Member portal coming soon. Contact RTF leadership for access.');
  };

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center px-6 py-28"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto mb-4">
            <span className="font-display font-bold text-cyan-400 text-xl">RTF</span>
          </div>
          <h1 className="text-h2 text-text-primary">Member Login</h1>
          <p className="text-sm text-text-secondary mt-2">
            Access the RTF member portal for team resources, schedules, and internal tools.
          </p>
        </div>

        <HoloCard glow="cyan" className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="text-label text-text-muted block mb-2">
                EMAIL
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  id="login-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gcoea.ac.in"
                  className="w-full pl-10 pr-4 py-3 bg-elevated border border-border rounded-button text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="text-label text-text-muted block mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            {/* Error */}
            {error && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-button">
                <p className="text-xs font-mono text-amber-400">{error}</p>
              </div>
            )}

            <NeoButton type="submit" className="w-full justify-center">
              SIGN IN
            </NeoButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-text-muted">
              Not a member?{' '}
              <a href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Contact us to join RTF
              </a>
            </p>
          </div>
        </HoloCard>
      </div>
    </motion.main>
  );
}
