import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { pageTransition } from '../lib/animations';
import {
  Trophy, Rocket, Flag, Award, Cpu, Zap,
  MapPin, Users, Calendar,
} from 'lucide-react';

/* ─── Keyframes (injected once) ─────────────────────── */
const FLOAT_CSS = `
@keyframes antigravityFloat {
  0%, 100% { transform: translateY(0px) }
  50%      { transform: translateY(-10px) }
}
.card-float { animation: antigravityFloat 5s ease-in-out infinite; }
`;

/* ─── Achievement Data ──────────────────────────────── */
const achievements = [
  {
    year: '2026', date: 'Ongoing',
    title: 'National Robotics Championship Winner',
    description: 'Secured 1st place among 200+ teams across India with our autonomous quadruped — cutting-edge locomotion and terrain mapping.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800',
    icon: Trophy, venue: 'National Level', teamSize: '30+',
    tags: ['National', 'Gold', 'Autonomous'],
  },
  {
    year: '2025', date: 'DD Robocon Season',
    title: 'DD Robocon — IIT Delhi',
    description: 'Competed at DD Robocon (ABU Asia-Pacific) at IIT Delhi against 100+ teams with a custom-built competition robot.',
    image: 'https://therobotechforum.in/assets/img/Robocon%202025/20250713_183423%20-%20Copy.webp',
    icon: Rocket, venue: 'IIT Delhi', teamSize: '25',
    tags: ['Robocon', 'ABU', 'IIT Delhi'],
  },
  {
    year: '2024', date: 'Competition Season',
    title: 'Robocon India Finalists',
    description: 'Reached the grand finale with our custom-built elephant robot and advanced throwing mechanism.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    icon: Award, venue: 'IIT Delhi', teamSize: '22',
    tags: ['Robocon', 'Finalist', 'Top 5'],
  },
  {
    year: '2023', date: 'IRoC-U Season',
    title: 'ISRO Robotics Challenge — Top 10 Globally',
    description: "Ranked top 10 globally in ISRO's IRoC-U for planetary rover design and manipulation arm.",
    image: 'https://images.unsplash.com/photo-1620825937374-87fc1a6014dc?q=80&w=800',
    icon: Cpu, venue: 'ISRO / URSC', teamSize: '18',
    tags: ['International', 'ISRO', 'Rover'],
  },
  {
    year: '2022', date: 'E-Yantra Season',
    title: 'E-Yantra IIT Bombay & Aero-Design',
    description: "Autonomous UAVs with payload dropping at IIT Bombay's flagship robotics competition.",
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=800',
    icon: Zap, venue: 'IIT Bombay', teamSize: '15',
    tags: ['E-Yantra', 'UAV', 'IIT Bombay'],
  },
  {
    year: '2017', date: 'Foundation Year',
    title: 'Genesis of Robo-Tech Forum',
    description: "Passionate engineers at GCoEA laid the foundation for the college's most decorated technical club.",
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
    icon: Flag, venue: 'GCoEA Amravati', teamSize: '12',
    tags: ['Foundation', 'Legacy', 'Genesis'],
  },
];

