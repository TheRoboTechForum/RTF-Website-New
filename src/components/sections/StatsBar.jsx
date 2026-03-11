import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import StatCounter from '../ui/StatCounter';
import { stats } from '../../data/stats';

/**
 * StatsBar — 4 metrics with animated counters, cyan separators
 */
export default function StatsBar() {
  const [ref, isInView] = useScrollAnimation();

  return (
    <section className="relative py-20 bg-surface/50">
      {/* Top/bottom border lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
      >
        <motion.div variants={fadeUp} className="md:border-r md:border-border/50">
          <StatCounter end={stats.members} label="Active Members" suffix="+" />
        </motion.div>
        <motion.div variants={fadeUp} className="md:border-r md:border-border/50">
          <StatCounter end={stats.projects} label="Projects Built" suffix="+" />
        </motion.div>
        <motion.div variants={fadeUp} className="md:border-r md:border-border/50">
          <StatCounter end={stats.competitions} label="Competitions" suffix="+" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <StatCounter end={new Date().getFullYear() - stats.founded} label="Years Strong" suffix="+" />
        </motion.div>
      </motion.div>
    </section>
  );
}
