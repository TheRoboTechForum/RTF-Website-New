import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/animations';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import NeoButton from '../ui/NeoButton';

/**
 * SponsorCTA — Full-width amber/gold CTA section: "Partner With RTF Forum"
 */
export default function SponsorCTA() {
  const [ref, isInView] = useScrollAnimation();

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Amber gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-deep to-amber-500/5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-60 h-60 bg-amber-500/8 rounded-full blur-[80px]" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeUp}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <span className="text-label text-amber-400 mb-4 block">
          {'// SPONSORSHIP'}
        </span>
        <h2 className="text-h1 text-text-primary mb-4">
          Partner With Robo-Tech Forum
        </h2>
        <p className="text-body text-text-secondary max-w-xl mx-auto mb-10">
          Your investment fuels real engineering innovation. Sponsor a team that competes at IIT
          Delhi, builds rovers for ISRO, and trains 120+ future engineers every year.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NeoButton
            to="/sponsors"
            arrow
            className="bg-amber-500 text-deep hover:bg-amber-400 shadow-glow-amber hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"
          >
            VIEW SPONSORSHIP TIERS
          </NeoButton>
          <NeoButton to="/contact" variant="secondary">
            CONTACT US
          </NeoButton>
        </div>
      </motion.div>
    </section>
  );
}
