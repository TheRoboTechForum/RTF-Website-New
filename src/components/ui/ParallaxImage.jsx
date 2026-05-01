import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MotionDiv = motion.div;

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageList = useMemo(
    () => (images.length > 0 ? images : [src]).filter(Boolean),
    [images, src]
  );

  // Preload and decode slides before the carousel is allowed to show them.
  useEffect(() => {
    let cancelled = false;

    imageList.forEach((image) => {
      const loader = new Image();

      const markReady = () => {
        if (cancelled) return;
        setLoadedImages((current) => ({ ...current, [image]: true }));
      };

      loader.onload = () => {
        if (loader.decode) {
          loader.decode().then(markReady).catch(markReady);
          return;
        }
        markReady();
      };
      loader.onerror = markReady;
      loader.src = image;
    });

    return () => {
      cancelled = true;
    };
  }, [imageList]);

  const firstLoadedIndex = imageList.findIndex((image) => loadedImages[image]);
  const safeActiveIndex = loadedImages[imageList[activeIndex]]
    ? activeIndex
    : Math.max(firstLoadedIndex, 0);
  const hasVisibleImage = firstLoadedIndex !== -1;

  // Image carousel
  useEffect(() => {
    if (imageList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        for (let step = 1; step <= imageList.length; step += 1) {
          const next = (prev + step) % imageList.length;
          if (loadedImages[imageList[next]]) return next;
        }
        return prev;
      });
    }, slideInterval);
    return () => clearInterval(timer);
  }, [imageList, loadedImages, slideInterval]);

  // Parallax effect: Keep translation smaller than top/bottom overflow to prevent gaps
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  // Opacity envelope: subtle fade in/out
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden w-full flex items-center justify-center"
      style={{ height: `${height}vh` }}
    >
      {/* Parallax image */}
      <MotionDiv
        style={{ y }}
        className="absolute inset-0 -top-[25%] -bottom-[25%]"
      >
        {imageList.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt={alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out will-change-transform"
            style={{ opacity: hasVisibleImage && index === safeActiveIndex ? 1 : 0 }}
          />
        ))}
      </MotionDiv>

      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12),transparent_45%),linear-gradient(135deg,#080D14,#0D1520)] transition-opacity duration-500 ${
          hasVisibleImage ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {!hasVisibleImage && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <div className="h-1 w-36 overflow-hidden rounded-full bg-border/60">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-cyan-400" />
          </div>
        </div>
      )}

      {/* Dark overlay for readability */}
      <MotionDiv
        style={{ opacity }}
        className="absolute inset-0 bg-deep/60"
      />

      {/* Grid texture on top */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-6 w-full h-full">
        {overlay && !children && (
          <p className="font-mono text-sm text-cyan-400/80 tracking-widest uppercase text-center max-w-xl self-center">
            {overlay}
          </p>
        )}
        {children}
      </div>

      {/* FADE EDGES — Soft transitions to surrounding sections */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-deep to-transparent z-[5]" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-deep to-transparent z-[5]" />
    </section>
  );
}