/* ─────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────── */
export default function Achievement() {
  const wrapperRef = useRef(null);
  const nodeRefs   = useRef([]);
  const [svgPath, setSvgPath] = useState('');
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  /* inject float CSS */
  useEffect(() => {
    const id = 'antigravity-float-css';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = FLOAT_CSS;
      document.head.appendChild(s);
    }
  }, []);

  /* ── Measure node positions → build SVG Bezier path ── */
  useLayoutEffect(() => {
    const build = () => {
      const wrapper = wrapperRef.current;
      const nodes = nodeRefs.current.filter(Boolean);
      if (!wrapper || nodes.length < 2) return;

      const wRect = wrapper.getBoundingClientRect();

      const pts = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return {
          x: r.left - wRect.left + r.width / 2,
          y: r.top - wRect.top + r.height / 2,
        };
      });

      // Build smooth S-curve Bezier that snakes through each node
      let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const curr = pts[i];
        // Control points: keep x of respective point, share midpoint y
        const cpY1 = prev.y + (curr.y - prev.y) * 0.45;
        const cpY2 = prev.y + (curr.y - prev.y) * 0.55;
        d += ` C ${prev.x.toFixed(1)} ${cpY1.toFixed(1)}, ${curr.x.toFixed(1)} ${cpY2.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
      }

      setSvgPath(d);
      setSvgSize({ w: wRect.width, h: wRect.height });
    };

    // Run after paint
    const raf = requestAnimationFrame(() => setTimeout(build, 200));
    window.addEventListener('resize', build);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
    };
  }, []);

  /* ── Framer Motion scroll-linked pathLength ── */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start 60%', 'end 45%'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 0.7, 0.7]);

  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-deep text-text-primary min-h-screen"
    >
      {/* ── Header ── */}
      <div className="pt-32 pb-16 text-center px-6">
        <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase block mb-4">
          // HALL OF FAME
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-wider mb-4">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            TIMELINE
          </span>
        </h1>
        <div className="mx-auto w-20 h-1 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 rounded-full mb-4" />
        <p className="text-text-secondary max-w-md mx-auto text-sm md:text-base leading-relaxed">
          Scroll to trace our journey from a garage dream to national glory.
        </p>
      </div>

      {/* ── Timeline ── */}
      <div ref={wrapperRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-40">

        {/* Neon SVG Wire */}
        {svgPath && (
          <svg
            className="absolute top-0 left-0 pointer-events-none z-[5]"
            width={svgSize.w}
            height={svgSize.h}
            style={{ overflow: 'visible' }}
          >
            {/* Dim background trace so user sees where the wire goes */}
            <path
              d={svgPath}
              fill="none"
              stroke="rgba(34,211,238,0.06)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Glow layer */}
            <motion.path
              d={svgPath}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                pathLength,
                opacity: glowOpacity,
                filter: 'drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 14px #22d3ee) drop-shadow(0 0 28px rgba(34,211,238,0.4))',
              }}
            />

            {/* Crisp bright wire */}
            <motion.path
              d={svgPath}
              fill="none"
              stroke="url(#neonGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength }}
            />

            <defs>
              <linearGradient id="neonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#22d3ee" />
                <stop offset="40%"  stopColor="#38bdf8" />
                <stop offset="70%"  stopColor="#818cf8" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Subtle grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.012)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

        {/* ── Cards + Nodes ── */}
        <div className="relative z-10 space-y-28 md:space-y-36">
          {achievements.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <TimelineItem
                key={item.year}
                item={item}
                index={index}
                isLeft={isLeft}
                nodeRef={(el) => (nodeRefs.current[index] = el)}
              />
            );
          })}
        </div>
      </div>
    </motion.main>
  );
}

/* ─────────────────────────────────────────────────────
   Single timeline item — card + node
   ───────────────────────────────────────────────────── */
function TimelineItem({ item, index, isLeft, nodeRef }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.35 });
  const Icon = item.icon;

  return (
    <div
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* ── Card ── */}
      <motion.div
        ref={cardRef}
        className={`card-float w-full md:w-[calc(50%-48px)] will-change-transform ${
          isLeft ? 'md:pr-2' : 'md:pl-2'
        }`}
        style={{ animationDelay: `${index * -0.8}s` }}
        initial={{ opacity: 0.1, scale: 0.88, filter: 'blur(8px)' }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0.1, scale: 0.88, filter: 'blur(8px)' }
        }
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="group rounded-2xl bg-black/40 border border-cyan-500/15 backdrop-blur-lg overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.12)] transition-all duration-700">
          {/* Image */}
          <div className="relative h-48 md:h-56 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover brightness-[0.45] group-hover:brightness-[0.65] group-hover:scale-105 transition-all duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-3 right-4 text-6xl font-display font-black text-white/[0.04] pointer-events-none select-none leading-none">
              {item.year}
            </div>
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-cyan-100 bg-cyan-950/70 border border-cyan-500/25 rounded-md backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3 text-cyan-300">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center">
                <Icon size={17} />
              </div>
              <span className="text-sm font-mono tracking-wider">{item.date}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 leading-snug group-hover:text-cyan-50 transition-colors duration-500">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {item.description}
            </p>
            <div className="flex items-center flex-wrap gap-4 text-[11px] text-text-muted font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin size={11} className="text-cyan-500/50" /> {item.venue}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={11} className="text-cyan-500/50" /> {item.teamSize}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={11} className="text-cyan-500/50" /> {item.year}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Centre Node ── */}
      <div
        ref={nodeRef}
        className="relative z-20 w-24 flex flex-col items-center justify-center shrink-0"
      >
        <motion.div
          className="relative w-14 h-14 rounded-full border-2 border-cyan-500/15 flex items-center justify-center bg-deep/90 backdrop-blur-sm"
          initial={{ borderColor: 'rgba(34,211,238,0.15)', boxShadow: 'none' }}
          animate={
            isInView
              ? {
                  borderColor: 'rgba(34,211,238,0.6)',
                  boxShadow: '0 0 20px rgba(34,211,238,0.35), 0 0 40px rgba(34,211,238,0.1)',
                }
              : {
                  borderColor: 'rgba(34,211,238,0.15)',
                  boxShadow: '0 0 0px rgba(34,211,238,0)',
                }
          }
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-5 h-5 rounded-full bg-cyan-400"
            initial={{ scale: 0.3, opacity: 0.2 }}
            animate={
              isInView
                ? { scale: 1, opacity: 1, boxShadow: '0 0 12px rgba(34,211,238,0.7)' }
                : { scale: 0.3, opacity: 0.2, boxShadow: '0 0 0px rgba(34,211,238,0)' }
            }
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          />
        </motion.div>
        <span className="mt-2 text-xs font-mono font-bold text-cyan-400/70 tracking-widest">
          {item.year}
        </span>
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-[calc(50%-48px)]" />
    </div>
  );
}
