import { motion } from 'framer-motion';
import { pageTransition } from '../lib/animations';
import HeroSection from '../components/sections/HeroSection';
import StatsBar from '../components/sections/StatsBar';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import ParallaxImage from '../components/ui/ParallaxImage';
import TerminalContact from '../components/sections/TerminalContact';

/**
 * Home page
 *
 * Layout trick that replicates the IITD reference site effect:
 *   1. <HeroSection> renders a 280vh tall div with the hero PINNED inside it.
 *      The hero sits at z-index:1 and stays stuck while browser scrolls.
 *
 *   2. .overlay-panel below has z-index:20 + dark bg + rounded-top corners.
 *      As the user scrolls past the hero's 280vh runway, this panel slides
 *      UP and OVER the pinned hero — creating the "covering" cinematic effect.
 */
export default function Home() {
  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* ── PINNED HERO — 280vh scroll runway ── */}
      <HeroSection />

      {/* ── OVERLAY PANEL — slides over the pinned hero ── */}
      <div
        className="relative bg-deep overlay-panel"
        style={{
          zIndex: 20,
          borderRadius: '28px 28px 0 0',
          marginTop: '-1px',          // flush seam
          boxShadow: '0 -30px 80px rgba(0,0,0,0.85)',
        }}
      >
        <StatsBar />

        {/* Parallax break — workshop / lab image */}
        <ParallaxImage
          src="https://therobotechforum.in/assets/img/Robocon%202025/20250713_183423%20-%20Copy.webp"
          images={[
            'https://therobotechforum.in/assets/img/Robocon%202025/20250713_183423%20-%20Copy.webp',
            'https://therobotechforum.in/assets/img/College%20Programs/20241012_085453.webp',
            // 'https://therobotechforum.in/assets/img/Robocon%202025/IMG_20250713_183012.webp',
          ]}
          alt="Robotics workshop"
          overlay="We don't just study engineering — we live it."
          height={80}
        />

        <FeaturedProjects />

        {/* Parallax break — competition image */}
        <ParallaxImage
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
          alt="Circuit boards and electronics"
          overlay="From breadboards to national stages — built by students."
          height={50}
        />

        {/* Terminal contact form */}
        <TerminalContact />
      </div>
    </motion.main>
  );
}
