import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Rocket, Flag, Award, Cpu, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: '2026',
    date: 'Ongoing',
    title: 'National Robotics Championship',
    description:
      'Secured 1st place among 200+ teams across India with our autonomous quadruped robot — showcasing cutting-edge locomotion and terrain mapping.',
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800',
    icon: Trophy,
    stats: [
      { label: 'Teams Beaten', value: '200+' },
      { label: 'Rank', value: '#1' },
    ],
    tags: ['National', 'Gold', 'Autonomous'],
  },
  {
    year: '2025',
    date: 'DD Robocon Season',
    title: 'DD Robocon — IIT Delhi',
    description:
      'Competed at DD Robocon (ABU Asia-Pacific) at IIT Delhi against 100+ teams from across India with a custom-built competition robot.',
    image:
      'https://therobotechforum.in/assets/img/Robocon%202025/20250713_183423%20-%20Copy.webp',
    icon: Rocket,
    stats: [
      { label: 'Teams', value: '100+' },
      { label: 'Venue', value: 'IIT Delhi' },
    ],
    tags: ['Robocon', 'IIT Delhi'],
  },
  {
    year: '2024',
    date: 'Competition Season',
    title: 'Robocon India Finalists',
    description:
      'Reached the grand finale with our custom-built elephant robot and advanced throwing mechanism at IIT Delhi — a testament to precision engineering.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    icon: Award,
    stats: [
      { label: 'Accuracy', value: '10/10' },
      { label: 'Finish', value: 'Top 5' },
    ],
    tags: ['Robocon', 'Finalist'],
  },
  {
    year: '2023',
    date: 'IRoC-U Season',
    title: 'ISRO Robotics Challenge',
    description:
      'Ranked top 10 globally in ISRO\'s IRoC-U challenge for planetary rover design and manipulation arm — space robotics at its finest.',
    image:
      'https://images.unsplash.com/photo-1620825937374-87fc1a6014dc?q=80&w=800',
    icon: Cpu,
    stats: [
      { label: 'Global Rank', value: '8th' },
      { label: 'Points', value: '320' },
    ],
    tags: ['International', 'ISRO', 'Rover'],
  },
  {
    year: '2022',
    date: 'E-Yantra Season',
    title: 'E-Yantra IIT Bombay',
    description:
      'Successfully deployed autonomous UAVs and embedded systems solutions at IIT Bombay\'s flagship robotics competition.',
    image:
      'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=800',
    icon: Zap,
    stats: [
      { label: 'Payload', value: '5kg' },
      { label: 'Flight', value: '45min' },
    ],
    tags: ['E-Yantra', 'IIT Bombay'],
  },
  {
    year: '2017',
    date: 'Foundation',
    title: 'Genesis of Robo-Tech Forum',
    description:
      'A small group of passionate engineers laid the foundation for what would become GCoEA\'s most decorated technical club.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
    icon: Flag,
    stats: [
      { label: 'Members', value: '12' },
      { label: 'Vision', value: '∞' },
    ],
    tags: ['Foundation', 'Legacy'],
  },
];

export default function HorizontalTimeline() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial states - all cards hidden except first
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        } else {
          gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });
        }
      });

      // Create a timeline pinned to the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${cards.length * 80}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              Math.floor(progress * cards.length),
              cards.length - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      // Animate each card in sequence
      cards.forEach((card, index) => {
        if (index === 0) return;

        // Fade out previous card up
        tl.to(
          cards[index - 1],
          {
            opacity: 0.15,
            y: -40,
            scale: 0.96,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          `card${index}`
        );

        // Fade in current card
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          `card${index}`
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements-timeline"
      className="relative w-full min-h-screen bg-deep overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-transparent to-deep pointer-events-none z-[1]" />

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-16">
          <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
            // HALL OF FAME
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-wider mb-4">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              ACHIEVEMENTS TIMELINE
            </span>
          </h2>
          <div className="mx-auto w-20 h-1 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 rounded-full" />
          <p className="text-text-secondary mt-4 max-w-lg mx-auto text-sm md:text-base">
            A legacy of engineering excellence — from our founding to national glory.
          </p>
        </div>

        {/* Desktop Layout: Side-by-side */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          {/* Left: Year Navigator */}
          <div className="col-span-3 sticky top-1/3">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/30 via-cyan-500/10 to-transparent" />

              <div className="space-y-1">
                {timelineData.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={item.year}
                      className={`flex items-center gap-4 py-3 pl-0 transition-all duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      {/* Dot */}
                      <div
                        className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${
                          isActive
                            ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_15px_rgba(0,212,255,0.5)]'
                            : 'border-border/50 bg-deep'
                        }`}
                      >
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                      </div>
                      {/* Year + Label */}
                      <div>
                        <span
                          className={`font-mono text-sm tracking-wider block transition-colors duration-500 ${
                            isActive ? 'text-cyan-400' : 'text-text-muted'
                          }`}
                        >
                          {item.year}
                        </span>
                        <span className="text-[10px] text-text-muted font-mono uppercase tracking-widest">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Cards Stack */}
          <div
            ref={cardsContainerRef}
            className="col-span-9 relative min-h-[450px]"
          >
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.year}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="absolute inset-0 will-change-transform"
                >
                  <div className="backdrop-blur-md rounded-2xl bg-surface/50 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] overflow-hidden">
                    <div className="grid grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-[420px] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover brightness-75"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/90" />
                        {/* Year watermark on image */}
                        <div className="absolute bottom-4 left-6 text-7xl font-display font-black text-white/10 pointer-events-none select-none">
                          {item.year}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                            <Icon size={18} className="text-cyan-400" />
                          </div>
                          <span className="text-cyan-400 font-mono text-lg tracking-widest">
                            {item.year}
                          </span>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-4 leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-text-secondary text-sm lg:text-base leading-relaxed mb-6">
                          {item.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {item.stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="border-l-2 border-cyan-500/30 pl-3"
                            >
                              <div className="text-xl font-bold text-text-primary font-mono">
                                {stat.value}
                              </div>
                              <div className="text-[10px] text-text-muted font-mono uppercase tracking-wider">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-200 bg-cyan-500/10 border border-cyan-500/20 rounded-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout: Vertical Stack */}
        <div className="lg:hidden space-y-6 relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/40 via-cyan-500/15 to-transparent z-0" />

          {timelineData.map((item, index) => {
            const Icon = item.icon;
            return (
              <MobileTimelineCard key={item.year} item={item} index={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Mobile card with its own scroll-triggered reveal
 */
function MobileTimelineCard({ item, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, []);

  const Icon = item.icon;

  return (
    <div ref={cardRef} className="relative pl-10 opacity-0">
      {/* Dot on the line */}
      <div className="absolute left-[7px] top-6 w-[18px] h-[18px] rounded-full border-2 border-cyan-500/50 bg-deep z-10 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-cyan-400" />
      </div>

      <div className="backdrop-blur-md p-5 rounded-xl bg-surface/50 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
        {/* Image */}
        <div className="relative h-40 rounded-lg overflow-hidden mb-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover brightness-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
          <div className="absolute bottom-2 left-3 text-4xl font-display font-black text-white/15 pointer-events-none">
            {item.year}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-2 text-cyan-300">
          <Icon size={20} />
          <span className="text-base font-mono">{item.year}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {item.stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-cyan-500/30 pl-2">
              <div className="text-base font-bold text-white font-mono">
                {stat.value}
              </div>
              <div className="text-[9px] text-text-muted font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-cyan-200 bg-cyan-500/10 border border-cyan-500/20 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
