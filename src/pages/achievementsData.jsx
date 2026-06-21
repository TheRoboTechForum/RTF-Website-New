import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Rocket, Flag, Award, Cpu, Zap, MapPin, Users, Calendar } from 'lucide-react';

import roboconResultFile   from '../assets/docs/Final Result of  DD-Robocon 2026 Stage -II .pdf';
import roboconTeamPhoto    from '../assets/img/robocon2026Result.png';
import iitIndoreTeam       from '../assets/achievements/iit_indore_team.png';
import lineFollowerRobots  from '../assets/achievements/line_follower_robots.png';
import gecaLineFollower    from '../assets/achievements/geca_line_follower.png';
import carvaanTrophy       from '../assets/achievements/carvaan_trophy.png';

/* GLOBAL STYLES */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes tlDotPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.5); }
    50%      { box-shadow: 0 0 0 6px rgba(34,211,238,0.0); }
  }
  @keyframes tlDotPulseGold {
    0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.6); }
    50%      { box-shadow: 0 0 0 8px rgba(251,191,36,0.0); }
  }
  @keyframes tlDotPulseLight {
    0%,100% { box-shadow: 0 0 0 0 rgba(14,165,233,0.5); }
    50%      { box-shadow: 0 0 0 6px rgba(14,165,233,0.0); }
  }
  @keyframes tlDotPulseGoldLight {
    0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.5); }
    50%      { box-shadow: 0 0 0 8px rgba(251,191,36,0.0); }
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  /*  DARK MODE bg  */
  .hex-bg { background-color: #010912; }

  /*  WHITE MODE bg  */
  .hex-bg-light {
    background:
      radial-gradient(circle at 50% 18%, rgba(14,165,233,0.15) 0%, rgba(14,165,233,0.07) 31%, transparent 58%),
      linear-gradient(180deg, #f8fbff 0%, #f6fbff 48%, #ffffff 100%);
    color: #0f172a;
  }
  .hex-bg-light::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(rgba(14,165,233,0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(14,165,233,0.055) 1px, transparent 1px),
      radial-gradient(circle, rgba(6,182,212,0.55) 0 1.5px, transparent 2px);
    background-size: 64px 64px, 64px 64px, 180px 180px;
    background-position: center top, center top, 28px 36px;
    opacity: 0.42;
    mask-image: linear-gradient(180deg, black 0%, rgba(0,0,0,0.75) 56%, transparent 100%);
  }

  /*  Shimmer skeleton  */
  .img-skeleton {
    background: linear-gradient(90deg,rgba(34,211,238,0.03) 0%,rgba(34,211,238,0.09) 50%,rgba(34,211,238,0.03) 100%);
    background-size:600px 100%;
    animation: shimmer 1.6s infinite linear;
  }
  .light .img-skeleton {
    background: linear-gradient(90deg,rgba(14,165,233,0.06) 0%,rgba(14,165,233,0.16) 50%,rgba(14,165,233,0.06) 100%);
    background-size:600px 100%;
  }

  /*  Tag badge  */
  .badge {
    display:inline-flex; align-items:center;
    padding:3px 10px; font-family:'DM Sans',sans-serif;
    font-size:9px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase;
    border-radius:5px; border:1px solid rgba(34,211,238,0.22);
    color:rgba(34,211,238,0.88); background:rgba(34,211,238,0.06); white-space:nowrap;
  }

  /*  Achievement card - DARK  */
  .ach-card {
    position: relative;
    background: linear-gradient(150deg,rgba(6,14,28,0.97) 0%,rgba(3,8,18,0.99) 100%);
    border-radius: 20px;
    overflow: hidden;
    transition: box-shadow 0.4s ease, border-color 0.4s ease;
    cursor: default;
  }
  .ach-card-cyan { border: 1px solid rgba(34,211,238,0.16); }
  .ach-card-cyan:hover {
    border-color: rgba(34,211,238,0.42);
    box-shadow: 0 28px 70px rgba(0,0,0,0.55), 0 0 50px rgba(34,211,238,0.07), inset 0 1px 0 rgba(34,211,238,0.08);
  }
  .ach-card-gold { border: 1px solid rgba(251,191,36,0.28); }
  .ach-card-gold:hover {
    border-color: rgba(251,191,36,0.55);
    box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(251,191,36,0.08), inset 0 1px 0 rgba(251,191,36,0.1);
  }

  /*  Achievement card - WHITE overrides  */
  .light .ach-card {
    background: linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(248,253,255,0.98) 100%);
    box-shadow: 0 18px 46px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.96);
    backdrop-filter: blur(14px);
  }
  .light .ach-card-cyan {
    border: 1px solid rgba(14,165,233,0.22);
  }
  .light .ach-card-cyan:hover {
    border-color: rgba(6,182,212,0.52);
    box-shadow: 0 24px 58px rgba(15,23,42,0.12), 0 0 34px rgba(14,165,233,0.13), inset 0 1px 0 rgba(255,255,255,1);
  }
  .light .ach-card-gold {
    border: 1px solid rgba(245,158,11,0.32);
  }
  .light .ach-card-gold:hover {
    border-color: rgba(245,158,11,0.58);
    box-shadow: 0 24px 58px rgba(15,23,42,0.12), 0 0 34px rgba(245,158,11,0.14), inset 0 1px 0 rgba(255,255,255,1);
  }

  /*  meta row  */
  .meta-item {
    display:flex; align-items:center; gap:5px;
    font-family:'DM Sans'; font-size:11px; color:rgba(148,163,184,0.6);
  }
  .light .meta-item { color: rgba(71,85,105,0.7); }

  /*  scan line texture (only dark)  */
  .scanlines {
    background-image: repeating-linear-gradient(
      0deg,
      rgba(34,211,238,0.012) 0px,
      rgba(34,211,238,0.012) 1px,
      transparent 1px,
      transparent 4px
    );
    pointer-events:none;
  }
  .light .scanlines { background-image: none; }

  /*  Left vertical timeline  */
  .vtl-sidebar {
    position: fixed;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 20px 0;
  }
  .vtl-line {
    position: absolute;
    left: 50%;
    top: 20px;
    bottom: 20px;
    width: 1px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, transparent, rgba(34,211,238,0.25) 15%, rgba(34,211,238,0.25) 85%, transparent);
    z-index: 0;
  }
  .light .vtl-line {
    background: linear-gradient(180deg, transparent, rgba(14,165,233,0.3) 15%, rgba(14,165,233,0.3) 85%, transparent);
  }
  .vtl-item {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    padding: 10px 0;
    width: 140px;
  }
  .vtl-dot-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    flex-shrink: 0;
  }
  .vtl-dot {
    width: 9px; height: 9px;
    border-radius: 50%;
    background: rgba(34,211,238,0.75);
    border: 2px solid rgba(34,211,238,0.25);
    box-shadow: 0 0 8px rgba(34,211,238,0.35);
    transition: transform 0.2s, box-shadow 0.2s;
    animation: tlDotPulse 2.5s ease-in-out infinite;
    flex-shrink: 0;
  }
  .vtl-dot-gold {
    background: rgba(251,191,36,0.9);
    border-color: rgba(251,191,36,0.35);
    box-shadow: 0 0 12px rgba(251,191,36,0.45);
    animation: tlDotPulseGold 2s ease-in-out infinite;
  }
  .vtl-item:hover .vtl-dot,
  .vtl-item.active .vtl-dot {
    transform: scale(1.6);
    box-shadow: 0 0 16px rgba(34,211,238,0.75);
  }
  .vtl-item:hover .vtl-dot-gold,
  .vtl-item.active .vtl-dot-gold {
    transform: scale(1.6);
    box-shadow: 0 0 20px rgba(251,191,36,0.85);
  }
  .vtl-label {
    display: flex;
    flex-direction: column;
    gap: 1px;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.2s, transform 0.2s;
    pointer-events: none;
  }
  .vtl-item:hover .vtl-label,
  .vtl-item.active .vtl-label {
    opacity: 1;
    transform: translateX(0);
  }
  .vtl-year {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 8px;
    letter-spacing: 0.18em;
    color: rgba(34,211,238,0.9);
    white-space: nowrap;
  }
  .vtl-year-gold { color: rgba(251,191,36,1); }
  .vtl-title-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 9px;
    color: rgba(148,163,184,0.85);
    letter-spacing: 0.04em;
    white-space: nowrap;
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* light vtl overrides */
  .light .vtl-dot {
    background: rgba(14,165,233,0.85);
    border-color: rgba(14,165,233,0.3);
    box-shadow: 0 0 8px rgba(14,165,233,0.35);
    animation: tlDotPulseLight 2.5s ease-in-out infinite;
  }
  .light .vtl-dot-gold {
    background: rgba(251,191,36,0.9);
    border-color: rgba(251,191,36,0.35);
    box-shadow: 0 0 12px rgba(251,191,36,0.45);
    animation: tlDotPulseGoldLight 2s ease-in-out infinite;
  }
  .light .vtl-item:hover .vtl-dot,
  .light .vtl-item.active .vtl-dot {
    box-shadow: 0 0 16px rgba(14,165,233,0.75);
  }
  .light .vtl-item:hover .vtl-dot-gold,
  .light .vtl-item.active .vtl-dot-gold {
    box-shadow: 0 0 20px rgba(251,191,36,0.85);
  }
  .light .vtl-year { color: #0369a1; }
  .light .vtl-title-text { color: #334155; }

  /* Tooltip box */
  .vtl-tooltip {
    position: absolute;
    left: 28px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(3,8,18,0.92);
    border: 1px solid rgba(34,211,238,0.2);
    border-radius: 10px;
    width: 182px;
    max-width: calc(100vw - 72px);
    padding: 8px 12px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    white-space: normal;
    overflow-wrap: anywhere;
    backdrop-filter: blur(8px);
  }
  .vtl-item:hover .vtl-tooltip { opacity: 1; }
  .light .vtl-tooltip {
    background: rgba(255,255,255,0.98);
    border-color: rgba(14,165,233,0.3);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  .achievement-toolbar {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .achievement-toolbar-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .achievement-toolbar-kicker {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }
  .achievement-toolbar-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(14px, 1.8vw, 18px);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .achievement-year-picker {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .achievement-year-chip {
    border: 1px solid transparent;
    border-radius: 999px;
    padding: 10px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
    white-space: nowrap;
  }
  .achievement-year-chip:hover {
    transform: translateY(-1px);
  }
  .achievement-year-chip.is-active {
    transform: translateY(-1px);
  }
  .achievement-year-chip-count {
    margin-left: 6px;
    opacity: 0.75;
  }
  .achievement-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .achievement-empty {
    padding: 28px 20px;
    border-radius: 20px;
    border: 1px dashed rgba(14,165,233,0.24);
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    color: rgba(148,163,184,0.9);
  }
  .light .achievement-empty {
    border-color: rgba(14,165,233,0.22);
    color: #475569;
    background: rgba(255,255,255,0.58);
  }

  .ach-card-layout {
    display: grid;
    grid-template-columns: 45% 55%;
    min-height: 340px;
    overflow: hidden;
  }
  .ach-card-media {
    position: relative;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
    background:
      radial-gradient(circle at 50% 38%, rgba(34,211,238,0.16) 0%, transparent 58%),
      linear-gradient(145deg, rgba(3,8,18,0.85) 0%, rgba(8,15,28,0.96) 100%);
  }
  .ach-card-body {
    padding: 36px 36px 32px 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    gap: 0;
  }
  @media (max-width: 1024px) {
    .vtl-sidebar {
      display: none;
    }
  }
  @media (max-width: 900px) {
    .achievement-toolbar {
      align-items: flex-start;
    }
    .achievement-year-picker {
      justify-content: flex-start;
    }
    .ach-card-layout {
      grid-template-columns: 1fr;
      min-height: auto;
    }
    .ach-card-media {
      min-height: 260px;
      padding: 14px;
    }
    .ach-card-body {
      padding: 28px 24px 30px;
    }
  }
`;

/* DATA */
const achievements = [
  {
    featured: true, rank: 'JOINT AIR-1',
    year: '2026', date: 'May 2026',
    title: 'DD Robocon 2026', subtitle: 'Stage 1 & 2 — All India Rank 1',
    description: 'Secured Joint AIR-1 in Stage 1 & 2 of DD Robocon 2026 — "Kung Fu Quest" — by submitting detailed design documents & Working Video for two coordinated robots (manual & autonomous) complete with CAD models and simulations for weapon assembly, KFS collection, and Tic-Tac-Toe arena placement.',
    resultFile: roboconResultFile,
    image: roboconTeamPhoto,
    icon: Trophy, venue: 'National Level', teamSize: '30+',
    tags: ['DD Robocon', 'AIR-1', 'Autonomous', 'National'], accent: '#fbbf24',
    hallLabel: 'Hall of Fame',
  },
  {
    rank: 'TRIPLE AIR-1', year: '2026', date: 'March 2026',
    title: 'IIT Indore — Ingenium', subtitle: 'Three Gold Medals at Techfest',
    description: "Competed at IIT Indore's flagship Techfest Ingenium and swept all three events: AIR-1 in Aero Artistry (maximum unpowered glider flight time), AIR-1 in CV Obstacle Course (autonomous navigation via OpenCV on Raspberry Pi), and AIR-1 in Robo Soccer (small-bot football match).",
    image: iitIndoreTeam,
    icon: Award, venue: 'IIT Indore', teamSize: '25',
    tags: ['Aero Artistry', 'CV Obstacle', 'Robo Soccer', 'AIR-1'], accent: '#22d3ee',
  },
  {
    rank: 'AIR-1', year: '2026', date: 'March 2026',
    title: 'SGGSIET Nanded — Rmaggedon', subtitle: 'Line Follower — National Title',
    description: "Three teams from the Robo-Tech Forum competed in the national-level technical event Rmaggedon 2026 at SGGSIET, Nanded. One team claimed All India Rank 1 in the Line Follower event, reinforcing the club's dominance in precision autonomous robotics.",
    image: lineFollowerRobots,
    icon: Zap, venue: 'SGGSIET, Nanded', teamSize: '18',
    tags: ['Line Follower', 'AIR-1', 'Rmaggedon'], accent: '#a78bfa',
  },
  {
    rank: 'AIR-1 & 2', year: '2026', date: 'March 2026',
    title: 'GECA Sambhajinagar — Wings', subtitle: 'Line Follower — 1st & 2nd Place',
    description: "Two teams from the Robo-Tech Forum participated in the national-level Techfest Wings at GECA, Sambhajinagar. Both teams dominated the Line Follower competition, finishing AIR-1 and AIR-2 respectively and bringing dual national recognition to GCoEA.",
    image: gecaLineFollower,
    icon: Rocket, venue: 'GECA, Sambhajinagar', teamSize: '20',
    tags: ['Line Follower', 'AIR-1', 'AIR-2', 'Wings'], accent: '#38bdf8',
  },
  {
    rank: 'AIR-1 & 2', year: '2026', date: 'March 2026',
    title: 'GCOE Jalgaon — CARVAAN', subtitle: 'Line Follower — 1st & 2nd Place',
    description: "Two teams from the Robo-Tech Forum competed in the national-level Techfest CARVAAN at GCOE, Jalgaon, in the Line Follower competition. Both teams secured AIR-1 and AIR-2, completing a remarkable sweep of Line Follower events across multiple national venues in March 2026.",
    image: carvaanTrophy,
    icon: Cpu, venue: 'GCOE, Jalgaon', teamSize: '20',
    tags: ['Line Follower', 'AIR-1', 'AIR-2', 'CARVAAN'], accent: '#34d399',
  },
  {
    year: '2014', date: 'Foundation Year',
    title: 'Genesis of The Robo-Tech Forum',
    description: "Passionate engineers at GCoEA laid the foundation for the college's most decorated technical club.",
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
    icon: Flag, venue: 'GCoEA Amravati', teamSize: '12',
    tags: ['Foundation', 'Legacy'], accent: '#94a3b8',
  },
];

/* LAZY IMAGE */
function LazyImage({ src, alt, style }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && !err && <div className="img-skeleton" style={{ position: 'absolute', inset: 0 }} />}
      <img
        src={src} alt={alt} loading="lazy" decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => { setErr(true); setLoaded(true); }}
        style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.55s ease' }}
      />
    </div>
  );
}

/* TILT WRAPPER */
function TiltCard({ className, style, children, onClick, onKeyDown, tabIndex, role, ariaLabel }) {
  const ref = useRef(null);
  
  const onMove = useCallback(e => {
    const el = ref.current; 
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(1100px) rotateY(0deg) rotateX(0deg) translateY(0)`;
  }, []);

  return (
    <div ref={ref} className={className}
      style={{ ...style, transition: 'transform 0.12s ease, box-shadow 0.4s ease, border-color 0.4s ease' }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      onClick={onClick} onKeyDown={onKeyDown} tabIndex={tabIndex} role={role} aria-label={ariaLabel}>
      {children}
    </div>
  );
}

/* SINGLE ACHIEVEMENT CARD */
function AchCard({ item, index, isLight }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = item.icon;
  const isGold = !!item.featured;
  const cardCls = `ach-card ${isGold ? 'ach-card-gold' : 'ach-card-cyan'}`;
  const cardNum = String(index + 1).padStart(2, '0');

  const titleColor   = isLight ? '#0b1224' : '#f1f5f9';
  const descColor    = isLight ? '#334155' : 'rgba(148,163,184,0.78)';
  const subtitleClr  = isLight ? '#047fa8' : `${item.accent}cc`;
  const metaClr      = isLight ? '#52637a' : 'rgba(148,163,184,0.6)';
  const canOpenResult = Boolean(item.resultFile);

  const openResultFile = useCallback(() => {
    if (!item.resultFile || typeof window === 'undefined') return;
    window.open(item.resultFile, '_blank', 'noopener,noreferrer');
  }, [item.resultFile]);

  const onCardKeyDown = useCallback((event) => {
    if (!canOpenResult) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openResultFile();
    }
  }, [canOpenResult, openResultFile]);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
    >
      <TiltCard
        className={cardCls}
        onClick={canOpenResult ? openResultFile : undefined}
        onKeyDown={canOpenResult ? onCardKeyDown : undefined}
        tabIndex={canOpenResult ? 0 : undefined}
        role={canOpenResult ? 'button' : undefined}
        ariaLabel={canOpenResult ? `${item.title} result document` : undefined}
        style={canOpenResult ? { cursor: 'pointer' } : undefined}
      >
        <div className="ach-card-layout">

          {/* LEFT: image */}
          <div className="ach-card-media">
            <LazyImage
              src={item.image} alt={item.title}
              style={{
                width: '100%', height: '100%', objectFit: 'contain',
                objectPosition: 'center center',
                filter: isLight
                  ? 'brightness(1.03) saturate(1.06)'
                  : 'brightness(0.95) saturate(1.08)',
                borderRadius: 16,
                boxShadow: isLight
                  ? '0 10px 22px rgba(15,23,42,0.08)'
                  : '0 12px 26px rgba(0,0,0,0.24)',
              }}
            />
            {/* Subtle read-through overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: isLight
                ? 'linear-gradient(90deg, rgba(248,253,255,0.10) 0%, transparent 34%, transparent 66%, rgba(255,255,255,0.14) 100%)'
                : 'linear-gradient(90deg, rgba(3,8,18,0.08) 0%, transparent 34%, transparent 66%, rgba(3,8,18,0.18) 100%)',
              borderRadius: 20,
            }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${item.accent}10 0%, transparent 58%)`, borderRadius: 20 }} />
            <div className="scanlines" style={{ position: 'absolute', inset: 0 }} />

            {item.hallLabel && (
              <div style={{
                position: 'absolute', top: 20, left: 20,
                display: 'flex', alignItems: 'center', gap: 6,
                background: isLight ? 'rgba(255,251,235,0.92)' : 'rgba(251,191,36,0.1)',
                border: '1px solid rgba(251,191,36,0.45)',
                borderRadius: 99, padding: '5px 13px',
              }}>
                <Trophy size={10} color="#fbbf24" />
                <span style={{ fontFamily: 'DM Sans', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d97706' }}>
                  {item.hallLabel}
                </span>
              </div>
            )}

            <div style={{
              position: 'absolute', bottom: -8, left: 14,
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 'clamp(52px,6vw,84px)',
              color: item.accent, opacity: isLight ? 0.12 : 0.055,
              lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            }}>{item.year}</div>
          </div>

          {/* RIGHT: body */}
          <div className="ach-card-body">
            <div style={{
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: item.accent, marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ width: 26, height: 1, background: item.accent, opacity: 0.45 }} />
              {item.rank}
              <div style={{ width: 26, height: 1, background: item.accent, opacity: 0.45 }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 11,
                background: `${item.accent}14`, border: `1px solid ${item.accent}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={18} color={item.accent} />
              </div>
              <span style={{
                fontFamily: 'DM Sans', fontSize: 11,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: isLight ? `${item.accent}` : `${item.accent}99`,
              }}>{item.date}</span>
            </div>

            <h2 style={{
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px,2.2vw,28px)', letterSpacing: '0.03em',
              color: titleColor, lineHeight: 1.2, marginBottom: 6,
            }}>{item.title}</h2>

            <p style={{
              fontFamily: 'DM Sans', fontSize: 11, fontWeight: 500,
              color: subtitleClr, letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 16,
            }}>{item.subtitle}</p>

            {canOpenResult && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
                marginBottom: 14,
                padding: '5px 10px',
                borderRadius: 999,
                fontFamily: 'DM Sans',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                border: `1px solid ${item.accent}44`,
                background: `${item.accent}12`,
                color: item.accent,
              }}>
                View Result File
              </span>
            )}

            <p style={{
              fontFamily: 'DM Sans', fontSize: 14,
              color: descColor, lineHeight: 1.82,
              marginBottom: 22, maxWidth: 400,
            }}>{item.description}</p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
              {item.tags.map(tag => (
                <span key={tag} className="badge"
                  style={{
                    borderColor: `${item.accent}${isLight ? '55' : '28'}`,
                    color: item.accent,
                    background: `${item.accent}${isLight ? '15' : '09'}`,
                  }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { I: MapPin,   l: item.venue },
                { I: Users,    l: `${item.teamSize} Members` },
                { I: Calendar, l: item.year },
              ].map(({ I, l }) => (
                <span key={l} className="meta-item" style={{ color: metaClr }}>
                  <I size={11} color={`${item.accent}55`} />{l}
                </span>
              ))}
            </div>

            <div style={{
              position: 'absolute', bottom: 24, right: 28,
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 52, color: item.accent,
              opacity: isLight ? 0.12 : 0.065,
              lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            }}>{cardNum}</div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* LEFT VERTICAL TIMELINE SIDEBAR */
function VerticalTimeline({ activeIndex, onSelect, isLight, items = achievementsByYear }) {
  return (
    <div className="vtl-sidebar">
      <div className={isLight ? 'vtl-line light' : 'vtl-line'} />
      {items.map((a, i) => {
        const isActive = activeIndex === i;
        const isGold   = !!a.featured;
        const getShadow = () => {
          if (!isActive) return undefined;
          if (isGold) return '0 0 20px rgba(251,191,36,0.85)';
          return isLight
            ? '0 0 16px rgba(14,165,233,0.75)'
            : '0 0 16px rgba(34,211,238,0.75)';
        };
        return (
          <div
            key={a.year + a.title}
            className={`vtl-item${isActive ? ' active' : ''}${isLight ? ' light' : ''}`}
            onClick={() => onSelect(i)}
          >
            <div className="vtl-dot-wrap">
              <div
                className={`vtl-dot${isGold ? ' vtl-dot-gold' : ''}`}
                style={isActive ? { transform: 'scale(1.7)', boxShadow: getShadow() } : {}}
              />
            </div>
            <div className="vtl-tooltip">
              <div style={{
                fontFamily: "'Orbitron',sans-serif", fontWeight: 700,
                fontSize: 8, letterSpacing: '0.18em',
                color: isGold ? '#fbbf24' : (isLight ? '#0284c7' : '#22d3ee'),
                marginBottom: 2,
              }}>{a.year}</div>
              <div style={{
                fontFamily: 'DM Sans', fontSize: 10,
                color: isLight ? '#334155' : 'rgba(148,163,184,0.9)',
                lineHeight: 1.35,
                whiteSpace: 'normal',
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
              }}>{a.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const achievementsByYear = [...achievements].sort((left, right) => {
  const yearDiff = Number(right.year) - Number(left.year);
  if (yearDiff !== 0) return yearDiff;
  if (left.featured !== right.featured) return left.featured ? -1 : 1;
  return right.date.localeCompare(left.date);
});

const achievementYears = ['All', ...new Set(achievementsByYear.map((achievement) => achievement.year))];

/* ROOT COMPONENT */
export default function Achievement({ lightMode }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedYear, setSelectedYear] = useState('All');
  const [detectedLightMode, setDetectedLightMode] = useState(false);

  const readLightMode = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;

    const root = document.documentElement;
    const body = document.body;
    const themeText = [
      root.className,
      body?.className,
      root.dataset.theme,
      body?.dataset.theme,
      root.dataset.mode,
      body?.dataset.mode,
    ].filter(Boolean).join(' ').toLowerCase();

    const storedTheme = [
      window.localStorage.getItem('theme'),
      window.localStorage.getItem('color-theme'),
      window.localStorage.getItem('mode'),
    ].filter(Boolean).join(' ').toLowerCase();

    if (themeText.includes('light') || storedTheme.includes('light')) return true;
    if (themeText.includes('dark') || storedTheme.includes('dark')) return false;

    return window.matchMedia?.('(prefers-color-scheme: light)').matches ?? false;
  }, []);

  const isLight = typeof lightMode === 'boolean' ? lightMode : detectedLightMode;

  const cardRefs = useRef([]);
  const visibleAchievements = useMemo(() => (
    selectedYear === 'All'
      ? achievementsByYear
      : achievementsByYear.filter((achievement) => achievement.year === selectedYear)
  ), [selectedYear]);

  const handleSelect = (i) => {
    setActiveIdx(i);
    const el = cardRefs.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    setActiveIdx(0);
    cardRefs.current = [];
  }, [selectedYear]);

  useEffect(() => {
    const syncMode = () => setDetectedLightMode(readLightMode());
    syncMode();

    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const observer = new MutationObserver(syncMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'data-mode'] });
    if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme', 'data-mode'] });

    window.addEventListener('storage', syncMode);
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', syncMode);
    };
  }, [readLightMode]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = cardRefs.current.indexOf(e.target);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    visibleAchievements.forEach((_, index) => {
      const el = cardRefs.current[index];
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [visibleAchievements]);

  const bgClass   = isLight ? 'hex-bg-light' : 'hex-bg';
  const modeClass = isLight ? 'light' : '';

  const taglineColor = isLight ? '#087ea4' : 'rgba(34,211,238,0.55)';
  const subtitleClr  = isLight ? '#405167' : 'rgba(148,163,184,0.62)';

  return (
    <>
      <style>{STYLES}</style>
      <div className={`${bgClass} ${modeClass}`} style={{ minHeight: '100vh', position: 'relative', backgroundColor: isLight ? '#f8fbff' : '#010912' }}>

        {/* No ambient glow in white mode */}
        {!isLight && (
          <div style={{
            position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: 900, height: 320, pointerEvents: 'none', zIndex: 1,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.045) 0%, transparent 65%)',
          }} />
        )}

        <VerticalTimeline activeIndex={activeIdx} onSelect={handleSelect} isLight={isLight} items={visibleAchievements} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', padding: '112px 24px 60px' }}>
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 0.9 }}
              style={{
                fontFamily: 'DM Sans', fontSize: 10.5, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: taglineColor,
                display: 'block', marginBottom: 22,
              }}
            >// HALL OF FAME</motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
                fontSize: 'clamp(42px,7vw,82px)', letterSpacing: '0.07em',
                lineHeight: 1.05, marginBottom: 24,
              }}
            >
              <span style={{
                display: 'inline-block',
                backgroundImage: isLight
                  ? 'linear-gradient(135deg,#111827 0%,#0f172a 34%,#0891b2 68%,#4f46e5 100%)'
                  : 'linear-gradient(135deg,#eafaff 0%,#22d3ee 30%,#38bdf8 60%,#a78bfa 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}>
                ACHIEVEMENTS
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{
                height: 1.5, width: 100, margin: '0 auto 24px',
                background: isLight
                  ? 'linear-gradient(90deg,transparent,#06b6d4,#4f46e5,transparent)'
                  : 'linear-gradient(90deg,transparent,#22d3ee,#a78bfa,transparent)',
                borderRadius: 99,
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{
                fontFamily: 'DM Sans', fontSize: 15.5,
                color: subtitleClr,
                maxWidth: 460, margin: '0 auto', lineHeight: 1.85, fontStyle: 'italic',
              }}
            >
              From a garage dream to national glory — every block a milestone, every year a battle won.
            </motion.p>
          </div>

          <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 110px' }}>
            <div className="achievement-toolbar">
              <div className="achievement-toolbar-copy">
                <span className="achievement-toolbar-kicker" style={{ color: taglineColor }}>FILTER BY YEAR</span>
                <div className="achievement-toolbar-title" style={{ color: isLight ? '#0f172a' : '#e2e8f0' }}>
                  {selectedYear === 'All' ? 'Latest to Oldest' : `${selectedYear} achievements`}
                </div>
              </div>
              <div className="achievement-year-picker" role="tablist" aria-label="Achievement year filter">
                {achievementYears.map((year) => {
                  const active = year === selectedYear;
                  const count = year === 'All'
                    ? achievementsByYear.length
                    : achievementsByYear.filter((achievement) => achievement.year === year).length;
                  return (
                    <button
                      key={year}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={`achievement-year-chip${active ? ' is-active' : ''}`}
                      onClick={() => setSelectedYear(year)}
                      style={{
                        color: active ? (isLight ? '#ffffff' : '#00111a') : (isLight ? '#334155' : 'rgba(226,232,240,0.8)'),
                        background: active
                          ? (isLight ? 'linear-gradient(135deg,#0891b2 0%,#4f46e5 100%)' : 'linear-gradient(135deg,#22d3ee 0%,#a78bfa 100%)')
                          : (isLight ? 'rgba(255,255,255,0.74)' : 'rgba(15,23,42,0.55)'),
                        borderColor: active
                          ? 'transparent'
                          : (isLight ? 'rgba(14,165,233,0.18)' : 'rgba(34,211,238,0.16)'),
                        boxShadow: active
                          ? (isLight ? '0 14px 28px rgba(14,165,233,0.18)' : '0 14px 28px rgba(34,211,238,0.12)')
                          : 'none',
                      }}
                    >
                      {year}
                      <span className="achievement-year-chip-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: 18, fontFamily: 'DM Sans', fontSize: 12, color: subtitleClr, lineHeight: 1.7 }}>
              Showing {visibleAchievements.length} achievement{visibleAchievements.length === 1 ? '' : 's'}.
            </div>

            <div className="achievement-list">
              {visibleAchievements.map((item, i) => (
                <div key={`${item.year}-${item.title}`} ref={(el) => { cardRefs.current[i] = el; }}>
                  <AchCard item={item} index={i} isLight={isLight} />
                </div>
              ))}
              {visibleAchievements.length === 0 && (
                <div className="achievement-empty">
                  No achievements found for the selected year.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}