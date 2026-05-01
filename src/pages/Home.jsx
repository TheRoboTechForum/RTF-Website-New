import { motion } from 'framer-motion';
import { pageTransition } from '../lib/animations';
import HeroSection from '../components/sections/HeroSection';
import StatsBar from '../components/sections/StatsBar';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import SponsorShowcase from '../components/sections/SponsorShowcase';
import ParallaxImage from '../components/ui/ParallaxImage';
import TerminalContact from '../components/sections/TerminalContact';
import roboconWorkshopImage from '../assets/img/Robocon 2025/20250713_183423 - Copy.webp';
import collegeWorkshopImage from '../assets/img/College Programs/20241012_085453.webp';

const MotionMain = motion.main;

export default function Home() {
  return (
    <MotionMain
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />

      <div className="relative bg-deep z-20">
        <StatsBar />

        {/* Parallax break — workshop / lab image */}
        <ParallaxImage
          src={roboconWorkshopImage}
          images={[roboconWorkshopImage, collegeWorkshopImage]}
          alt="Robotics workshop"
          overlay="We don't just study engineering — we live it."
          height={95}
        />

        <FeaturedProjects />

        <SponsorShowcase />

        {/* Parallax break — competition image */}
        <ParallaxImage
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
          alt="Circuit boards and electronics"
          overlay="From breadboards to national stages — built by students."
          height={95}
        />

        {/* Terminal contact form */}
        <TerminalContact />
      </div>
    </MotionMain>
  );
}
