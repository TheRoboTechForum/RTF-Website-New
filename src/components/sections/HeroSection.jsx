import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import NeoButton from '../ui/NeoButton';
import rtfLogo from '../../assets/images/rtf-logo-img.jpg';

const headline = 'ROBO-TECH FORUM';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

/**
 * HeroSection — Raw, authentic hero. RTF logo, decrypt headline, no floating blobs.
 */
export default function HeroSection() {
  const [displayText, setDisplayText] = useState(headline.split('').map(() => ' '));
  const [completed, setCompleted] = useState(false);

  const decrypt = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        headline.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return headline[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
      );
      iteration += 0.5;
      if (iteration >= headline.length) {
        clearInterval(interval);
        setDisplayText(headline.split(''));
        setCompleted(true);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(decrypt, 500);
    return () => clearTimeout(timer);
  }, [decrypt]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Subtle grid — no floating gradient blobs */}
      <div className="absolute inset-0 bg-grid animate-grid-fade" />

      {/* Single subtle glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* RTF Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 w-28 h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-glow-cyan"
        >
          <img src={rtfLogo} alt="RTF Logo" className="w-full h-full object-cover" />
        </motion.div>

        {/* College tag */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-label text-text-muted mb-4"
        >
          GCoEA AMRAVATI • EST. 2017
        </motion.p>

        {/* Decrypting headline */}
        <h1 className="text-display text-text-primary mb-4 select-none" aria-label={headline}>
          {displayText.map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-colors duration-200 ${
                completed ? 'text-text-primary' : 'text-cyan-400/60'
              }`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Tagline — raw, no corporate fluff */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-3 font-body"
        >
          We learn. We create. We teach.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-sm text-text-muted max-w-xl mx-auto mb-10 font-mono"
        >
          120+ student engineers • 50+ projects • Competing at IITs, ISRO & beyond
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <NeoButton to="/projects" arrow>
            SEE OUR WORK
          </NeoButton>
          <NeoButton to="/about" variant="secondary">
            WHO WE ARE
          </NeoButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border-2 border-text-muted/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-cyan-400 rounded-full mt-1.5"
          />
        </div>
      </motion.div>
    </section>
  );
}
