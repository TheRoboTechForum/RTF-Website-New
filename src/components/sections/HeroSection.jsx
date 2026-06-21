import NeoButton from '../ui/NeoButton';
import rtfLogo from '../../assets/images/rtf-logo-img.jpg';
import gcoeaLogo from '../../assets/images/gcoea-logo.jpeg';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20">

      <div className="relative z-10 flex items-center justify-center w-full px-6">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 flex flex-col items-start">
            <div>
              <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-full border border-red-500/40 bg-black/90 shadow-[0_0_18px_rgba(255,32,32,0.16)] backdrop-blur-sm mb-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-black">
                  <img
                    src={gcoeaLogo}
                    alt="GCoEA logo"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="text-xs tracking-[0.22em] text-white font-mono uppercase font-black">
                  GCoEA Amravati &middot; Est. 2014
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-display font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase mb-2 select-none leading-none">
                WE <span className="inline-block min-w-[240px] text-text-primary">INNOVATE</span>
              </p>
              <h1 className="text-[clamp(3rem,8vw,8rem)] font-display font-black leading-[0.9]
                             tracking-tight text-text-primary uppercase mb-6"
                style={{ letterSpacing: '-0.02em' }}>
                THE ROBO
                <span className="block text-stroke-hollow">
                  TECH
                </span>
                <span className="bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-300 
                                 dark:from-[#FF2020] dark:via-[#CC0000] dark:to-[#8B0000]
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
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">120+</span> engineers ·{' '}
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">50+</span> projects ·{' '}
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">IITs, ISRO</span> & beyond
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <NeoButton to="/projects" arrow>SEE OUR WORK</NeoButton>
              <NeoButton to="/about" variant="secondary">WHO WE ARE</NeoButton>
            </div>
          </div>
          <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
            <div className="w-[320px] h-[320px] rounded-full bg-white dark:bg-transparent border-[4px] border-cyan-500 flex items-center justify-center shadow-xl dark:shadow-[0_0_50px_rgba(255,32,32,0.5)] transition-colors duration-300 overflow-hidden">
              <img src={rtfLogo} alt="RTF Logo" className="w-full h-full object-cover invert dark:invert-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

