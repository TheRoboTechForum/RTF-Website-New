import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — thin cyan line at the very top of the viewport
 * Grows from 0% to 100% width as the user scrolls the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}
