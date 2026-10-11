import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

import roboconTeamPhoto from '../assets/img/robocon2026Result.png';
import iitIndoreTeam from '../assets/achievements/iit_indore_team.png';
import lineFollowerRobots from '../assets/achievements/line_follower_robots.png';
import gecaLineFollower from '../assets/achievements/geca_line_follower.png';
import carvaanTrophy from '../assets/achievements/carvaan_trophy.png';

const YEARS_DESC = ['2026', '2014'];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  /* Keep achievement layout styling, but do NOT override the global animated background. */
  .achievement-page {
    min-height: 100vh;
    position: relative;
    overflow-x: clip;
    background: transparent;
    color: inherit;
    font-family: inherit;
  }






  .achievement-shell {
    position: relative;
    z-index: 2;
    max-width: 1660px;
    margin: 0 auto;
    padding: 92px 34px 120px 112px;
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
    color: rgba(255,32,32,0.72);
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
    background-image: linear-gradient(135deg, #ffcccc 0%, #FF2020 34%, #CC0000 72%, #8B0000 100%);
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
    background: linear-gradient(180deg, transparent, rgba(255,32,32,0.22) 12%, rgba(255,32,32,0.22) 88%, transparent);
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
    background: linear-gradient(180deg, #FF2020, #CC0000);
    border-radius: 2px;
    box-shadow: 0 0 12px rgba(255,32,32,0.55);
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
    background: rgba(34, 211, 238, 0.2); /* Muted, low-opacity matching cyan */
    border: 2px solid rgba(34, 211, 238, 0.1);
    transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
    flex-shrink: 0;
  }
  
  /* ONLY active items pulse and have colorful backgrounds */
  .vtl-item.active .vtl-dot {
    background: rgba(34,211,238,0.75);
    border: 2px solid rgba(34,211,238,0.25);
    box-shadow: 0 0 8px rgba(34,211,238,0.35);
    animation: tlDotPulse 2.5s ease-in-out infinite;
  }
  .vtl-item.active .vtl-dot-gold {
    background: rgba(251,191,36,0.9);
    border-color: rgba(251,191,36,0.35);
    box-shadow: 0 0 12px rgba(251,191,36,0.45);
    animation: tlDotPulseGold 2s ease-in-out infinite;
  }
  .vtl-item:hover .vtl-dot,
  .vtl-item.active .vtl-dot {
    transform: scale(1.6);
  }
  .vtl-item:hover .vtl-dot-gold,
  .vtl-item.active .vtl-dot-gold {
    transform: scale(1.6);
  }
  .vtl-label {
    display: flex;
    flex-direction: column;
    gap: 1px;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.2s, transform 0.2s;
    pointer-events: none;
    transform: translate(-50%, -50%) scale(0.85);
    background: rgba(255,32,32,0.35);
    border: 2px solid rgba(255,32,32,0.2);
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  }

  .year-timeline-item:hover {
    color: rgba(255,32,32,0.85);
    transform: scale(1.04);
  }

  .year-timeline-item:hover::before {
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 0 14px rgba(255,32,32,0.45);
  }

  .year-timeline-item.active {
    color: #FF2020;
    transform: scale(1.08);
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
    background: rgba(14, 165, 233, 0.25); /* Muted, light mode sky blue */
  }
  .light .vtl-item.active .vtl-dot {
    background: rgba(14,165,233,0.85);
    border-color: rgba(14,165,233,0.3);
    box-shadow: 0 0 8px rgba(14,165,233,0.35);
    animation: tlDotPulseLight 2.5s ease-in-out infinite;
  }
  .light .vtl-item.active .vtl-dot-gold {
    background: rgba(251,191,36,0.9);
    border-color: rgba(251,191,36,0.35);
    box-shadow: 0 0 12px rgba(251,191,36,0.45);
    animation: tlDotPulseGoldLight 2s ease-in-out infinite;
  }
  .light .vtl-item.active .vtl-dot {
    box-shadow: 0 0 16px rgba(14,165,233,0.75);
  }
  .light .vtl-item.active .vtl-dot-gold {
    box-shadow: 0 0 20px rgba(251,191,36,0.85);
  }
  .light .vtl-year { color: #0369a1; }
  .light .vtl-title-text { color: #334155; }

  /* Tooltip box */
  .vtl-tooltip {
  }

  .year-timeline-item.active::before {
    transform: translate(-50%, -50%) scale(1.35);
    background: #FF2020;
    border-color: rgba(255,32,32,0.5);
    box-shadow: 0 0 18px rgba(255,32,32,0.75);
  }

  .year-timeline-item.active::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 22px;
    transform: translateY(-50%);
    background: linear-gradient(180deg, transparent, #FF2020, transparent);
    border-radius: 0 2px 2px 0;
    box-shadow: 0 0 12px rgba(255,32,32,0.6);
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

  .spotlight-section {
    position: relative;
    min-height: calc(var(--card-count, 1) * 100vh);
    scroll-margin-top: 0;
  }

  .spotlight-stage {
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: minmax(210px, 0.25fr) minmax(0, 1fr);
    gap: clamp(18px, 2.8vw, 42px);
    align-items: center;
    min-height: 100vh;
    padding: 5vh 0;
  }

  .spotlight-year {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-self: center;
  }

  .spotlight-year strong {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(58px, 9vw, 132px);
    font-weight: 700;
    line-height: 0.82;
    letter-spacing: -0.04em;
    color: #FF2020;
  }

  .light .spotlight-year strong { color: #0f172a; }

  .spotlight-year span {
    display: block;
    max-width: 300px;
    font-size: 16px;
    line-height: 1.75;
    color: rgba(248,250,252,0.86);
  }

  .light .spotlight-year span { color: #52637a; }

  .spotlight-progress {
    display: flex;
    gap: 7px;
    margin-top: 4px;
  }

  .spotlight-progress-dot {
    width: 28px;
    height: 3px;
    border-radius: 99px;
    background: rgba(148,163,184,0.22);
    transition: background 0.28s ease, width 0.28s ease;
  }

  .spotlight-progress-dot.active {
    width: 44px;
    background: #FF2020;
    box-shadow: 0 0 16px rgba(255,32,32,0.42);
  }

  .light .spotlight-progress-dot { background: rgba(15,23,42,0.14); }
  .light .spotlight-progress-dot.active {
    background: #0284c7;
    box-shadow: 0 0 14px rgba(14,165,233,0.26);
  }

  .spotlight-card-frame {
    position: relative;
    min-height: clamp(520px, 72vh, 720px);
  }

  .achievement-card {
    position: absolute;
    inset: 50% 0 auto 0;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(360px, 52%) minmax(360px, 48%);
    min-height: clamp(500px, 68vh, 700px);
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid rgba(255,32,32,0.18);
    background: linear-gradient(135deg, rgba(10,0,0,0.96) 0%, rgba(3,3,3,0.97) 100%);
    box-shadow: 0 30px 90px rgba(0,0,0,0.5), 0 0 60px rgba(255,32,32,0.06);
    transform: translateY(calc(-50% + var(--card-y, 32px))) scale(var(--card-scale, 0.94));
    opacity: var(--card-opacity, 0);
    visibility: var(--card-visibility, hidden);
    transform-origin: center center;
    transition:
      opacity 0.36s ease,
      visibility 0.36s ease,
      transform 0.52s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform, opacity;
    pointer-events: none;
    backface-visibility: hidden;
    cursor: zoom-in;
  }

  .achievement-card.is-active {
    pointer-events: auto;
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
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease;
  }

  .achievement-card.is-active:hover .card-photo img {
    transform: scale(1.035);
    filter: grayscale(0.04) contrast(1.06) saturate(1.02);
  }

  .card-photo::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(255,32,32,0.06) 0%, transparent 42%, rgba(5,0,0,0.92));
  }

  .light .card-photo::after {
    background: linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.86));
  }

  .card-body {
    padding: clamp(34px, 4.5vw, 68px);
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
    color: rgba(255,32,32,0.78);
  }

  .light .card-eyebrow { color: #087ea4; }

  .card-title {
    margin: 0 0 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(34px, 4.6vw, 64px);
    font-weight: 700;
    line-height: 1.02;
    color: #f8fafc;
  }

  .light .card-title { color: #0f172a; }

  .card-subtitle {
    margin: 0 0 20px;
    font-size: 18px;
    font-weight: 600;
    color: rgba(226,232,240,0.74);
  }

  .light .card-subtitle { color: #334155; }

  .card-description {
    max-width: 720px;
    margin: 0;
    font-size: 16px;
    line-height: 1.86;
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

  .achievement-dialog-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(18px, 4vw, 48px);
    background: rgba(0,0,0,0.78);
    backdrop-filter: blur(16px);
  }

  .achievement-dialog {
    position: relative;
    width: min(1480px, 96vw);
    max-height: 92vh;
    display: grid;
    grid-template-columns: minmax(0, 1.28fr) minmax(340px, 0.72fr);
    overflow: hidden;
    border: 1px solid rgba(255,32,32,0.24);
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(10,0,0,0.98) 0%, rgba(3,3,3,0.98) 100%);
    box-shadow: 0 40px 120px rgba(0,0,0,0.72), 0 0 70px rgba(255,32,32,0.1);
  }

  .light .achievement-dialog {
    border-color: rgba(14,165,233,0.24);
    background: rgba(255,255,255,0.98);
    box-shadow: 0 40px 120px rgba(15,23,42,0.24);
  }

  .achievement-dialog-media {
    min-height: min(76vh, 760px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(14px, 2vw, 28px);
    background:
      radial-gradient(circle at 50% 45%, rgba(255,32,32,0.12), transparent 62%),
      #050505;
  }

  .light .achievement-dialog-media {
    background:
      radial-gradient(circle at 50% 45%, rgba(14,165,233,0.12), transparent 62%),
      #f8fbff;
  }

  .achievement-dialog-media img {
    width: 100%;
    height: 100%;
    max-height: 78vh;
    object-fit: contain;
    border-radius: 14px;
  }

  .achievement-dialog-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(28px, 4vw, 62px);
  }

  .achievement-dialog-close {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 2;
    border: 1px solid rgba(255,32,32,0.28);
    border-radius: 999px;
    padding: 9px 14px;
    color: #f8fafc;
    background: rgba(10,0,0,0.72);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .light .achievement-dialog-close {
    color: #0f172a;
    background: rgba(255,255,255,0.88);
    border-color: rgba(14,165,233,0.24);
  }

  .achievement-dialog-kicker {
    margin: 0 0 18px;
    color: #FF2020;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .light .achievement-dialog-kicker { color: #0284c7; }

  .achievement-dialog-title {
    margin: 0 0 12px;
    color: #f8fafc;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(34px, 4vw, 62px);
    line-height: 1.02;
  }

  .light .achievement-dialog-title { color: #0f172a; }

  .achievement-dialog-subtitle {
    margin: 0 0 22px;
    color: rgba(226,232,240,0.78);
    font-size: 18px;
    font-weight: 700;
  }

  .light .achievement-dialog-subtitle { color: #334155; }

  .achievement-dialog-description {
    margin: 0;
    color: rgba(203,213,225,0.84);
    font-size: 16px;
    line-height: 1.85;
  }

  .light .achievement-dialog-description { color: #475569; }

  .achievement-dialog-details {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 28px;
    padding-top: 22px;
    border-top: 1px solid rgba(148,163,184,0.16);
    color: rgba(203,213,225,0.76);
    font-size: 13px;
  }

  .light .achievement-dialog-details {
    color: #64748b;
    border-top-color: rgba(15,23,42,0.1);
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
      border-bottom: 1px solid rgba(255,32,32,0.15);
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

    .spotlight-section {
      min-height: auto !important;
      margin-bottom: 34px;
    }

    .spotlight-stage {
      position: relative;
      top: auto;
      display: block;
      min-height: auto;
      padding: 0;
    }

    .spotlight-year {
      margin-bottom: 18px;
      padding: 14px 16px;
      border-radius: 18px;
      background: rgba(10,10,10,0.88);
      backdrop-filter: blur(10px);
    }

    .light .spotlight-year {
      background: rgba(248,252,255,0.92);
    }

    .spotlight-year strong {
      display: block;
      margin-bottom: 8px;
      font-size: clamp(44px, 18vw, 72px);
      letter-spacing: -0.025em;
    }

    .spotlight-year span {
      max-width: none;
      font-size: 15px;
    }

    .spotlight-progress { display: none; }

    .spotlight-card-frame {
      display: flex;
      flex-direction: column;
      gap: 18px;
      min-height: auto;
    }

    .achievement-card {
      position: relative;
      inset: auto;
      top: auto;
      grid-template-columns: 1fr;
      min-height: auto;
      transform: none !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto;
    }

    .card-photo { min-height: 220px; }
    .card-photo::after {
      background: linear-gradient(180deg, rgba(255,32,32,0.06) 0%, transparent 45%, rgba(5,0,0,0.86));
    }
    .light .card-photo::after {
      background: linear-gradient(180deg, transparent 45%, rgba(255,255,255,0.74));
    }

    .achievement-dialog {
      grid-template-columns: 1fr;
      overflow-y: auto;
    }

          {/* RIGHT: body */}
          <div className="ach-card-body">
            <div style={{
              position: 'absolute', top: 24, right: 28,
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 52, color: item.accent,
              opacity: isLight ? 0.12 : 0.065,
              lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            }}>{cardNum}</div>

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
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* LEFT VERTICAL TIMELINE SIDEBAR */
function VerticalTimeline({ activeIndex, onSelect, isLight, items }) {
  return (
    <div className="vtl-sidebar">
      <div className={isLight ? 'vtl-line light' : 'vtl-line'} />
      {items.map((a, i) => {
        const isActive = activeIndex === i;
        const isGold   = !!a.featured;
        return (
          <div
            key={a.year + a.title + i}
            className={`vtl-item${isActive ? ' active' : ''}${isLight ? ' light' : ''}`}
            onClick={() => onSelect(i)}
          >
            <div className="vtl-dot-wrap">
              <div 
                className={`vtl-dot${isGold ? ' vtl-dot-gold' : ''}`} 
                style={(!isActive && i === 0) ? { 
                  backgroundColor: 'rgba(251, 191, 36, 0.25)', 
                  borderColor: 'rgba(251, 191, 36, 0.15)' 
                } : undefined}
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
    .achievement-dialog-media {
      min-height: 42vh;
    }

    .achievement-dialog-body {
      padding: 24px;
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
  '2026': {
    summary: 'A year of national stages, repeated first-place finishes, and strong autonomous robotics work.',
    cards: [
      {
        rank: 'JOINT AIR-1',
        date: 'May 2026',
        title: 'DD Robocon 2026',
        subtitle: 'Stage 1 & 2 — All India Rank 1',
        description: 'Secured Joint AIR-1 in Stage 1 & 2 of DD Robocon 2026 — "Kung Fu Quest" — by submitting detailed design documents & Working Video for two coordinated robots (manual & autonomous) complete with CAD models and simulations for weapon assembly, KFS collection, and Tic-Tac-Toe arena placement.',
        venue: 'National Level',
        team: '30+ Members',
        image: roboconTeamPhoto,
      },
      {
        rank: 'TRIPLE AIR-1',
        date: 'March 2026',
        title: 'IIT Indore — Ingenium',
        subtitle: 'Three Gold Medals at Techfest',
        description: "Competed at IIT Indore's flagship Techfest Ingenium and swept all three events: AIR-1 in Aero Artistry (maximum unpowered glider flight time), AIR-1 in CV Obstacle Course (autonomous navigation via OpenCV on Raspberry Pi), and AIR-1 in Robo Soccer (small-bot football match).",
        venue: 'IIT Indore',
        team: '25 Members',
        image: iitIndoreTeam,
      },
      {
        rank: 'AIR-1',
        date: 'March 2026',
        title: 'SGGSIET Nanded — Rmaggedon',
        subtitle: 'Line Follower — National Title',
        description: "Three teams from the Robo-Tech Forum competed in the national-level technical event Rmaggedon 2026 at SGGSIET, Nanded. One team claimed All India Rank 1 in the Line Follower event, reinforcing the club's dominance in precision autonomous robotics.",
        venue: 'SGGSIET, Nanded',
        team: '18 Members',
        image: lineFollowerRobots,
      },
      {
        rank: 'AIR-1 & 2',
        date: 'March 2026',
        title: 'GECA Sambhajinagar — Wings',
        subtitle: 'Line Follower — 1st & 2nd Place',
        description: "Two teams from the Robo-Tech Forum participated in the national-level Techfest Wings at GECA, Sambhajinagar. Both teams dominated the Line Follower competition, finishing AIR-1 and AIR-2 respectively and bringing dual national recognition to GCoEA.",
        venue: 'GECA, Sambhajinagar',
        team: '20 Members',
        image: gecaLineFollower,
      },
      {
        rank: 'AIR-1 & 2',
        date: 'March 2026',
        title: 'GCOE Jalgaon — CARVAAN',
        subtitle: 'Line Follower — 1st & 2nd Place',
        description: "Two teams from the Robo-Tech Forum competed in the national-level Techfest CARVAAN at GCOE, Jalgaon, in the Line Follower competition. Both teams secured AIR-1 and AIR-2, completing a remarkable sweep of Line Follower events across multiple national venues in March 2026.",
        venue: 'GCOE, Jalgaon',
        team: '20 Members',
        image: carvaanTrophy,
      }
    ]
  },
  '2014': {
    summary: "Passionate engineers at GCoEA laid the foundation for the college\'s most decorated technical club.",
    cards: [
      {
        rank: 'Foundation',
        date: 'Foundation Year',
        title: 'Genesis of The Robo-Tech Forum',
        subtitle: 'The beginning of a legacy',
        description: "Passionate engineers at GCoEA laid the foundation for the college\'s most decorated technical club.",
        venue: 'GCoEA Amravati',
        team: '12 Members',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
      }
    ]
  }
};

const yearGroups = YEARS_DESC.map((year) => ({ year, ...storyData[year] }));

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
  }, [selectedYear]);

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

  /* FIXED SCROLL INTERSECTION LOGIC PLUGGED DIRECTLY IN */
  useEffect(() => {
    // Keep ref slots aligned strictly with active array count to drop dangling trailing items
    cardRefs.current = cardRefs.current.slice(0, visibleAchievements.length);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = cardRefs.current.indexOf(e.target);
            if (idx !== -1) {
              setActiveIdx(idx);
            }
          }
        });
      },
      { 
        root: null,
        rootMargin: '-30% 0px -40% 0px', // Focus checking inside the explicit horizontal center of the frame view
        threshold: 0.2
      }
    );

    visibleAchievements.forEach((_, index) => {
      const el = cardRefs.current[index];
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [visibleAchievements]);
  return typeof lightMode === 'boolean' ? lightMode : detectedLightMode;
}

function SpotlightAchievementCard({ card, index, isActive, totalCards, onOpen }) {
  const handleKeyDown = useCallback(
    (event) => {
      if (!isActive) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen(card);
      }
    },
    [card, isActive, onOpen],
  );

  return (
    <article
      className={`achievement-card${isActive ? ' is-active' : ''}`}
      aria-hidden={!isActive}
      role={isActive ? 'button' : undefined}
      tabIndex={isActive ? 0 : -1}
      onClick={isActive ? () => onOpen(card) : undefined}
      onKeyDown={handleKeyDown}
      style={{
        '--card-opacity': isActive ? 1 : 0,
        '--card-scale': isActive ? 1 : 0.94,
        '--card-y': isActive ? '0px' : index === 0 ? '-28px' : '36px',
        '--card-visibility': isActive ? 'visible' : 'hidden',
        zIndex: isActive ? totalCards + 1 : totalCards - index,
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
  );
}

function SpotlightYearSection({ group, activeCardIndex, registerSection, onOpenCard }) {
  return (
    <section
      id={`year-${group.year}`}
      data-year={group.year}
      className="spotlight-section"
      style={{ '--card-count': group.cards.length }}
      ref={(node) => registerSection(group.year, node)}
      aria-labelledby={`year-heading-${group.year}`}
    >
      <div className="spotlight-stage">
        <div className="spotlight-year">
          <strong id={`year-heading-${group.year}`}>{group.year}</strong>
          <span>{group.summary}</span>
          <div className="spotlight-progress" aria-hidden="true">
            {group.cards.map((card, index) => (
              <span
                key={`${group.year}-${card.title}-dot`}
                className={`spotlight-progress-dot${activeCardIndex === index ? ' active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="spotlight-card-frame">
          {group.cards.map((card, index) => (
            <SpotlightAchievementCard
              key={`${group.year}-${card.title}`}
              card={card}
              index={index}
              totalCards={group.cards.length}
              isActive={activeCardIndex === index}
              onOpen={onOpenCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementDialog({ card, onClose }) {
  useEffect(() => {
    if (!card || typeof document === 'undefined') return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [card, onClose]);

  if (!card) return null;

  return (
    <div
      className="achievement-dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Motion.div
        className="achievement-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-dialog-title"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="achievement-dialog-close" onClick={onClose}>
          Close
        </button>
        <div className="achievement-dialog-media">
          <img src={card.image} alt={card.title} />
        </div>
        <div className="achievement-dialog-body">
          <p className="achievement-dialog-kicker">
            {card.rank} / {card.date}
          </p>
          <h2 id="achievement-dialog-title" className="achievement-dialog-title">
            {card.title}
          </h2>
          <p className="achievement-dialog-subtitle">{card.subtitle}</p>
          <p className="achievement-dialog-description">{card.description}</p>
          <div className="achievement-dialog-details">
            <span>{card.venue}</span>
            <span>{card.team}</span>
          </div>
        </div>
      </Motion.div>
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
  const [activeCardByYear, setActiveCardByYear] = useState(() =>
    YEARS_DESC.reduce((acc, year) => ({ ...acc, [year]: 0 }), {}),
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const sectionRefs = useRef({});
  const scrollIntentRef = useRef(null);
  const sidebarRef = useRef(null);

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

    const syncSpotlight = () => {
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
      const nextCardByYear = {};

      for (const group of yearGroups) {
        const year = group.year;
        const node = sectionRefs.current[year];
        if (!node) continue;

        const rect = node.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const rawProgress = Math.min(1, Math.max(0, -rect.top / travel));
        const cardIndex = Math.min(
          group.cards.length - 1,
          Math.max(0, Math.round(rawProgress * (group.cards.length - 1))),
        );
        nextCardByYear[year] = cardIndex;

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
      const activeGroup = yearGroups.find((group) => group.year === matchedYear);
      const activeCardIndex = nextCardByYear[matchedYear] ?? 0;
      const cardProgress = activeGroup && activeGroup.cards.length > 1
        ? activeCardIndex / (activeGroup.cards.length - 1)
        : 0;
      const pct = ((idx + cardProgress + 1) / YEARS_DESC.length) * 100;

      setActiveYear((prev) => (prev === matchedYear ? prev : matchedYear));
      setActiveCardByYear((prev) => {
        const changed = YEARS_DESC.some((year) => (nextCardByYear[year] ?? 0) !== prev[year]);
        return changed ? { ...prev, ...nextCardByYear } : prev;
      });
      setTimelineProgress((prev) => (Math.abs(prev - pct) < 0.5 ? prev : pct));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(syncSpotlight);
    };

    syncSpotlight();
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

  const openCardDialog = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const closeCardDialog = useCallback(() => {
    setSelectedCard(null);
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className={`${bgClass} ${modeClass}`} style={{ minHeight: '100vh', position: 'relative', backgroundColor: isLight ? '#f8fbff' : '#010912' }}>

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
            <Motion.span
              className="achievement-kicker"
              initial={{ opacity: 0, letterSpacing: '0.55em' }}
              animate={{ opacity: 1, letterSpacing: '0.42em' }}
              transition={{ duration: 0.8 }}
            >
              Hall of Fame
            </Motion.span>
            <Motion.h1
              className="achievement-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>Achievements</span>
            </Motion.h1>
            <p className="achievement-subtitle">
              Scroll through every year - each milestone takes the center stage as you move forward or backward.
            </p>
            <p className="achievement-scroll-hint" aria-hidden="true">
              Scroll to explore
            </p>
          </header>

          {yearGroups.map((group) => (
            <SpotlightYearSection
              key={group.year}
              group={group}
              activeCardIndex={activeCardByYear[group.year] ?? 0}
              registerSection={registerSection}
              onOpenCard={openCardDialog}
            />
          ))}
        </div>

        <AchievementDialog card={selectedCard} onClose={closeCardDialog} />
      </main>
    </>
  );
}
