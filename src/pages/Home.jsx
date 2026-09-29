import { motion } from 'framer-motion';
import { pageTransition } from '../lib/animations';
import HeroSection from '../components/sections/HeroSection';
import StatsBar from '../components/sections/StatsBar';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import SponsorShowcase from '../components/sections/SponsorShowcase';
import ParallaxImage from '../components/ui/ParallaxImage';
import ImageFrame from '../components/ui/ImageFrame';
// import TerminalContact from '../components/sections/TerminalContact';
// import CyberpunkHero from '../components/sections/CyberpunkHero';
// import roboconWorkshopImage from '../assets/img/Robocon 2025/20250713_183423 - Copy.webp';
import rtfteam from '../assets/img/College Programs/IMG-20250831-WA0252.webp';

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
      <div className="relative z-10">
        <HeroSection />
      </div>

      <div className="relative z-20">
        {/* <StatsBar /> */}

      <div className="max-w-6xl mx-auto mt-52 mb-2">  
        <div className="text-center mb-1">

          <h2 className="text-5xl md:text-6xl font-display font-bold text-red-500">
            The Robo-Tech Forum Team
          </h2>

          <p className="mt-2 text-lg text-text-secondary max-w-2xl mx-auto">
            A community of innovators, builders, and future engineers at
            Government College of Engineering, Amravati.
          </p>
        </div>

        <ImageFrame imageSrc={rtfteam} alt="RTF Team" />
      </div>

        {/* <FeaturedProjects /> */}

        <SponsorShowcase />

        {/* Parallax break — competition image */}
        {/* <ParallaxImage
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
          alt="Circuit boards and electronics"
          overlay="From breadboards to national stages — built by students."
          height={95}
        /> */}

        {/* Cyberpunk Hero — futuristic forum showcase */}
        {/* <CyberpunkHero /> */}

        {/* Terminal contact form */}
        {/* <TerminalContact /> */}
      </div>
    </MotionMain>
  );
}
