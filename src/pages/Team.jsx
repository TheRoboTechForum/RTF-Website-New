import { motion } from 'framer-motion';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionHeader from '../components/ui/SectionHeader';
import HoloCard from '../components/ui/HoloCard';
import { Linkedin, Quote } from 'lucide-react';
import { teamMembers, getTeamByType, testimonials } from '../data/team';

const typeLabels = {
  faculty: { label: '// MENTORS', title: 'Faculty Advisors' },
  lead: { label: '// LEADERSHIP', title: 'Core Leadership' },
  core: { label: '// TEAM', title: 'Core Members' },
};

function MemberCard({ member }) {
  const initials = member.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

  return (
    <motion.div variants={fadeUp}>
      <HoloCard glow="cyan" className="p-6 h-full flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/30 flex items-center justify-center mb-4">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="font-display font-bold text-cyan-400 text-lg">{initials}</span>
          )}
        </div>

        <h3 className="font-display font-semibold text-text-primary text-base">{member.name}</h3>
        <p className="text-xs font-mono text-cyan-400 mt-1">{member.role}</p>
        <p className="text-xs text-text-muted mt-1">{member.department}</p>
        {member.year && (
          <p className="text-[10px] font-mono text-text-muted mt-1">{member.year}</p>
        )}

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="mt-3 w-8 h-8 rounded-lg bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            <Linkedin size={14} />
          </a>
        )}
      </HoloCard>
    </motion.div>
  );
}

function TeamSection({ type }) {
  const [ref, isInView] = useScrollAnimation();
  const members = getTeamByType(type);
  const { label, title } = typeLabels[type];

  if (members.length === 0) return null;

  return (
    <div className="mb-20">
      <SectionHeader label={label} title={title} />
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={`max-w-7xl mx-auto grid gap-6 ${
          type === 'faculty'
            ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}
      >
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialsSection() {
  const [ref, isInView] = useScrollAnimation();

  return (
    <div>
      <SectionHeader
        label="// WHAT MEMBERS SAY"
        title="Testimonials"
        subtitle="Hear from the engineers who built RTF."
      />
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {testimonials.map((t) => (
          <motion.div key={t.id} variants={fadeUp}>
            <HoloCard glow="purple" className="p-6 h-full">
              <Quote size={20} className="text-purple-400/50 mb-3" />
              <p className="text-sm text-text-secondary leading-relaxed italic mb-4">
                "{t.quote}"
              </p>
              <div className="border-t border-border/50 pt-3">
                <p className="font-display font-semibold text-text-primary text-sm">
                  {t.author}
                </p>
                <p className="text-xs font-mono text-text-muted">{t.role}</p>
              </div>
            </HoloCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Team() {
  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24 px-6"
    >
      <TeamSection type="faculty" />
      <TeamSection type="lead" />
      <TeamSection type="core" />
      <TestimonialsSection />
    </motion.main>
  );
}
