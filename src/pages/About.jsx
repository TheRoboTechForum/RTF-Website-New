import { motion } from 'framer-motion';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionHeader from '../components/ui/SectionHeader';
import HoloCard from '../components/ui/HoloCard';
import NeoButton from '../components/ui/NeoButton';
import StatCounter from '../components/ui/StatCounter';
import { Cpu, Wrench, GraduationCap, Target, Trophy, Rocket } from 'lucide-react';
import { stats, competitions } from '../data/stats';

const values = [
  {
    icon: GraduationCap,
    title: 'We Learn',
    description:
      'Every member starts from scratch — Arduino workshops, SolidWorks training, ROS bootcamps. No prior experience required, just curiosity.',
  },
  {
    icon: Wrench,
    title: 'We Create',
    description:
      'From Robocon competition bots to ISRO rovers and VTOL aircraft — we design, fabricate, and program real engineering systems.',
  },
  {
    icon: Cpu,
    title: 'We Teach',
    description:
      'Seniors mentor juniors. Knowledge transfers through workshops, documentation, and hands-on lab sessions — creating a self-sustaining cycle of innovation.',
  },
];

const domains = [
  { icon: Target, name: 'Mechanical Design & CAD', description: 'SolidWorks, CNC machining, 3D printing, sheet metal fabrication' },
  { icon: Cpu, name: 'Electronics & Embedded', description: 'Arduino, STM32, PCB design, motor drivers, sensor integration' },
  { icon: Rocket, name: 'Aero & Drone Systems', description: 'Quadcopters, VTOL, RC planes, Pixhawk, ArduPilot, FPV' },
  { icon: Trophy, name: 'Software & AI', description: 'ROS/ROS2, Python, OpenCV, path planning, SLAM, inverse kinematics' },
];

export default function About() {
  const [valuesRef, valuesInView] = useScrollAnimation();
  const [domainsRef, domainsInView] = useScrollAnimation();
  const [compRef, compInView] = useScrollAnimation();

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24 px-6"
    >
      {/* Hero */}
      <SectionHeader
        label="// ABOUT US"
        title="The Robo-Tech Forum"
        subtitle="The premier robotics club at Government College of Engineering, Amravati — where theory meets practice and real engineering happens."
      />

      {/* Mission statement */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-body text-text-secondary leading-relaxed">
          Founded in 2017, The Robo-Tech Forum (RTF) is a student-driven technical club dedicated
          to fostering innovation through hands-on robotics, embedded systems, and aero engineering.
          We've built 50+ projects, competed at national-level events across India — from DD Robocon
          at IIT Delhi to ISRO's IRoC-U challenge — and trained hundreds of engineers who now work
          at top companies and research labs.
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        <StatCounter end={stats.members} label="Active Members" suffix="+" />
        <StatCounter end={stats.projects} label="Projects Built" suffix="+" />
        <StatCounter end={stats.competitions} label="Competitions" suffix="+" />
        <StatCounter end={new Date().getFullYear() - stats.founded} label="Years Strong" suffix="+" />
      </div>

      {/* Values — We Learn, We Create, We Teach */}
      <SectionHeader
        label="// OUR PHILOSOPHY"
        title="We Learn. We Create. We Teach."
      />

      <motion.div
        ref={valuesRef}
        variants={staggerContainer}
        initial="hidden"
        animate={valuesInView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
      >
        {values.map((v) => (
          <motion.div key={v.title} variants={fadeUp}>
            <HoloCard glow="cyan" className="p-8 h-full">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                <v.icon size={22} className="text-cyan-400" />
              </div>
              <h3 className="font-display font-semibold text-text-primary text-lg mb-3">
                {v.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
            </HoloCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Technical Domains */}
      <SectionHeader
        label="// EXPERTISE"
        title="Technical Domains"
        subtitle="Our members work across four core engineering domains."
      />

      <motion.div
        ref={domainsRef}
        variants={staggerContainer}
        initial="hidden"
        animate={domainsInView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-24"
      >
        {domains.map((d) => (
          <motion.div key={d.name} variants={fadeUp}>
            <HoloCard glow="purple" className="p-6 h-full flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <d.icon size={18} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-text-primary text-base mb-1">
                  {d.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{d.description}</p>
              </div>
            </HoloCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Competitions we participate in */}
      <SectionHeader
        label="// WHERE WE COMPETE"
        title="National Competitions"
        subtitle="RTF teams regularly represent GCoEA at India's most prestigious technical events."
      />

      <motion.div
        ref={compRef}
        variants={staggerContainer}
        initial="hidden"
        animate={compInView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
      >
        {competitions.map((c) => (
          <motion.div key={c.id} variants={fadeUp}>
            <HoloCard glow="amber" className="p-6 h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-badge">
                  {c.year}
                </span>
              </div>
              <h3 className="font-display font-semibold text-text-primary text-base mb-1">
                {c.name}
              </h3>
              <p className="text-xs font-mono text-cyan-400 mb-2">{c.organizer}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{c.description}</p>
            </HoloCard>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-h2 text-text-primary mb-4">Want to Join the Team?</h2>
        <p className="text-body text-text-secondary max-w-lg mx-auto mb-8">
          We recruit new members every academic year. No prior experience required — just a willingness to learn and build.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NeoButton to="/contact" arrow>
            GET IN TOUCH
          </NeoButton>
          <NeoButton to="/projects" variant="secondary" arrow>
            SEE OUR WORK
          </NeoButton>
        </div>
      </div>
    </motion.main>
  );
}
