import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import roboconTeamPhoto from '../assets/achievements/robocon_results_table.png';
import iitIndoreTeam from '../assets/achievements/iit_indore_team.png';
import lineFollowerRobots from '../assets/achievements/line_follower_robots.png';
import gecaLineFollower from '../assets/achievements/geca_line_follower.png';
import carvaanTrophy from '../assets/achievements/carvaan_trophy.png';

const CURRENT_YEAR = 2026;
const YEARS = Array.from({ length: CURRENT_YEAR - 2017 + 1 }, (_, index) => String(2017 + index));
const YEARS_DESC = [...YEARS].reverse();

const STACK_TOP_BASE = 88;
const STACK_TOP_STEP = 14;

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .achievement-page {
    min-height: 100vh;
    position: relative;
    overflow-x: clip;
    background: #010912;
    color: #eef7fb;
    font-family: 'Inter', sans-serif;
  }

  .achievement-page.dark::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 50% 0%, rgba(34,211,238,0.065), transparent 42%),
      linear-gradient(180deg, rgba(14,165,233,0.025), transparent 46%);
  }

  .achievement-page.light {
    background:
      radial-gradient(circle at 50% 8%, rgba(14,165,233,0.16), transparent 44%),
      linear-gradient(180deg, #f8fcff 0%, #ffffff 58%, #f7fbff 100%);
    color: #0f172a;
  }

  .achievement-page.light::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px),
      radial-gradient(circle, rgba(6,182,212,0.46) 0 1.5px, transparent 2px);
    background-size: 64px 64px, 64px 64px, 180px 180px;
    background-position: center top, center top, 28px 36px;
    opacity: 0.34;
    mask-image: linear-gradient(180deg, black 0%, rgba(0,0,0,0.72) 54%, transparent 100%);
  }

  .achievement-shell {
    position: relative;
    z-index: 2;
    max-width: 1260px;
    margin: 0 auto;
    padding: 100px 24px 120px calc(112px + 24px);
  }

  .achievement-hero {
    max-width: 780px;
    margin: 0 auto 72px;
    text-align: center;
    min-height: 72vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .achievement-kicker {
    display: block;
    margin-bottom: 20px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    color: rgba(34,211,238,0.72);
  }

  .light .achievement-kicker { color: #087ea4; }

  .achievement-title {
    margin: 0 0 22px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(44px, 8vw, 92px);
    font-weight: 700;
    line-height: 0.96;
  }

  .achievement-title span {
    display: inline-block;
    background-image: linear-gradient(135deg, #eafaff 0%, #22d3ee 34%, #60a5fa 72%, #a78bfa 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  .light .achievement-title span {
    background-image: linear-gradient(135deg, #111827 0%, #0f172a 36%, #0891b2 68%, #4f46e5 100%);
  }

  .achievement-subtitle {
    max-width: 560px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.8;
    color: rgba(148,163,184,0.76);
  }

  .light .achievement-subtitle { color: #475569; }

  .achievement-scroll-hint {
    margin-top: 40px;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(148,163,184,0.45);
    animation: ach-hint 2.4s ease-in-out infinite;
  }

  @keyframes ach-hint {
    0%, 100% { transform: translateY(0); opacity: 0.45; }
    50% { transform: translateY(5px); opacity: 0.9; }
  }

  /* Vertical timeline sidebar */
  .year-timeline {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 108px;
    z-index: 60;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .year-timeline::-webkit-scrollbar { display: none; }

  .year-timeline-track {
    position: absolute;
    left: 50%;
    top: 24px;
    bottom: 24px;
    width: 2px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, transparent, rgba(34,211,238,0.22) 12%, rgba(34,211,238,0.22) 88%, transparent);
    border-radius: 2px;
    pointer-events: none;
  }

  .light .year-timeline-track {
    background: linear-gradient(180deg, transparent, rgba(14,165,233,0.28) 12%, rgba(14,165,233,0.28) 88%, transparent);
  }

  .year-timeline-progress {
    position: absolute;
    left: 50%;
    top: 24px;
    width: 2px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, #22d3ee, #60a5fa);
    border-radius: 2px;
    box-shadow: 0 0 12px rgba(34,211,238,0.55);
    pointer-events: none;
    transition: height 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .light .year-timeline-progress {
    background: linear-gradient(180deg, #0284c7, #0891b2);
    box-shadow: 0 0 10px rgba(14,165,233,0.4);
  }

  .year-timeline-item {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 9px 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: rgba(148,163,184,0.48);
    transition: color 0.25s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .year-timeline-item::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0.85);
    background: rgba(34,211,238,0.35);
    border: 2px solid rgba(34,211,238,0.2);
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  }

  .year-timeline-item:hover {
    color: rgba(34,211,238,0.85);
    transform: scale(1.04);
  }

  .year-timeline-item:hover::before {
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 0 14px rgba(34,211,238,0.45);
  }

  .year-timeline-item.active {
    color: #22d3ee;
    transform: scale(1.08);
    font-weight: 700;
  }

  .year-timeline-item.active::before {
    transform: translate(-50%, -50%) scale(1.35);
    background: #22d3ee;
    border-color: rgba(34,211,238,0.5);
    box-shadow: 0 0 18px rgba(34,211,238,0.75);
  }

  .year-timeline-item.active::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 22px;
    transform: translateY(-50%);
    background: linear-gradient(180deg, transparent, #22d3ee, transparent);
    border-radius: 0 2px 2px 0;
    box-shadow: 0 0 12px rgba(34,211,238,0.6);
  }

  .year-timeline-item .year-label {
    position: relative;
    z-index: 2;
    padding-left: 22px;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  .light .year-timeline-item { color: rgba(100,116,139,0.65); }
  .light .year-timeline-item:hover { color: #0284c7; }
  .light .year-timeline-item.active { color: #0284c7; }
  .light .year-timeline-item.active::before {
    background: #0284c7;
    box-shadow: 0 0 16px rgba(14,165,233,0.55);
  }
  .light .year-timeline-item.active::after {
    background: linear-gradient(180deg, transparent, #0284c7, transparent);
  }

  .year-section {
    scroll-margin-top: 96px;
    padding-bottom: 6vh;
  }

  .year-heading {
    position: sticky;
    top: 88px;
    z-index: 8;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 24px;
    align-items: end;
    margin-bottom: 28px;
    padding-bottom: 12px;
    pointer-events: none;
  }

  .year-heading strong {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(44px, 6vw, 82px);
    font-weight: 700;
    line-height: 0.86;
    letter-spacing: -0.025em;
    color: rgba(248,250,252,0.94);
  }

  .light .year-heading strong { color: #0f172a; }

  .year-heading span {
    display: block;
    max-width: 600px;
    padding-bottom: 6px;
    font-size: 15px;
    line-height: 1.75;
    color: rgba(148,163,184,0.74);
  }

  .light .year-heading span { color: #52637a; }

  .cards-stack { position: relative; }

  .card-stack-item {
    position: relative;
    min-height: clamp(520px, 90vh, 800px);
    pointer-events: none;
  }

  .card-stack-item:last-child {
    min-height: clamp(460px, 76vh, 700px);
    margin-bottom: 6vh;
  }

  .achievement-card {
    position: sticky;
    top: var(--stack-top, 88px);
    width: 100%;
    display: grid;
    grid-template-columns: minmax(260px, 42%) minmax(0, 1fr);
    min-height: clamp(380px, 50vh, 480px);
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid rgba(148,163,184,0.16);
    background: rgba(3,8,18,0.94);
    box-shadow: 0 30px 90px rgba(0,0,0,0.38);
    transform-origin: center top;
    transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform, opacity;
    pointer-events: auto;
    backface-visibility: hidden;
  }

  .light .achievement-card {
    background: rgba(255,255,255,0.95);
    border-color: rgba(14,165,233,0.18);
    box-shadow: 0 24px 70px rgba(15,23,42,0.1);
  }

  .card-photo {
    position: relative;
    min-height: 100%;
    background: #0f172a;
    overflow: hidden;
  }

  .card-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(0.14) contrast(1.04) saturate(0.92);
  }

  .card-photo::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 42%, rgba(3,8,18,0.88));
  }

  .light .card-photo::after {
    background: linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.86));
  }

  .card-body {
    padding: clamp(28px, 4vw, 52px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card-eyebrow {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 18px;
    margin-bottom: 18px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(34,211,238,0.78);
  }

  .light .card-eyebrow { color: #087ea4; }

  .card-title {
    margin: 0 0 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(26px, 4vw, 44px);
    font-weight: 700;
    line-height: 1.02;
    color: #f8fafc;
  }

  .light .card-title { color: #0f172a; }

  .card-subtitle {
    margin: 0 0 20px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(226,232,240,0.74);
  }

  .light .card-subtitle { color: #334155; }

  .card-description {
    max-width: 640px;
    margin: 0;
    font-size: 15px;
    line-height: 1.82;
    color: rgba(148,163,184,0.84);
  }

  .light .card-description { color: #475569; }

  .card-details {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(148,163,184,0.16);
    font-size: 13px;
    color: rgba(203,213,225,0.74);
  }

  .light .card-details {
    border-top-color: rgba(15,23,42,0.1);
    color: #64748b;
  }

  @media (max-width: 920px) {
    .achievement-shell { padding: 88px 16px 80px; }

    .year-timeline {
      position: sticky;
      top: 72px;
      left: auto;
      transform: none;
      width: 100%;
      max-height: none;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 10px 12px;
      margin-bottom: 24px;
      background: rgba(1,9,18,0.88);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(34,211,238,0.15);
      border-radius: 0 0 12px 12px;
    }

    .light .year-timeline {
      background: rgba(248,252,255,0.9);
      border-bottom-color: rgba(14,165,233,0.18);
    }

    .year-timeline-track,
    .year-timeline-progress { display: none; }

    .year-timeline-item {
      flex-shrink: 0;
      width: auto;
      min-width: 52px;
      padding: 8px 14px;
    }

    .year-timeline-item::before,
    .year-timeline-item.active::after { display: none; }

    .year-timeline-item .year-label {
      writing-mode: horizontal-tb;
      padding-left: 0;
    }

    .year-heading {
      position: relative;
      top: auto;
      display: block;
    }

    .year-heading strong { display: block; margin-bottom: 10px; }

    .card-stack-item,
    .card-stack-item:last-child {
      min-height: auto;
      margin-bottom: 0;
    }

    .achievement-card {
      position: relative;
      top: auto;
      grid-template-columns: 1fr;
      min-height: auto;
      margin-bottom: 18px;
      transform: none !important;
      opacity: 1 !important;
    }

    .card-photo { min-height: 220px; }
    .card-photo::after {
      background: linear-gradient(180deg, transparent 45%, rgba(3,8,18,0.78));
    }
    .light .card-photo::after {
      background: linear-gradient(180deg, transparent 45%, rgba(255,255,255,0.74));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .achievement-card,
    .year-timeline-item,
    .year-timeline-progress { transition: none; }
    .achievement-scroll-hint { animation: none; }
  }
`;

const storyData = {
  '2017': {
    summary: 'The forum begins as a small student-led robotics circle with a serious appetite for building.',
    cards: [
      {
        rank: 'Foundation',
        date: '2017',
        title: 'Genesis of RTF',
        subtitle: 'The first chapter of the Robo-Tech Forum',
        description:
          'A small group of students at GCoEA Amravati began shaping a robotics culture around curiosity, practical skill, and the belief that machines are best learned by building them.',
        venue: 'GCoEA Amravati',
        team: 'Founding Members',
        image: roboconTeamPhoto,
      },
      {
        rank: 'First Lab Notes',
        date: 'Late 2017',
        title: 'Workshop Table Experiments',
        subtitle: 'Early prototypes, rough sketches, and patient debugging',
        description:
          'The team started documenting motor behavior, chassis balance, wiring discipline, and small failures that later became the backbone of stronger competition builds.',
        venue: 'Club Workspace',
        team: 'Student Builders',
        image: lineFollowerRobots,
      },
    ],
  },
  '2018': {
    summary: 'The club moves from enthusiasm to structure with workshops, small robots, and repeatable build practices.',
    cards: [
      {
        rank: 'Training Year',
        date: 'February 2018',
        title: 'Intro Robotics Workshops',
        subtitle: 'A cleaner path for new members to start building',
        description:
          'Members were introduced to sensors, microcontrollers, soldering, drivetrain basics, and test routines so the club could grow beyond a handful of experienced students.',
        venue: 'Department Lab',
        team: 'Training Batch',
        image: iitIndoreTeam,
      },
      {
        rank: 'Prototype Sprint',
        date: 'September 2018',
        title: 'First Line Follower Builds',
        subtitle: 'Small robots used to learn precision control',
        description:
          'The team built compact line followers to understand sensor alignment, speed tuning, and track behavior under changing light and surface conditions.',
        venue: 'RTF Lab',
        team: 'Beginner Teams',
        image: lineFollowerRobots,
      },
    ],
  },
  '2019': {
    summary: 'RTF starts working with stronger review habits, clearer roles, and more ambitious competition preparation.',
    cards: [
      {
        rank: 'Competition Prep',
        date: 'March 2019',
        title: 'Mechanism Review Sessions',
        subtitle: 'Designs were tested before fabrication decisions',
        description:
          'Students compared chassis layouts, lifting concepts, gearing choices, and assembly constraints, learning to defend design choices with measurements instead of guesses.',
        venue: 'Mechanical Lab',
        team: 'Design Team',
        image: gecaLineFollower,
      },
      {
        rank: 'Campus Showcase',
        date: 'December 2019',
        title: 'Robotics Demonstration Day',
        subtitle: 'A public display of working student machines',
        description:
          'Working prototypes were presented to juniors and faculty, giving members a chance to explain systems clearly and collect feedback before the next technical season.',
        venue: 'GCoEA Campus',
        team: 'Project Groups',
        image: roboconTeamPhoto,
      },
    ],
  },
  '2020': {
    summary: 'A difficult year shifts the club toward documentation, simulation, and remote collaboration.',
    cards: [
      {
        rank: 'Remote Design',
        date: 'June 2020',
        title: 'CAD and Simulation Practice',
        subtitle: 'Design work continued even when lab access was limited',
        description:
          'The team used remote reviews to continue CAD modeling, mechanism explanation, and simulation planning, keeping technical momentum alive during an interrupted year.',
        venue: 'Online Review',
        team: 'Design Members',
        image: iitIndoreTeam,
      },
      {
        rank: 'Documentation',
        date: 'October 2020',
        title: 'Build Knowledge Archive',
        subtitle: 'Lessons were preserved for future teams',
        description:
          'Members collected notes on components, mistakes, wiring, and code patterns so future batches could move faster instead of relearning the same basics from scratch.',
        venue: 'Remote Collaboration',
        team: 'Core Members',
        image: carvaanTrophy,
      },
    ],
  },
  '2021': {
    summary: 'The club rebuilds hands-on rhythm through bench testing, small systems, and renewed member training.',
    cards: [
      {
        rank: 'Restart Season',
        date: 'January 2021',
        title: 'Sensor Bench Testing',
        subtitle: 'Reliability checks before full robot assembly',
        description:
          'Members tested sensor response, noise behavior, power delivery, and calibration methods to make later robot builds more stable under competition pressure.',
        venue: 'Electronics Lab',
        team: 'Controls Group',
        image: lineFollowerRobots,
      },
      {
        rank: 'Build Culture',
        date: 'August 2021',
        title: 'Clean Wiring Initiative',
        subtitle: 'A practical push toward maintainable machines',
        description:
          'The team emphasized serviceable wiring, labeled connections, cleaner harnesses, and fast debugging access, turning small habits into a real competitive advantage.',
        venue: 'RTF Lab',
        team: 'Hardware Team',
        image: gecaLineFollower,
      },
    ],
  },
  '2022': {
    summary: 'RTF strengthens the bridge between mechanical design, embedded code, and repeatable testing.',
    cards: [
      {
        rank: 'Systems Work',
        date: 'April 2022',
        title: 'Integrated Robot Trials',
        subtitle: 'Mechanical and software teams tested together',
        description:
          'Rather than treating code and hardware as separate tracks, members began testing complete systems earlier, improving coordination between fabrication and controls.',
        venue: 'Club Workspace',
        team: 'Integrated Team',
        image: roboconTeamPhoto,
      },
      {
        rank: 'Member Growth',
        date: 'November 2022',
        title: 'Junior Project Reviews',
        subtitle: 'Younger members learned through critique',
        description:
          'Junior teams presented working concepts and failure reports, building confidence while learning how senior members evaluate design tradeoffs.',
        venue: 'Department Lab',
        team: 'Junior Teams',
        image: iitIndoreTeam,
      },
    ],
  },
  '2023': {
    summary: 'A year of rebuilding momentum through compact robots, better testing loops, and practical experimentation.',
    cards: [
      {
        rank: 'Applied Learning',
        date: 'July 2023',
        title: 'Mini Bot Development',
        subtitle: 'Small machines used for fast iteration',
        description:
          'Small-format robots helped members understand drivetrain balance, soldering discipline, sensor debugging, and controller behavior without waiting for full competition timelines.',
        venue: 'RTF Lab',
        team: 'Student Teams',
        image: carvaanTrophy,
      },
      {
        rank: 'Process Upgrade',
        date: 'December 2023',
        title: 'Failure Report Reviews',
        subtitle: 'A stronger habit of learning from mistakes',
        description:
          'The club began treating failed runs as useful evidence, documenting what broke, why it broke, and which change actually improved the next test.',
        venue: 'Review Room',
        team: 'Project Leads',
        image: gecaLineFollower,
      },
    ],
  },
  '2024': {
    summary: 'A foundation-building season for training, internal reviews, and clearer ownership of technical work.',
    cards: [
      {
        rank: 'Team Build',
        date: 'April 2024',
        title: 'Robotics Training Track',
        subtitle: 'Structured learning for new members',
        description:
          'The club introduced focused tracks for CAD, embedded programming, sensors, drivetrain assembly, and project documentation so members could contribute with more confidence.',
        venue: 'Club Workspace',
        team: 'Training Batch',
        image: roboconTeamPhoto,
      },
      {
        rank: 'Internal Showcase',
        date: 'December 2024',
        title: 'Project Review Day',
        subtitle: 'Working prototypes and honest feedback',
        description:
          'Teams presented prototypes, design notes, and failure reports, creating a stronger review culture before entering larger national competitions.',
        venue: 'Department Lab',
        team: 'Project Groups',
        image: lineFollowerRobots,
      },
    ],
  },
  '2025': {
    summary: 'A preparation year focused on testing discipline, documentation, and reliable competition systems.',
    cards: [
      {
        rank: 'Prototype Cycle',
        date: 'August 2025',
        title: 'Autonomous Navigation Trials',
        subtitle: 'Repeatable path correction under test conditions',
        description:
          'A compact test platform was used to validate sensor placement, turning behavior, and repeatable path correction before larger competition builds moved into fabrication.',
        venue: 'RTF Lab',
        team: 'Core Development Team',
        image: lineFollowerRobots,
      },
      {
        rank: 'Workshop Series',
        date: 'November 2025',
        title: 'Controls and Fabrication Sprint',
        subtitle: 'Better build quality before competition season',
        description:
          'Members worked through mechanical tolerances, wiring discipline, motor selection, and software review sessions to improve the quality of final competition robots.',
        venue: 'GCoEA Amravati',
        team: 'Junior and Senior Members',
        image: iitIndoreTeam,
      },
    ],
  },
  '2026': {
    summary: 'A year of national stages, repeated first-place finishes, and strong autonomous robotics work.',
    cards: [
      {
        rank: 'Joint AIR-1',
        date: 'March 2026',
        title: 'DD Robocon 2026',
        subtitle: 'Stage 1 national design submission',
        description:
          'The team earned Joint AIR-1 with a complete robot design package for Kung Fu Quest, covering coordinated manual and autonomous robots, CAD models, simulation logic, collection mechanisms, and arena strategy.',
        venue: 'National Level',
        team: '30+ Members',
        image: roboconTeamPhoto,
      },
      {
        rank: 'Triple AIR-1',
        date: 'March 2026',
        title: 'IIT Indore Ingenium',
        subtitle: 'Three event wins at one technical festival',
        description:
          'RTF teams swept Aero Artistry, CV Obstacle Course, and Robo Soccer through disciplined testing, strong mechanical decisions, and reliable control systems across different event formats.',
        venue: 'IIT Indore',
        team: '25 Members',
        image: iitIndoreTeam,
      },
      {
        rank: 'AIR-1',
        date: 'March 2026',
        title: 'SGGSIET Nanded Rmaggedon',
        subtitle: 'Line follower national title',
        description:
          'A precision-focused line follower build secured first place through stable sensing, smooth speed control, and repeated practice runs under competitive track conditions.',
        venue: 'SGGSIET Nanded',
        team: '18 Members',
        image: lineFollowerRobots,
      },
      {
        rank: 'AIR-1 and AIR-2',
        date: 'March 2026',
        title: 'GECA Sambhajinagar Wings',
        subtitle: 'Two podium positions in one event',
        description:
          'Two RTF teams finished first and second in the line follower competition, showing depth across the club rather than a single successful build.',
        venue: 'GECA Sambhajinagar',
        team: '20 Members',
        image: gecaLineFollower,
      },
      {
        rank: 'AIR-1 and AIR-2',
        date: 'March 2026',
        title: 'GCOE Jalgaon CARVAAN',
        subtitle: 'Another complete line follower sweep',
        description:
          'The team repeated its dominance with first and second place finishes, closing a remarkable month of consistent national-level performance.',
        venue: 'GCOE Jalgaon',
        team: '20 Members',
        image: carvaanTrophy,
      },
    ],
  },
};

const yearGroups = YEARS_DESC.map((year) => ({ year, ...storyData[year] }));

function updateStackCardVisuals() {
  document.querySelectorAll('[data-stack-card]').forEach((el) => {
    const stickyTop = Number(el.dataset.stickyTop) || STACK_TOP_BASE;
    const baseScale = Number(el.dataset.baseScale) || 1;
    const runway = el.parentElement;
    if (!runway) return;

    const cardRect = el.getBoundingClientRect();
    const parentRect = runway.getBoundingClientRect();
    const isStuck = cardRect.top <= stickyTop + 2 && parentRect.bottom > stickyTop + 60;
    const scrollRunway = parentRect.height - cardRect.height;
    const scrolled = stickyTop - parentRect.top;
    const progress = scrollRunway > 0 ? Math.min(1, Math.max(0, scrolled / scrollRunway)) : 0;

    if (isStuck && progress > 0.04) {
      const covered = Math.min(1, progress * 1.1);
      el.style.transform = `scale(${Math.max(0.9, baseScale - covered * 0.07)})`;
      el.style.opacity = String(Math.max(0.78, 1 - covered * 0.22));
      return;
    }

    el.style.transform = `scale(${baseScale})`;
    el.style.opacity = '1';
  });
}

function useDetectedLightMode(lightMode) {
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
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const storedTheme = [
      window.localStorage.getItem('theme'),
      window.localStorage.getItem('color-theme'),
      window.localStorage.getItem('mode'),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (themeText.includes('light') || storedTheme.includes('light')) return true;
    if (themeText.includes('dark') || storedTheme.includes('dark')) return false;

    return window.matchMedia?.('(prefers-color-scheme: light)').matches ?? false;
  }, []);

  useEffect(() => {
    const syncMode = () => setDetectedLightMode(readLightMode());
    syncMode();

    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const observer = new MutationObserver(syncMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'data-mode'],
    });
    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-mode'],
      });
    }

    window.addEventListener('storage', syncMode);
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', syncMode);
    };
  }, [readLightMode]);

  return typeof lightMode === 'boolean' ? lightMode : detectedLightMode;
}

function StickyAchievementCard({ card, index, totalCards }) {
  const stickyTop = STACK_TOP_BASE + index * STACK_TOP_STEP;
  const baseScale = 1 - index * 0.018;

  return (
    <div className="card-stack-item">
      <article
        data-stack-card
        data-sticky-top={stickyTop}
        data-base-scale={baseScale}
        className="achievement-card"
        style={{
          '--stack-top': `${stickyTop}px`,
          zIndex: index + 1,
          transform: `scale(${baseScale})`,
        }}
      >
        <div className="card-photo">
          <img src={card.image} alt={card.title} loading="lazy" decoding="async" />
        </div>
        <div className="card-body">
          <div className="card-eyebrow">
            <span>{card.rank}</span>
            <span>{card.date}</span>
          </div>
          <h3 className="card-title">{card.title}</h3>
          <p className="card-subtitle">{card.subtitle}</p>
          <p className="card-description">{card.description}</p>
          <div className="card-details">
            <span>{card.venue}</span>
            <span>{card.team}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

const YearTimelineSidebar = forwardRef(function YearTimelineSidebar(
  { years, activeYear, progressPct, onSelectYear },
  ref,
) {
  return (
    <nav ref={ref} className="year-timeline" aria-label="Achievement years">
      <div className="year-timeline-track" aria-hidden="true" />
      <div className="year-timeline-progress" style={{ height: `${progressPct}%` }} aria-hidden="true" />
      {years.map((year) => (
        <button
          key={year}
          type="button"
          className={`year-timeline-item${activeYear === year ? ' active' : ''}`}
          onClick={() => onSelectYear(year)}
          title={year}
        >
          <span className="year-label">{year}</span>
        </button>
      ))}
    </nav>
  );
});

export default function Achievement({ lightMode }) {
  const { year: yearParam } = useParams();
  const isLight = useDetectedLightMode(lightMode);
  const [activeYear, setActiveYear] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const sectionRefs = useRef({});
  const scrollIntentRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateStackCardVisuals);
    };

    updateStackCardVisuals();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!yearParam || !storyData[yearParam]) return;

    const frame = requestAnimationFrame(() => {
      sectionRefs.current[yearParam]?.scrollIntoView({ behavior: 'auto', block: 'start' });
      setActiveYear(yearParam);
    });

    return () => cancelAnimationFrame(frame);
  }, [yearParam]);

  useEffect(() => {
    let rafId = 0;

    const pickActiveYear = () => {
      const anchor = window.innerHeight * 0.36;
      const landing = document.getElementById('achievement-landing');

      if (landing) {
        const landingRect = landing.getBoundingClientRect();
        if (landingRect.bottom > anchor + 24) {
          setActiveYear((prev) => (prev === null ? prev : null));
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const pct = maxScroll > 0 ? Math.min(6, (window.scrollY / maxScroll) * 6) : 0;
          setTimelineProgress((prev) => (Math.abs(prev - pct) < 0.5 ? prev : pct));
          return;
        }
      }

      let matchedYear = YEARS_DESC[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const year of YEARS_DESC) {
        const node = sectionRefs.current[year];
        if (!node) continue;

        const rect = node.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom >= anchor) {
          matchedYear = year;
          closestDistance = 0;
          break;
        }

        const distance = Math.min(
          Math.abs(rect.top - anchor),
          Math.abs(rect.bottom - anchor),
          Math.abs(rect.top + rect.height * 0.35 - anchor),
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          matchedYear = year;
        }
      }

      const idx = YEARS_DESC.indexOf(matchedYear);
      const pct = ((idx + 1) / YEARS_DESC.length) * 100;

      setActiveYear((prev) => (prev === matchedYear ? prev : matchedYear));
      setTimelineProgress((prev) => (Math.abs(prev - pct) < 0.5 ? prev : pct));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(pickActiveYear);
    };

    pickActiveYear();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const intent = scrollIntentRef.current;
    if (!intent) return;
    scrollIntentRef.current = null;

    sectionRefs.current[intent]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const registerSection = useCallback((year, node) => {
    if (node) sectionRefs.current[year] = node;
  }, []);

  const scrollToYear = useCallback((year) => {
    scrollIntentRef.current = year;
    setActiveYear(year);
    sectionRefs.current[year]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <main className={`achievement-page ${isLight ? 'light' : 'dark'}`}>
        <YearTimelineSidebar
          ref={sidebarRef}
          years={YEARS_DESC}
          activeYear={activeYear}
          progressPct={timelineProgress}
          onSelectYear={scrollToYear}
        />

        <div className="achievement-shell">
          <header id="achievement-landing" className="achievement-hero">
            <motion.span
              className="achievement-kicker"
              initial={{ opacity: 0, letterSpacing: '0.55em' }}
              animate={{ opacity: 1, letterSpacing: '0.42em' }}
              transition={{ duration: 0.8 }}
            >
              Hall of Fame
            </motion.span>
            <motion.h1
              className="achievement-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>Achievements</span>
            </motion.h1>
            <p className="achievement-subtitle">
              Scroll through every year — stacked cards reveal each milestone as you move forward or backward.
            </p>
            <p className="achievement-scroll-hint" aria-hidden="true">
              Scroll to explore
            </p>
          </header>

          {yearGroups.map((group) => (
            <section
              key={group.year}
              id={`year-${group.year}`}
              data-year={group.year}
              className="year-section"
              ref={(node) => registerSection(group.year, node)}
              aria-labelledby={`year-heading-${group.year}`}
            >
              <div className="year-heading">
                <strong id={`year-heading-${group.year}`}>{group.year}</strong>
                <span>{group.summary}</span>
              </div>
              <div className="cards-stack">
                {group.cards.map((card, index) => (
                  <StickyAchievementCard
                    key={`${group.year}-${card.title}`}
                    card={card}
                    index={index}
                    totalCards={group.cards.length}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
