import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ScrollProgress — thin cyan line at the very top.
 *
 * Uses GSAP ScrollTrigger (which Lenis already keeps in sync) instead of
 * Framer Motion's useScroll. Framer useScroll reads window.scrollY directly,
 * which fights with Lenis's virtual scroll position and causes jank.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, { scaleX: self.progress });
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 origin-left z-[60]"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
