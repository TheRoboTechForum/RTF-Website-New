import { motion } from 'framer-motion';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import NeoButton from '../components/ui/NeoButton';
import StatCounter from '../components/ui/StatCounter';
import { stats, competitions } from '../data/stats';

const values = [
  {
    title: 'We Learn',
    description:
      'Every member starts from scratch — Arduino workshops, SolidWorks training, ROS bootcamps. No prior experience required, just curiosity.',
  },
  {
    title: 'We Create',
    description:
      'From Robocon competition bots to ISRO rovers and VTOL aircraft — we design, fabricate, and program real engineering systems.',
  },
  {
    title: 'We Teach',
    description:
      'Seniors mentor juniors. Knowledge transfers through workshops, documentation, and hands-on lab sessions — creating a self-sustaining cycle of innovation.',
  },
];

const domains = [
  {
    tag: '01',
    name: 'Mechanical Design & CAD',
    tools: ['SolidWorks', 'CNC Machining', '3D Printing', 'Sheet Metal'],
  },
  {
    tag: '02',
    name: 'Electronics & Embedded',
    tools: ['Arduino', 'STM32', 'PCB Design', 'Motor Drivers'],
  },
  {
    tag: '03',
    name: 'Aero & Drone Systems',
    tools: ['Quadcopters', 'VTOL', 'Pixhawk', 'ArduPilot'],
  },
  {
    tag: '04',
    name: 'Software & AI',
    tools: ['ROS / ROS2', 'OpenCV', 'SLAM', 'Path Planning'],
  },
];

