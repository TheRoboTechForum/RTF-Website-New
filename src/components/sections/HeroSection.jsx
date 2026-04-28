import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeoButton from '../ui/NeoButton';
import ParticleCanvas from '../ui/ParticleCanvas';
import rtfLogo from '../../assets/images/rtf-logo-img.jpg';

// Only register once — useLenis already does this, but it's idempotent
gsap.registerPlugin(ScrollTrigger);

// Cycling verbs — scroll drives the transition between them
const VERBS = ['LEARN', 'CREATE', 'INNOVATE'];

/**
 * HeroSection — Reference-quality sticky / pinned hero.
 *
 * Structure:
 *   <div.hero-scroll-wrapper>          ← 280vh tall, creates the scroll space
 *     <div.hero-sticky>                ← position:sticky top:0 h:100vh — PINNED
 *       <ParticleCanvas />             ← always visible behind everything
 *       <div.hero-content>             ← text / cta — animates on scroll
 *     </div>
 *   </div>
 *
 * After this component, Home.jsx wraps the remaining sections in a
 * `.overlay-panel` (z-index:10, rounded-top, dark bg) so they slide
 * UP and OVER the pinned hero — identical to the IITD reference.
 */
export default function HeroSection() {
  const wrapperRef = useRef(null); // the tall scroll-space div
  const stickyRef  = useRef(null); // the pinned viewport-height div
  const verbRef    = useRef(null); // "LEARN / CREATE / INNOVATE" span
  const headRef    = useRef(null); // full headline block
  const subRef     = useRef(null); // tagline + meta
  const ctaRef     = useRef(null); // buttons
  const logoRef    = useRef(null); // logo on right
  const glowRef    = useRef(null); // central glow orb
  const gridRef    = useRef(null); // background grid
  const scrollRef  = useRef(null); // scroll indicator

  /* ─── GSAP Animations ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1. Entry animations — run on mount, NOT scroll */
      const entryTl = gsap.timeline({ delay: 0.2 });

      entryTl
        .from(logoRef.current, {
          scale: 0.5, opacity: 0, duration: 0.8,
          ease: 'expo.out',
        })
        .from(headRef.current.children, {
          y: 80, opacity: 0, stagger: 0.12, duration: 0.9,
          ease: 'expo.out',
        }, '-=0.4')
        .from(subRef.current.children, {
          y: 30, opacity: 0, stagger: 0.1, duration: 0.7,
          ease: 'expo.out',
        }, '-=0.5')
        .from(ctaRef.current.children, {
          y: 20, opacity: 0, stagger: 0.15, duration: 0.6,
          ease: 'expo.out',
        }, '-=0.4')
        .from(scrollRef.current, {
          opacity: 0, duration: 0.5,
        }, '-=0.2');

      /* 2. Scroll-driven: cycle through verbs as user scrolls
         With 150vh wrapper, 'end: 55% top' = ~82vh of scroll travel.
         This feels natural — one smooth downward movement cycles all 3 words. */
      const verbTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '55% top',
          scrub: 0.5,
        },
      });

      // Fade old verb out, snap to next, fade in — repeated for each word
      VERBS.forEach((verb, i) => {
        const progress = i / VERBS.length;
        verbTl.to(verbRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.08,
          ease: 'power2.in',
          onComplete: () => {
            if (verbRef.current) verbRef.current.textContent = verb;
          },
        }, progress)
        .to(verbRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        }, progress + 0.04);
      });

      /* 3. Scroll-driven: subtle parallax scale on the glow orb */
      gsap.to(glowRef.current, {
        scale: 1.8,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      /* 4. Exit: content fades out in the LAST 25% of scroll runway.
         With 150vh wrapper that's 112.5vh–150vh of scroll. */
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: '70% top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      exitTl
        .to([headRef.current, subRef.current, ctaRef.current], {
          y: -60, opacity: 0, stagger: 0.05, ease: 'power2.in',
        })
        .to(logoRef.current, {
          scale: 0.8, opacity: 0, ease: 'power2.in',
        }, '<');

      /* 5. Grid brightness flicker on load */
      gsap.from(gridRef.current, {
        opacity: 0, duration: 1.5, ease: 'power2.out',
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    /**
     * hero-scroll-wrapper: 150vh tall — creates the scroll "runway".
     * 150vh = hero is pinned for 1.5 screen-heights of scroll.
     * This is enough to feel cinematic without making users scroll forever.
     */
    <div ref={wrapperRef} className="relative" style={{ height: '150vh' }}>

      {/* ── PINNED LAYER ── stays stuck at top:0 while page scrolls ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-void"
        style={{ zIndex: 1 }}
      >

        {/* Background grid */}
        <div ref={gridRef} className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

        {/* Radial glow — parallax scaled by scroll */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 50%, transparent 75%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Interactive particle network */}
        <ParticleCanvas />

        {/* ── HERO CONTENT ── */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

            {/* Left: text (3 cols) */}
            <div className="lg:col-span-3 flex flex-col items-start">
              {/* Badge */}
              <div ref={headRef}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30
                                bg-cyan-500/5 backdrop-blur-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs tracking-[0.2em] text-cyan-400 font-mono uppercase">
                    GCoEA Amravati · Est. 2017
                  </span>
                </div>

                {/* Verb cycling line */}
                <p className="text-2xl md:text-3xl font-display font-bold tracking-widest text-cyan-400 uppercase mb-2 select-none leading-none">
                  WE{' '}
                  <span
                    ref={verbRef}
                    className="inline-block min-w-[240px] text-white"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {VERBS[0]}
                  </span>
                </p>

                {/* Main headline */}
                <h1 className="text-[clamp(3rem,8vw,8rem)] font-display font-black leading-[0.9]
                               tracking-tight text-text-primary uppercase mb-6"
                    style={{ letterSpacing: '-0.02em' }}>
                  ROBO
                  <span className="block text-transparent"
                        style={{
                          WebkitTextStroke: '2px rgba(241,245,249,0.3)',
                        }}>
                    TECH
                  </span>
                  <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400
                                   bg-clip-text text-transparent">
                    FORUM
                  </span>
                </h1>
              </div>

              {/* Tagline + meta */}
              <div ref={subRef} className="flex flex-col gap-3 mb-8">
                <p className="text-lg md:text-xl text-text-secondary font-body max-w-lg leading-relaxed">
                  A student-run engineering collective building real-world robotics,
                  competing at national stages, and pushing limits.
                </p>
                <p className="text-sm font-mono text-text-muted">
                  <span className="text-cyan-400">120+</span> engineers ·{' '}
                  <span className="text-cyan-400">50+</span> projects ·{' '}
                  <span className="text-cyan-400">IITs, ISRO</span> &amp; beyond
                </p>
              </div>

              {/* CTAs */}
              <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4">
                <NeoButton to="/projects" arrow>SEE OUR WORK</NeoButton>
                <NeoButton to="/about" variant="secondary">WHO WE ARE</NeoButton>
              </div>
            </div>

            {/* Right: logo (2 cols) — simple, no decorative rings */}
            <div
              ref={logoRef}
              className="lg:col-span-2 hidden lg:flex items-center justify-center"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="w-[180px] h-[180px] rounded-xl overflow-hidden border border-cyan-500/40"
                   style={{ boxShadow: '0 0 30px rgba(6,182,212,0.3)' }}>
                <img
                  src={rtfLogo}
                  alt="RTF Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400/60 to-transparent" />
        </div>

      </div>
      {/* ── END PINNED LAYER ── */}

    </div>
  );
}
