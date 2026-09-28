import { motion } from 'framer-motion';
import { pageTransition } from '../lib/animations';
import AuthCard from '../components/auth/AuthCard';
import rtfLogo from '../assets/images/rtf-logo-img.jpg';

export default function Login() {
  // TODO: wire this up to the real login endpoint once it's ready.
  // AuthCard already handles its own loading/error state — just make
  // this throw (or reject) on failure and LoginForm will surface it.
  const handleLogin = async ({ rtfId, password }) => {
    throw new Error('Member portal coming soon. Contact RTF leader for access.');
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
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8 max-w-sm mx-auto">
          <div className="w-14 h-14 rounded-full bg-white dark:bg-transparent border-2 border-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(255,32,32,0.15)] dark:shadow-[0_0_15px_rgba(255,32,32,0.3)] transition-colors duration-300 overflow-hidden">
            <img src={rtfLogo} alt="RTF Logo" className="w-full h-full object-cover invert dark:invert-0" />
          </div>
          <h1 className="text-h2 text-text-primary">Member Access</h1>
          <p className="text-sm text-text-secondary mt-2">
            Access the RTF member portal for team resources, schedules, and internal tools.
          </p>
        </div>

        <AuthCard onLogin={handleLogin} />

        <div className="mt-6 text-center">
          <p className="text-xs text-text-muted">
            Not a member?{' '}
            <a href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Contact us to join RTF
            </a>
          </p>
        </div>
      </div>
    </motion.main>
  );
}