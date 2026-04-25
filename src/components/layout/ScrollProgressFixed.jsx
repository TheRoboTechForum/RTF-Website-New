import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ScrollProgressFixed — Improved scroll progress tracker
 * 
 * Fixes:
 * - No scroll jump on first interaction
 * - Accurate progress tracking
 * - Smooth transitions
 * - Better sync with Lenis smooth scroll
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    // Minimal initial state
    gsap.set(barRef.current, { scaleX: 0 });

    const handleScroll = () => {
      if (!barRef.current) return;

      // Calculate scroll progress safely
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight === 0) {
        gsap.set(barRef.current, { scaleX: 0 });
        return;
      }

      const progress = Math.max(0, Math.min(1, scrollTop / docHeight));

      // Use GSAP for smooth animation instead of direct DOM manipulation
      gsap.to(barRef.current, {
        scaleX: progress,
        duration: 0.1,
        overwrite: 'auto',
      });
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial refresh
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-300 z-[60] origin-left"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
