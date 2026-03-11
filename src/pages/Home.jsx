import { motion } from 'framer-motion';
import { pageTransition } from '../lib/animations';
import HeroSection from '../components/sections/HeroSection';
import StatsBar from '../components/sections/StatsBar';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import ParallaxImage from '../components/ui/ParallaxImage';
import TerminalContact from '../components/sections/TerminalContact';

export default function Home() {
  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <StatsBar />

      {/* Parallax break — workshop / lab image */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1600&q=80"
        alt="Robotics workshop"
        overlay="We don't just study engineering — we live it."
        height={50}
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
    </motion.main>
  );
}
