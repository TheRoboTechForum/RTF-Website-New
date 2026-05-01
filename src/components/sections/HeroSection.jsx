import { useRef } from 'react';
import NeoButton from '../ui/NeoButton';
import ParticleCanvas from '../ui/ParticleCanvas';
import rtfLogo from '../../assets/images/rtf-logo-img.jpg';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-void flex items-center justify-center pt-20">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 50%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />
      <ParticleCanvas />

      <div className="relative z-10 flex items-center justify-center w-full px-6">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 flex flex-col items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30
                              bg-cyan-500/5 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs tracking-[0.2em] text-cyan-400 font-mono uppercase">
                  GCoEA Amravati · Est. 2017
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-display font-bold tracking-widest text-cyan-400 uppercase mb-2 select-none leading-none">
                WE <span className="inline-block min-w-[240px] text-white">INNOVATE</span>
              </p>
              <h1 className="text-[clamp(3rem,8vw,8rem)] font-display font-black leading-[0.9]
                             tracking-tight text-text-primary uppercase mb-6"
                  style={{ letterSpacing: '-0.02em' }}>
                ROBO
                <span className="block text-transparent"
                      style={{ WebkitTextStroke: '2px rgba(241,245,249,0.3)' }}>
                  TECH
                </span>
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400
                                 bg-clip-text text-transparent">
                  FORUM
                </span>
              </h1>
            </div>
            <div className="flex flex-col gap-3 mb-8">
              <p className="text-lg md:text-xl text-text-secondary font-body max-w-lg leading-relaxed">
                A student-run engineering collective building real-world robotics,
                competing at national stages, and pushing limits.
              </p>
              <p className="text-sm font-mono text-text-muted">
                <span className="text-cyan-400">120+</span> engineers ·{' '}
                <span className="text-cyan-400">50+</span> projects ·{' '}
                <span className="text-cyan-400">IITs, ISRO</span> &amp; beyond
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <NeoButton to="/projects" arrow>SEE OUR WORK</NeoButton>
              <NeoButton to="/about" variant="secondary">WHO WE ARE</NeoButton>
                            {/* <NeoButton to="/sponsors" variant="secondary">Sponser</NeoButton> */}

            </div>
          </div>
          <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
            <div className="w-[180px] h-[180px] rounded-xl overflow-hidden border border-cyan-500/40"
                 style={{ boxShadow: '0 0 30px rgba(6,182,212,0.3)' }}>
              <img src={rtfLogo} alt="RTF Logo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
