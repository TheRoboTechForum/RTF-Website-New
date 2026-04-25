import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import { useLoadingManager } from './hooks/useLoadingManager';
import { LoadingProvider, useLoading } from './context/LoadingContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgressFixed from './components/layout/ScrollProgressFixed';
import VideoIntroEnhanced from './components/layout/VideoIntroEnhanced';
import LoadingScreen from './components/layout/LoadingScreen';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Sponsors from './pages/Sponsors';
import Timeline from './pages/Timeline';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
}

/**
 * AppContent — Main app layout with intro, routing, and loading states
 */
function AppContent() {
  const [showButton, setShowButton] = useState(false);
  const { shouldShowIntro, markIntroComplete, assetsReady, setAssetsReady } = useLoadingManager();
  const { isLoading, loadingMessage } = useLoading();

  // Buttery smooth scrolling via Lenis, synced to GSAP ScrollTrigger
  useLenis();

  // Handle scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate asset loading (in real app, wait for critical resources)
  useEffect(() => {
    // Mark assets as ready after fonts and initial layout
    const timer = setTimeout(() => setAssetsReady(true), 500);
    return () => clearTimeout(timer);
  }, [setAssetsReady]);

  const handleIntroComplete = () => {
    markIntroComplete();
  };

  return (
    <Router>
      {/* Enhanced Intro with Session Control */}
      <VideoIntroEnhanced
        shouldShow={shouldShowIntro}
        assetsReady={assetsReady}
        onComplete={handleIntroComplete}
      />

      {/* Loading Screen Overlay */}
      <LoadingScreen show={isLoading} message={loadingMessage} />

      {/* Main Content */}
      <div className="relative min-h-screen bg-deep text-text-primary" style={{ overflowX: 'clip' }}>
        <ScrollProgressFixed />
        <Navbar />
        <AnimatedRoutes />
        <Footer />

        {/* Scroll to Top Button */}
        {showButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full 
                       bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.8)] 
                       hover:shadow-[0_0_25px_rgba(6,182,212,1)] 
                       animate-pulse hover:animate-none transition-all 
                       duration-300 flex items-center justify-center 
                       border-2 border-cyan-300 cursor-pointer group"
            title="Scroll to Top"
          >
            <span className="text-xl group-hover:-translate-y-1 transition-transform">
              ▲
            </span>
          </button>
        )}
      </div>
    </Router>
  );
}

/**
 * App — Root component with Loading Provider wrapper
 */
export default function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}
