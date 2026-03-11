import { motion } from 'framer-motion';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionHeader from '../components/ui/SectionHeader';
import HoloCard from '../components/ui/HoloCard';
import NeoButton from '../components/ui/NeoButton';
import StatCounter from '../components/ui/StatCounter';
import {
  Trophy, Users, Cpu, Rocket, GraduationCap, Building2,
  Target, Newspaper, Globe, Handshake, ArrowRight, CheckCircle2,
} from 'lucide-react';
import { stats, competitions, sponsors } from '../data/stats';

const impactMetrics = [
  { end: 120, suffix: '+', label: 'Active Engineers', icon: Users },
  { end: 50, suffix: '+', label: 'Projects Delivered', icon: Rocket },
  { end: 15, suffix: '+', label: 'National Competitions', icon: Trophy },
  { end: 2000, suffix: '+', label: 'Students Impacted', icon: GraduationCap },
];

const whatWeOffer = [
  {
    icon: Globe,
    title: 'Brand Visibility Across India',
    description:
      'Your logo on competition robots seen at IIT Delhi, IIT Bombay, IIT Indore, VNIT Nagpur, and ISRO — reaching 10,000+ engineering students and faculty at every event.',
  },
  {
    icon: Users,
    title: 'Direct Access to Engineering Talent',
    description:
      'RTF members are trained in ROS, embedded systems, CAD, PCB design, and AI/ML. Your company gets a pre-vetted pipeline of 120+ skilled engineers ready for internships and placements.',
  },
  {
    icon: Newspaper,
    title: 'Year-Round Digital Presence',
    description:
      'Sponsor logos featured on our website, social media (5,000+ followers across platforms), newsletters, workshop banners, and all official RTF communications.',
  },
  {
    icon: Handshake,
    title: 'Co-Branded Innovation Projects',
    description:
      'Collaborate on real engineering projects — your tools, our talent. From MATLAB simulations to hardware prototypes, we showcase your technology in action at national events.',
  },
  {
    icon: Building2,
    title: 'Campus Recruitment Pipeline',
    description:
      'Host exclusive recruitment drives, tech talks, or hackathons on campus. RTF members consistently rank among the top engineering talent at GCoEA with strong placement records.',
  },
  {
    icon: Target,
    title: 'CSR & Educational Impact',
    description:
      'Your sponsorship directly funds student innovation at a government engineering college — a tangible CSR story. We provide detailed impact reports with photos, metrics, and outcomes.',
  },
];

const trackRecord = [
  'DD Robocon (ABU Asia-Pacific) — IIT Delhi, competing against 100+ teams from across India',
  'IRoC-U — ISRO\'s Robotics Challenge for space rover design and lunar exploration',
  'E-Yantra — IIT Bombay\'s flagship embedded systems & robotics competition',
  'Techfest IIT Bombay — Asia\'s largest science and technology festival',
  'Fluxus IIT Indore — National-level technical competition participation',
  'AXIS VNIT Nagpur — Central India\'s largest tech fest, 30,000+ attendees',
];

export default function Sponsors() {
  const [metricsRef, metricsInView] = useScrollAnimation();
  const [offerRef, offerInView] = useScrollAnimation();
  const [trackRef, trackInView] = useScrollAnimation();
  const [partnerRef, partnerInView] = useScrollAnimation();

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24"
    >
      {/* ─── Hero ─── */}
      <div className="px-6 mb-20">
        <SectionHeader
          label="// PARTNERSHIP PROPOSAL"
          title="Partner With The Robo-Tech Forum"
          subtitle="We don't just build robots — we build India's next generation of engineers. Here's why industry leaders choose to back RTF."
        />

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-body text-text-secondary leading-relaxed mb-4">
            The Robo-Tech Forum at Government College of Engineering, Amravati is a student-driven 
            technical club competing at <strong className="text-text-primary">IIT Delhi, IIT Bombay, ISRO, 
            and VNIT Nagpur</strong>. We've trained 120+ engineers, built 50+ real-world projects, and 
            represented our college at every major national robotics competition since 2017.
          </p>
          <p className="text-sm text-text-muted font-mono">
            Your support doesn't just fund a club — it fuels innovation that competes on national stages.
          </p>
        </div>
      </div>

      {/* ─── Impact Metrics ─── */}
      <div className="bg-surface/40 border-y border-border/30 py-16 px-6 mb-20">
        <motion.div
          ref={metricsRef}
          initial="hidden"
          animate={metricsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {impactMetrics.map((metric) => (
            <motion.div key={metric.label} variants={fadeUp} className="text-center">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                <metric.icon size={20} className="text-cyan-400" />
              </div>
              <StatCounter end={metric.end} suffix={metric.suffix} label={metric.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── What We Offer Your Brand ─── */}
      <div className="px-6 mb-24">
        <SectionHeader
          label="// WHAT YOUR BRAND GETS"
          title="The RTF Advantage"
          subtitle="Every partner gets meaningful, measurable returns — not just a logo on a banner."
        />

        <motion.div
          ref={offerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={offerInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whatWeOffer.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <HoloCard glow="cyan" className="p-6 h-full">
                <div className="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-cyan-400" />
                </div>
                <h3 className="font-display font-semibold text-text-primary text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </HoloCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── Competition Track Record ─── */}
      <div className="bg-surface/30 border-y border-border/30 py-20 px-6 mb-24">
        <SectionHeader
          label="// WHERE YOUR BRAND APPEARS"
          title="Our Competition Track Record"
          subtitle="RTF teams carry your brand to India's most prestigious engineering stages."
        />

        <motion.div
          ref={trackRef}
          variants={staggerContainer}
          initial="hidden"
          animate={trackInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto space-y-4"
        >
          {trackRecord.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 p-4 bg-elevated/50 border border-border/30 rounded-button hover:border-cyan-500/20 transition-colors"
            >
              <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 shrink-0" />
              <p className="text-sm text-text-secondary leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── Current Partners ─── */}
      {sponsors.length > 0 && (
        <div className="px-6 mb-24">
          <SectionHeader
            label="// TRUSTED BY"
            title="Companies Backing RTF"
            subtitle="Industry leaders who believe in student-driven innovation."
          />
          <motion.div
            ref={partnerRef}
            variants={staggerContainer}
            initial="hidden"
            animate={partnerInView ? 'visible' : 'hidden'}
            className="max-w-3xl mx-auto flex flex-wrap justify-center gap-8"
          >
            {sponsors.map((s) => (
              <motion.a
                key={s.id}
                variants={fadeUp}
                href={s.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-surface/60 border border-border/50 rounded-card hover:border-cyan-500/30 hover:shadow-glow-cyan transition-all duration-300"
              >
                <span className="font-display font-bold text-2xl text-text-primary">{s.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      )}

      {/* ─── Final CTA — No prices, just a conversation ─── */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="text-label text-cyan-400 mb-4 block">// LET'S TALK</span>
          <h2 className="text-h1 text-text-primary mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-body text-text-secondary mb-4 leading-relaxed">
            We customize every partnership based on your goals — whether it's brand visibility, 
            talent acquisition, CSR impact, or technology collaboration. No fixed tiers. 
            Just a conversation about what matters to you.
          </p>
          <p className="text-sm text-text-muted font-mono mb-10">
            Reach out and we'll share our detailed partnership deck within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NeoButton to="/contact" arrow>
              START A CONVERSATION
            </NeoButton>
            <NeoButton
              href="mailto:robotechforum@gcoea.ac.in"
              variant="secondary"
            >
              robotechforum@gcoea.ac.in
            </NeoButton>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
