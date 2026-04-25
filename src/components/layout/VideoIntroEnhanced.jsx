import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import introVideo from '../../assets/Videos/intro-video.mp4';
import { useLoading } from '../../context/LoadingContext';

/**
 * VideoIntro — Enhanced fullscreen video splash with session control
 * 
 * Features:
 * - Only plays once per session (or after 30 min cooldown)
 * - Shows "SKIP INTRO" button after 1.5s or when assets are ready
 * - Auto-completes after 6s as fallback
 * - Manages loading state transitions
 */
export default function VideoIntro({ onComplete, shouldShow = true, assetsReady = false }) {
  const [visible, setVisible] = useState(shouldShow);
  const [canSkip, setCanSkip] = useState(false);
  const videoRef = useRef(null);
  const { showLoader, hideLoader } = useLoading();

  const handleDone = useCallback(() => {
    setVisible(false);
    // Small delay before triggering completion
    setTimeout(() => {
      hideLoader();
      onComplete?.();
    }, 400);
  }, [onComplete, hideLoader]);

  const handleSkip = useCallback(() => {
    // Show loader when user skips
    showLoader('Setting things up for a smooth experience...');
    // Then complete after brief delay
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        hideLoader();
        onComplete?.();
      }, 400);
    }, 600);
  }, [showLoader, hideLoader, onComplete]);

  useEffect(() => {
    if (!shouldShow) {
      onComplete?.();
      return;
    }

    // Show skip button after 1.5s or when assets are ready (whichever comes first)
    const skipTimer = setTimeout(() => setCanSkip(true), 1500);

    // Auto-complete after 6 seconds as fallback if video doesn't play
    const autoCompleteTimer = setTimeout(() => {
      handleDone();
    }, 6000);

    // Escape key to skip
    const handleKey = (e) => {
      if (e.key === 'Escape' && canSkip) {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKey);

    // Lock scroll during intro
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoCompleteTimer);
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [shouldShow, canSkip, handleDone, handleSkip, onComplete]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Video Background */}
          <video
            ref={videoRef}
            src={introVideo}
            autoPlay
            muted
            playsInline
            onEnded={handleDone}
            className="w-full h-full object-cover"
            onError={() => {
              // Fallback if video fails to load
              console.warn('Intro video failed to load, skipping...');
              handleDone();
            }}
          />

          {/* Skip Button - appears after 1.5s */}
          <AnimatePresence>
            {canSkip && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleSkip}
                className="absolute bottom-8 right-8 px-5 py-2.5 text-xs font-mono font-semibold tracking-widest text-white/70 border border-white/20 rounded-lg backdrop-blur-sm bg-white/5 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                SKIP INTRO →
              </motion.button>
            )}
          </AnimatePresence>

          {/* Hint text - appears after 3s */}
          <AnimatePresence>
            {canSkip && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute top-8 left-8 text-xs font-mono text-white/40"
              >
                Press ESC to skip
              </motion.p>
            )}
          </AnimatePresence>

          {/* Bottom gradient for readability */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
