import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Sparkles } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/animations';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { sponsors } from '../../data/stats';
import mathworksLogo from '../../assets/sponsors/mathworks-logo.png';
import NeoButton from '../ui/NeoButton';

const MotionDiv = motion.div;

const sponsorLogos = {
  MathWorks: mathworksLogo,
};

const liveSponsors = sponsors.map((sponsor) => ({
  ...sponsor,
  logo: sponsorLogos[sponsor.name],
}));

const marqueeItems = [
  ...liveSponsors,
  { id: 'brand-1', name: 'Your Brand', tier: 'Future Partner' },
  ...liveSponsors,
  { id: 'brand-2', name: 'Your Brand', tier: 'Visibility Slot' },
];

export default function SponsorShowcase() {
  const [ref, isInView] = useScrollAnimation();

  return (
    <section className="relative overflow-hidden border-y border-border/30 bg-deep px-4 py-20 sm:px-8 lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-80 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute left-1/2 top-20 h-64 w-[min(88vw,760px)] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <MotionDiv
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-7xl"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 min-w-0">
          <MotionDiv variants={fadeUp} className="min-w-0">
            <span className="text-label text-cyan-400 mb-4 block whitespace-nowrap">
              // PARTNER VISIBILITY
            </span>
            <h2 className="text-h2 text-text-primary mb-5 font-display font-bold leading-tight">
              Your brand should move with the machines we build.
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
              RTF sponsors get visible placement across our website, workshops, competition
              content, and student-built robotics work. The goal is simple: make support feel
              present, credible, and connected to real engineering.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              {['Website presence', 'Event visibility', 'Student reach'].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-button border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-xs font-mono uppercase tracking-wider text-cyan-300 whitespace-nowrap"
                >
                  <BadgeCheck size={14} />
                  {item}
                </span>
              ))}
            </div>

            <NeoButton to="/sponsors" arrow glow="cyan">
              EXPLORE PARTNERSHIPS
            </NeoButton>
          </MotionDiv>

          <MotionDiv variants={fadeUp} className="relative min-w-0">
            <div className="absolute -inset-6 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="relative overflow-hidden rounded-card border border-cyan-500/20 bg-surface/70 py-8 shadow-card backdrop-blur-xl">
              <div className="mb-7 flex items-center justify-between gap-4 px-5 sm:px-7">
                <div>
                  <p className="text-label text-cyan-300">Sponsor Wall</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-text-primary">
                    Brand visibility in motion
                  </h3>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface via-surface/80 to-transparent" />

              <div className="overflow-hidden py-4">
                <MotionDiv
                  className="flex w-max gap-4"
                  animate={{ x: ['-50%', '0%'] }}
                  transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 22,
                  }}
                >
                  {[...marqueeItems, ...marqueeItems].map((item, index) => (
                    <a
                      key={`${item.id}-${index}`}
                      href={item.website || '/sponsors'}
                      target={item.website ? '_blank' : undefined}
                      rel={item.website ? 'noopener noreferrer' : undefined}
                      className="group flex h-36 w-64 shrink-0 flex-col justify-between rounded-card border border-border/70 bg-deep/50 p-4 transition-all hover:border-cyan-500/40 hover:bg-deep/75"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-badge border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-cyan-300">
                          {item.tier}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300"
                        />
                      </div>

                      <div className="flex min-h-[70px] items-center justify-center rounded-button bg-white px-5 py-4 shadow-[0_0_24px_rgba(255,255,255,0.06)]">
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt={`${item.name} logo`}
                            className="max-h-14 w-full object-contain"
                          />
                        ) : (
                          <span className="font-display text-2xl font-bold text-deep">
                            {item.name}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </MotionDiv>
              </div>

              <p className="mt-6 px-5 text-center text-xs font-mono uppercase tracking-widest text-text-muted sm:px-7">
                Current sponsors and future brand placements
              </p>
            </div>
          </MotionDiv>
        </div>
      </MotionDiv>
    </section>
  );
}
