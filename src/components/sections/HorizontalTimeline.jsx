import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    stats: [
      { label: 'Teams Beaten', value: '200+' },
      { label: 'Rank', value: '#1' },
    ],
  },
  {
    year: '2025',
    date: 'DD Robocon Season',
    title: 'DD Robocon — IIT Delhi',
    description:
      'Competed at DD Robocon (ABU Asia-Pacific) at IIT Delhi against 100+ teams from across India with a custom-built competition robot.',
    image:
      'https://therobotechforum.in/assets/img/Robocon%202025/20250713_183423%20-%20Copy.webp',
    stats: [
      { label: 'Teams', value: '100+' },
      { label: 'Venue', value: 'IIT Delhi' },
    ],
  },
  {
    year: '2024',
    date: 'Competition Season',
    title: 'Robocon India Finalists',
    description:
      'Reached the grand finale with our custom-built elephant robot and advanced throwing mechanism at IIT Delhi — a testament to precision engineering.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    stats: [
      { label: 'Accuracy', value: '10/10' },
      { label: 'Finish', value: 'Top 5' },
    ],
  },
  {
    year: '2023',
    date: 'IRoC-U Season',
    title: 'ISRO Robotics Challenge',
    description:
      'Ranked top 10 globally in ISRO\'s IRoC-U challenge for planetary rover design and manipulation arm — space robotics at its finest.',
    image:
      'https://images.unsplash.com/photo-1620825937374-87fc1a6014dc?q=80&w=800',
    stats: [
      { label: 'Global Rank', value: '8th' },
      { label: 'Points', value: '320' },
    ],
  },
  {
    year: '2022',
    date: 'E-Yantra Season',
    title: 'E-Yantra IIT Bombay',
    description:
      'Successfully deployed autonomous UAVs and embedded systems solutions at IIT Bombay\'s flagship robotics competition.',
    image:
      'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=800',
    stats: [
      { label: 'Payload', value: '5kg' },
      { label: 'Flight', value: '45min' },
    ],
  },
  {
    year: '2014',
    date: 'Foundation',
    title: 'Genesis of The Robo-Tech Forum',
    description:
      'A small group of passionate engineers laid the foundation for what would become GCoEA\'s most decorated technical club.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
    stats: [
      { label: 'Members', value: '12' },
      { label: 'Vision', value: '∞' },
    ],
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
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        } else {
          gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });
        }
      });

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

      cards.forEach((card, index) => {
        if (index === 0) return;

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
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-surface to-deep pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-wider mb-4 text-text-heading">
            ACHIEVEMENTS TIMELINE
          </h2>
          <div className="mx-auto w-20 h-px bg-border mt-6 mb-4" />
          <p className="text-text-secondary mt-4 max-w-lg mx-auto text-sm md:text-base">
            A legacy of engineering excellence — from our founding to national glory.
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          <div className="col-span-3 sticky top-1/3">
            <div className="relative">
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-border" />

              <div className="space-y-1">
                {timelineData.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={item.year}
                      className={`flex items-center gap-4 py-3 pl-0 transition-all duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      <div
                        className={`relative z-10 w-6 h-6 rounded-none border flex items-center justify-center shrink-0 transition-all duration-500 ${
                          isActive
                            ? 'border-text-primary bg-surface'
                            : 'border-border/50 bg-deep'
                        }`}
                      >
                        {isActive && (
                          <div className="w-2 h-2 bg-text-primary" />
                        )}
                      </div>
                      <div>
                        <span
                          className={`font-mono text-sm tracking-wider block transition-colors duration-500 ${
                            isActive ? 'text-text-primary' : 'text-text-muted'
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

          <div
            ref={cardsContainerRef}
            className="col-span-9 relative min-h-[450px]"
          >
            {timelineData.map((item, index) => {
              return (
                <div
                  key={item.year}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="absolute inset-0 will-change-transform"
                >
                  <div className="bg-elevated border border-border overflow-hidden rounded-none shadow-sm">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative h-[420px] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover brightness-75"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-elevated" />
                      </div>

                      <div className="p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-text-muted font-mono text-lg tracking-widest">
                            {item.year}
                          </span>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-4 leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-text-secondary text-sm lg:text-base leading-relaxed mb-8">
                          {item.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          {item.stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="border-l-2 border-border pl-3"
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
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:hidden space-y-6 relative">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border z-0" />

          {timelineData.map((item, index) => {
            return (
              <MobileTimelineCard key={item.year} item={item} index={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

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

  return (
    <div ref={cardRef} className="relative pl-10 opacity-0">
      <div className="absolute left-[7px] top-6 w-4 h-4 border border-border bg-deep z-10 flex items-center justify-center rounded-none">
        <div className="w-1.5 h-1.5 bg-text-primary" />
      </div>

      <div className="p-5 bg-elevated border border-border rounded-none shadow-sm">
        <div className="relative h-40 overflow-hidden mb-4 rounded-sm">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover brightness-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-elevated/80 to-transparent" />
        </div>

        <div className="mb-2 text-text-muted">
          <span className="text-base font-mono">{item.year}</span>
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-3">{item.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {item.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {item.stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-border pl-2">
              <div className="text-base font-bold text-text-primary font-mono">
                {stat.value}
              </div>
              <div className="text-[9px] text-text-muted font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
