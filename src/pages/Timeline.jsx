import { motion } from 'framer-motion';
import { pageTransition, fadeUp, fadeLeft, fadeRight } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionHeader from '../components/ui/SectionHeader';
import { milestones } from '../data/timeline';
import { Trophy, Rocket, Flag, Award } from 'lucide-react';

const categoryIcons = {
  MILESTONE: Flag,
  PROJECT: Rocket,
  COMPETITION: Trophy,
  ACHIEVEMENT: Award,
};

const categoryColors = {
  MILESTONE: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  PROJECT: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  COMPETITION: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  ACHIEVEMENT: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
};

function MilestoneCard({ milestone, index }) {
  const [ref, isInView] = useScrollAnimation(0.2);
  const isLeft = index % 2 === 0;
  const Icon = categoryIcons[milestone.category] || Flag;
  const colorClass = categoryColors[milestone.category] || categoryColors.MILESTONE;

  return (
    <div className="relative flex items-center justify-center">
      {/* Center dot on timeline */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-deep z-10 hidden md:block" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={isLeft ? fadeLeft : fadeRight}
        className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
      >
        <div className="relative bg-surface/60 backdrop-blur-xl border border-border/50 rounded-card shadow-card p-6 hover:border-cyan-500/30 hover:shadow-glow-cyan transition-all duration-300">
          {/* Year badge */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-badge">
              {milestone.year}
            </span>
            <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase border rounded-badge ${colorClass}`}>
              {milestone.category}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-elevated border border-border flex items-center justify-center shrink-0 mt-0.5">
              <Icon size={16} className="text-cyan-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-text-primary text-base mb-2">
                {milestone.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24 px-6"
    >
      <SectionHeader
        label="// OUR JOURNEY"
        title="Timeline"
        subtitle="From a small group of passionate students to a nationally recognized robotics club — trace every milestone since 2017."
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Center vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent hidden md:block" />

        <div className="space-y-8 md:space-y-12">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
          ))}
        </div>

        {/* End dot */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-4 w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-500/40 items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </motion.main>
  );
}
