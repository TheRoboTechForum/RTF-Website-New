import { motion } from 'framer-motion';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FaLinkedinIn } from 'react-icons/fa';
import { Quote } from 'lucide-react';
import { teamMembers, getTeamByType, testimonials } from '../data/team';

const typeLabels = {
  faculty: { label: '01 // MENTORS', title: 'FACULTY ADVISORS' },
  lead: { label: '02 // LEADERSHIP', title: 'CORE LEADERSHIP' },
  core: { label: '03 // TEAM', title: 'CORE MEMBERS' },
};

function TeamHero() {
  return (
    <div className="pt-32 pb-16 w-full relative overflow-hidden border-b border-border">


      {/* Top text row */}
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-12 mb-12 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-cyan-600 dark:text-cyan-400">
        <div className="mb-6 md:mb-0 max-w-[200px] leading-relaxed">
          EXPERIENCE MEETS <br /> PASSION
        </div>
        <div className="max-w-sm text-left md:text-right leading-relaxed text-text-secondary">
          SAY HELLO TO THE BRILLIANT MINDS AND INNOVATORS BEHIND RTF. WE BUILT A TEAM OF DEDICATED ENGINEERS TO PUSH THE BOUNDARIES OF ROBOTICS.
        </div>
      </div>

      {/* Marquee Huge Text */}
      <div className="w-full overflow-hidden flex items-center relative py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap font-display font-black text-[15vw] leading-none uppercase tracking-tighter"
        >
          <div className="flex gap-8 px-4 items-center">
            <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(239,68,68,0.4)' }}>TEAM</span>
            <span className="text-text-heading">MEET THE TEAM</span>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(168,85,247,0.4)' }}>TEAM</span>
            <span className="text-text-heading">MEET THE TEAM</span>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(239,68,68,0.4)' }}>TEAM</span>
            <span className="text-text-heading">MEET THE TEAM</span>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(168,85,247,0.4)' }}>TEAM</span>
            <span className="text-text-heading">MEET THE TEAM</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BrutalistHeader({ label, title }) {
  return (
    <div className="mb-12 border-b border-border pb-4">
      <p className="font-mono text-[10px] text-red-400 tracking-widest mb-2 uppercase">{label}</p>
      <h2 className="font-display font-black text-4xl md:text-6xl text-text-heading tracking-tighter uppercase">{title}</h2>
    </div>
  );
}

function MemberCard({ member }) {
  return (
    <motion.div variants={fadeUp} className="group h-full max-w-[320px] w-full mx-auto">
      {/* Card container themed */}
      <div className="border border-border bg-card h-full flex flex-col relative overflow-hidden hover:border-cyan-500/30 hover:shadow-sm transition-all duration-300 rounded-sm">
        
        {/* Corner markers */}
        <div className="absolute top-2 left-2 text-[8px] text-text-muted/50 font-mono z-20">▲</div>
        <div className="absolute top-2 right-2 text-[8px] text-text-muted/50 font-mono z-20">▼</div>
        
        <div className="w-full relative aspect-[3/4] bg-dark overflow-hidden border-b border-border group-hover:border-cyan-500/30 transition-colors">
          {member.photo ? (
            <img 
               src={member.photo} 
               alt={member.name}
               className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display font-black text-6xl text-border">
               {member.name.split(' ').map(n=>n[0]).join('')}
            </div>
          )}

          {/* Name overlay at the bottom inside the image area */}
          <div className="absolute bottom-0 left-0 w-full p-4 pt-16 bg-gradient-to-t from-card via-card/80 to-transparent flex items-end">
            <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-text-heading leading-none group-hover:text-cyan-300 transition-colors">
              {member.name}
            </h3>
          </div>
        </div>

        {/* Details section */}
        <div className="p-5 flex flex-col flex-grow bg-card">
          <div className="flex flex-col gap-1.5 mb-6">
            {member.role?.split('\n').map((line, idx) => (
              <p key={idx} className={`text-[10px] md:text-[11px] font-mono uppercase tracking-widest ${idx === 0 ? 'text-cyan-400 font-semibold' : 'text-text-secondary'}`}>
                {line.trim()}
              </p>
            ))}
          </div>
          
          <div className="mt-auto pt-4 border-t border-border group-hover:border-cyan-500/30 flex justify-between items-center transition-colors">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest mb-1">
                DEPARTMENT
              </span>
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                {member.department}
              </span>
            </div>
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center border border-border rounded-sm text-text-muted hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-400 transition-colors z-20 shrink-0">
                <FaLinkedinIn size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TeamSection({ type }) {
  const [ref, isInView] = useScrollAnimation();
  const members = getTeamByType(type);
  const { label, title } = typeLabels[type];

  if (members.length === 0) return null;

  return (
    <div className="mb-32 px-6 md:px-12 max-w-[1400px] mx-auto">
      <BrutalistHeader label={label} title={title} />
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-wrap gap-6"
      >
        {members.map((member, index) => (
          <div key={`${member.id}-${index}`} className="flex-1 min-w-[280px] max-w-[320px]">
            <MemberCard member={member} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialsSection() {
  const [ref, isInView] = useScrollAnimation();

  return (
    <div className="mb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
      <BrutalistHeader label="04 // REVIEWS" title="WHAT MEMBERS SAY" />
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((t) => (
          <motion.div key={t.id} variants={fadeUp} className="h-full">
            <div className="p-8 h-full flex flex-col bg-card border border-border hover:border-cyan-500/30 hover:shadow-sm transition-all relative group rounded-sm">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:text-cyan-400 transition-all">
                <Quote size={80} />
              </div>
              <p className="text-sm md:text-base text-text-body leading-relaxed font-mono uppercase tracking-wide mb-8 flex-grow z-10">
                "{t.quote}"
              </p>
              <div className="border-t border-border group-hover:border-cyan-500/30 pt-5 mt-auto flex items-center justify-between z-10 transition-colors">
                <div>
                  <p className="font-display font-black text-xl text-text-heading tracking-tight uppercase group-hover:text-cyan-300 transition-colors">
                    {t.author}
                  </p>
                  <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 tracking-widest mt-1 uppercase">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
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
      className="min-h-screen"
    >
      <TeamHero />
      <div className="py-20">
        <TeamSection type="faculty" />
        <TeamSection type="lead" />
        <TeamSection type="core" />
        <TestimonialsSection />
      </div>
    </motion.main>
  );
}