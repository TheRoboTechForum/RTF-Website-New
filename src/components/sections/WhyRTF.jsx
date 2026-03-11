import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionHeader from '../ui/SectionHeader';
import HoloCard from '../ui/HoloCard';
import { Eye, Users, Lightbulb } from 'lucide-react';

const pillars = [
  {
    icon: Eye,
    title: 'Visibility & Impact',
    description:
      'Your brand reaches 2,000+ engineering students, faculty, and industry professionals through our competitions, exhibitions, and digital presence across India.',
    glow: 'cyan',
  },
  {
    icon: Users,
    title: 'Talent Pipeline',
    description:
      'Get direct access to pre-vetted engineering talent trained in robotics, embedded systems, CAD, and AI/ML — ready for internships and placements at your company.',
    glow: 'amber',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Association',
    description:
      'Align your brand with cutting-edge student innovation — from ISRO rover challenges to national-level Robocon competitions. Your logo on robots that compete at IITs.',
    glow: 'purple',
  },
];

/**
 * WhyRTF — 3-column pitch section for sponsors (Impact / Talent / Innovation)
 */
export default function WhyRTF() {
  const [ref, isInView] = useScrollAnimation();

  return (
    <section className="py-24 px-6 bg-surface/30">
      <SectionHeader
        label="// 02 — WHY PARTNER WITH US"
        title="Why Sponsor RTF?"
        subtitle="We don't just build robots — we build engineers. Here's why India's top companies partner with student-led innovation."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {pillars.map((pillar) => (
          <motion.div key={pillar.title} variants={fadeUp}>
            <HoloCard glow={pillar.glow} className="p-8 h-full">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                <pillar.icon size={22} className="text-cyan-400" />
              </div>
              <h3 className="text-h3 text-text-primary mb-3">{pillar.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </HoloCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
