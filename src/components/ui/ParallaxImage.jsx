import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxImage — Refined parallax section with intentional design.
 * Subtle, layered motion with proper spacing and mobile responsiveness.
 */
export default function ParallaxImage({
  src,
  images = [],
  alt,
  overlay,
  height = 120,
  slideInterval = 4000,
  children,
}) {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for responsive behavior
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageList = (images.length > 0 ? images : [src]).filter(Boolean);

  // Image carousel
  useEffect(() => {
    if (imageList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageList.length);
    }, slideInterval);
    return () => clearInterval(timer);
  }, [imageList.length, slideInterval]);

  // Layered parallax: primary image moves slower, depth layers add complexity
  const primaryY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const depthY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  // Opacity envelope: subtle fade in/out
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.3, 0.65, 0.65, 0.3]
  );

  // Overlay opacity (darker in middle, lighter at edges)
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 0.55, 0.55, 0.5]
  );

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-gradient-to-b from-deep via-deep/95 to-deep"
      style={{ minHeight: `${height}vh` }}
    >
      {/* BACKGROUND IMAGE LAYER — Primary parallax */}
      <motion.div
        style={{
          y: isMobile ? 0 : primaryY,
          opacity: bgOpacity,
        }}
        className="absolute inset-0"
      >
        {imageList.map((image, index) => (
          <img
            key={`primary-${image}-${index}`}
            src={image}
            alt={alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        ))}
      </motion.div>

      {/* DEPTH LAYER — Subtle secondary motion for depth */}
      {imageList.length > 0 && (
        <motion.div
          style={{
            y: isMobile ? 0 : depthY,
          }}
          className="absolute inset-0 opacity-20"
        >
          <img
            src={imageList[0]}
            alt=""
            className="w-full h-full object-cover blur-xl scale-110"
            aria-hidden="true"
          />
        </motion.div>
      )}

      {/* DARK OVERLAY — Gradient for readability */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-deep/40 via-deep/60 to-deep/50 pointer-events-none"
      />

      {/* CONTENT — Text and children */}
      <motion.div
        ref={contentRef}
        style={{
          y: isMobile ? 0 : textY,
        }}
        className="relative z-20 h-full flex flex-col items-center justify-center px-6 will-change-transform"
      >
        {overlay && !children && (
          <p className="font-mono text-sm text-cyan-400/80 tracking-widest uppercase text-center max-w-xl">
            {overlay}
          </p>
        )}
        {children}
      </motion.div>

      {/* FADE EDGES — Soft transitions to surrounding sections */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-gradient-to-b from-deep to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-deep to-transparent z-10 pointer-events-none" />
    </section>
  );
}
