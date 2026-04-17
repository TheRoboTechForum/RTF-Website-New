import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxImage — Full-width sticky image section that scrolls behind content.
 * Creates a "scroll over image" effect between sections.
 *
 * @param {string} src — Image URL
 * @param {string} alt — Alt text
 * @param {string} [overlay] — Optional text overlay
 * @param {number} [height] — Section height in vh (default 60)
 */
export default function ParallaxImage({
  src,
  images = [],
  alt,
  overlay,
  height = 60,
  slideInterval = 3500,
  children,
}) {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageList = (images.length > 0 ? images : [src]).filter(Boolean);

  useEffect(() => {
    if (imageList.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageList.length);
    }, slideInterval);

    return () => clearInterval(timer);
  }, [imageList.length, slideInterval]);

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: `${height}vh` }}
    >
      {/* Parallax image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
      >
        {imageList.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt={alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out will-change-transform"
            style={{ opacity: index === activeIndex ? 1 : 0 }}
          />
        ))}
      </motion.div>

      {/* Dark overlay for readability */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-deep/60"
      />

      {/* Grid texture on top */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        {overlay && !children && (
          <p className="font-mono text-sm text-cyan-400/80 tracking-widest uppercase text-center max-w-xl">
            {overlay}
          </p>
        )}
        {children}
      </div>

      {/* Top & bottom fade into dark bg */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-deep to-transparent z-[5]" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-deep to-transparent z-[5]" />
    </section>
  );
}