export default function About() {
  const [heroRef, heroInView] = useScrollAnimation(0.2);
  const [missionRef, missionInView] = useScrollAnimation(0.2);
  const [statsRef, statsInView] = useScrollAnimation(0.2);
  const [valuesRef, valuesInView] = useScrollAnimation();
  const [domainsRef, domainsInView] = useScrollAnimation();
  const [compRef, compInView] = useScrollAnimation();
  const [ctaRef, ctaInView] = useScrollAnimation(0.2);

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24"
    >

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="mb-28 md:mb-36">
        <div ref={heroRef} className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}>
            <p className="text-sm font-mono tracking-[0.25em] text-cyan-400/70 uppercase mb-6">
              Est. {stats.founded} · GCoEA, Amravati
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-text-heading tracking-tight leading-[1] mb-8">
              The Robo-Tech{' '}
              <span className="text-gradient-red">Forum</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-primary/80 font-light leading-relaxed max-w-2xl mx-auto">
              A student-driven technical community built on hands-on robotics, embedded systems, and aero engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section className="mb-28 md:mb-36">
        <motion.div
          ref={statsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto px-6 md:px-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { end: stats.projects, label: 'Projects Built', suffix: '+' },
              { end: stats.competitions, label: 'Competitions', suffix: '+' },
              { end: stats.members, label: 'Active Members', suffix: '+' },
              { end: new Date().getFullYear() - stats.founded, label: 'Years Strong', suffix: '+' },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="text-center">
                <StatCounter end={s.end} label={s.label} suffix={s.suffix} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-28 md:mb-36">
        <div className="h-px bg-border/40" />
      </div>

      {/* ── MISSION ──────────────────────────────────── */}
      <section className="mb-28 md:mb-36">
        <div ref={missionRef} className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={missionInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeUp} className="mb-14 max-w-3xl">
              <p className="text-sm font-mono tracking-[0.2em] text-cyan-400/70 uppercase mb-4">Mission</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-heading tracking-tight leading-[1.15]">
                Empower students to build{' '}
                <span className="text-gradient-red">real-world</span>{' '}
                engineering systems.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <motion.div variants={fadeUp} className="space-y-6">
                <p className="text-lg text-text-primary/75 font-light leading-relaxed">
                  <strong className="text-text-heading font-medium">For the individual,</strong>{' '}
                  hands-on robotics means learning by doing — soldering circuits, debugging code, machining parts. The ability to design, prototype, and iterate builds confidence that carries far beyond the workshop.
                </p>
                <p className="text-lg text-text-primary/75 font-light leading-relaxed">
                  <strong className="text-text-heading font-medium">For the college,</strong>{' '}
                  RTF members consistently represent GCoEA at IIT Bombay, ISRO, and national-level stages — showcasing that world-class engineering talent comes from every campus.
                </p>
                <p className="text-lg text-text-primary/75 font-light leading-relaxed">
                  <strong className="text-text-heading font-medium">For the industry,</strong>{' '}
                  students trained in real hardware and embedded systems become immediately productive. Our alumni carry the maker mindset forward into leading tech companies and research labs.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-6">
                <p className="text-lg text-text-primary/75 font-light leading-relaxed">
                  Traditional engineering curricula often separate theory from practice. At RTF, we bridge that gap. Instead of waiting for lab sessions, our members get immediate access to components, tools, and mentorship — first-year students can start building from day one.
                </p>
                <p className="text-lg text-text-primary/75 font-light leading-relaxed">
                  We build everything ourselves: competition robots capable of autonomous navigation, drones with custom flight controllers, and embedded systems powering real-world solutions — from breadboards to national stages, built entirely by students.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-28 md:mb-36">
        <div className="h-px bg-border/40" />
      </div>

      {/* ── VALUES ───────────────────────────────────── */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-12">
          <p className="text-sm font-mono tracking-[0.2em] text-cyan-400/70 uppercase mb-4">Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-heading">
            What drives <span className="text-gradient-red">us</span>
          </h2>
        </motion.div>

        <motion.div
          ref={valuesRef}
          variants={staggerContainer}
          initial="hidden"
          animate={valuesInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {values.map((v) => (
            <motion.div key={v.title} variants={fadeUp}>
              <h3 className="font-display font-semibold text-text-heading text-2xl mb-4">
                {v.title}
              </h3>
              <p className="text-lg text-text-primary/75 leading-relaxed font-light">
                {v.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── TECHNICAL DOMAINS ────────────────────────── */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-12">
          <p className="text-sm font-mono tracking-[0.2em] text-cyan-400/70 uppercase mb-4">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-heading">
            Technical <span className="text-gradient-red">Domains</span>
          </h2>
        </motion.div>

        <motion.div
          ref={domainsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={domainsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-10"
        >
          {domains.map((d) => (
            <motion.div
              key={d.name}
              variants={fadeUp}
              className="group border border-border/40 rounded-2xl p-8 bg-black/50 hover:bg-black/60 hover:border-border/60 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <h3 className="font-display font-semibold text-text-heading text-xl leading-tight">
                  {d.name}
                </h3>
                <span className="text-sm font-mono text-cyan-400/50 shrink-0 ml-4 mt-0.5">
                  {d.tag}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {d.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 text-sm font-mono rounded-full bg-black/40 border border-border/50 text-text-primary/60 group-hover:border-cyan-500/30 group-hover:text-cyan-400/80 transition-colors duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── COMPETITIONS ─────────────────────────────── */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-12">
          <p className="text-sm font-mono tracking-[0.2em] text-cyan-400/70 uppercase mb-4">Track Record</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-heading">
            National <span className="text-gradient-red">Competitions</span>
          </h2>
        </motion.div>

        <motion.div
          ref={compRef}
          variants={staggerContainer}
          initial="hidden"
          animate={compInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {competitions.map((c) => (
            <motion.div key={c.id} variants={fadeUp}>
              <h3 className="font-display font-semibold text-text-heading text-xl mb-2">
                {c.name}
              </h3>
              <p className="text-sm font-mono text-cyan-400/60 mb-4">
                {c.organizer} · {c.year}
              </p>
              <p className="text-lg text-text-primary/75 leading-relaxed font-light">
                {c.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          ref={ctaRef}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
        >
          <div className="relative text-center bg-black/50 border border-border/50 rounded-3xl p-10 md:p-16 max-w-3xl mx-auto overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <p className="text-sm font-mono tracking-[0.2em] text-cyan-400/70 uppercase mb-6">
              Open Recruitment
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-heading mb-4">
              Want to be part of the{' '}
              <span className="text-gradient-red">journey</span>?
            </h2>
            <p className="text-lg text-text-primary/75 max-w-md mx-auto mb-10 font-light leading-relaxed">
              We recruit new members every academic year. No prior experience required — just curiosity and the drive to build.
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
        </motion.div>
      </section>

    </motion.main>
  );
}