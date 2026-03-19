import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../lib/animations';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/team', label: 'Team' },
  { path: '/sponsors', label: 'Sponsors' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled && !mobileOpen
          ? 'glass shadow-card'
          : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="RTF Home">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center group-hover:shadow-glow-cyan transition-shadow duration-300">
            <span className="font-display font-bold text-cyan-400 text-sm">RTF</span>
          </div>
          <span className="font-display font-semibold text-text-primary text-lg hidden sm:block">
            Robo-Tech Forum
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-button ${isActive
                      ? 'text-cyan-400'
                      : 'text-text-secondary hover:text-text-primary'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Login Button */}
        <Link
          to="/login"
          className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-mono font-medium text-cyan-400 border border-cyan-500/30 rounded-button hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-200"
        >
          MEMBER LOGIN
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-text-secondary hover:text-cyan-400 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 bg-deep/98 backdrop-blur-xl lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center justify-center min-h-screen gap-6 px-6"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div key={link.path} variants={fadeUp}>
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`text-2xl font-display font-semibold transition-colors ${isActive ? 'text-cyan-400' : 'text-text-secondary hover:text-text-primary'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={fadeUp} className="mt-6">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 text-sm font-mono font-medium text-cyan-400 border border-cyan-500/30 rounded-button hover:bg-cyan-500/10 transition-all"
                >
                  MEMBER LOGIN
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
