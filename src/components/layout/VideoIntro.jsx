import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import introVideo from '../../assets/Videos/intro-video.mp4';

/**
 * VideoIntro — Fullscreen video splash on first visit.
 * Plays the intro video, then fades out to reveal the website.
 * User can skip with a button or press Escape.
 */
export default function VideoIntro({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const videoRef = useRef(null);

  const handleDone = () => {
    setVisible(false);
    setTimeout(() => onComplete?.(), 600); // wait for exit animation
  };

  useEffect(() => {
    // show skip button after 1.5s
    const skipTimer = setTimeout(() => setCanSkip(true), 1500);

    // escape key to skip
    const handleKey = (e) => {
      if (e.key === 'Escape') handleDone();
    };
    window.addEventListener('keydown', handleKey);

    // lock scroll during video
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(skipTimer);
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={introVideo}
            autoPlay
            muted
            playsInline
            onEnded={handleDone}
            className="w-full h-full object-cover"
          />

          {/* Skip button */}
          <AnimatePresence>
            {canSkip && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleDone}
                className="absolute bottom-8 right-8 px-5 py-2.5 text-xs font-mono font-semibold tracking-widest text-white/70 border border-white/20 rounded-button backdrop-blur-sm bg-white/5 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-200"
              >
                SKIP INTRO →
              </motion.button>
            )}
          </AnimatePresence>

          {/* Subtle bottom gradient so skip button is readable */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
