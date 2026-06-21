import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLoadingManager } from './hooks/useLoadingManager';
import { LoadingProvider, useLoading } from './context/LoadingContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import VideoIntroEnhanced from './components/layout/VideoIntroEnhanced';
import LoadingScreen from './components/layout/LoadingScreen';
import DotGrid from './components/ui/DotGrid';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Team from './pages/Team';
// import Sponsors from './pages/Sponsors';
import Timeline from './pages/Timeline';
import Achievement from './pages/Achievement';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';

function AnimatedRoutes() {
  const location = useLocation();
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Only apply the loader logic to routes that are known to be asset/image-heavy
    const imageHeavyRoutes = ['/gallery', '/team', '/projects', '/achievement'];
    const requiresLoader = imageHeavyRoutes.some(route => location.pathname.startsWith(route));

    if (!requiresLoader) return;

    let isMounted = true;
    let loaderShown = false;

    // Small delay to allow React to paint the DOM with new <img> tags
    const mountTimer = setTimeout(() => {
      if (!isMounted) return;

      const images = Array.from(document.querySelectorAll('img'));
      const incompleteImages = images.filter(img => !img.complete);

      if (incompleteImages.length === 0) {
        // No incomplete images (cached or absent), don't show the loader
        return;
      }

      // There are images to load, so show the loader
      loaderShown = true;
      showLoader("Loading assets...");

      let loadedCount = 0;
      let hasEnded = false;

      // Fallback to ensure we never get stuck indefinitely
      const fallbackTimer = setTimeout(() => {
        hasEnded = true;
        if (isMounted && loaderShown) hideLoader();
      }, 1500);

      const checkDone = () => {
        if (hasEnded) return;
        loadedCount++;
        if (loadedCount >= incompleteImages.length) {
          hasEnded = true;
          clearTimeout(fallbackTimer);
          if (isMounted && loaderShown) hideLoader();
        }
      };

      incompleteImages.forEach(img => {
        img.addEventListener('load', checkDone, { once: true });
        img.addEventListener('error', checkDone, { once: true });
      });
    }, 50);

    return () => {
      isMounted = false;
      clearTimeout(mountTimer);
      if (loaderShown) hideLoader(); // Cleanup safely only if we showed it
    };
  }, [location.pathname, showLoader, hideLoader]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        {/* <Route path="/sponsors" element={<Sponsors />} /> */}
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/achievement" element={<Achievement />} />
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
      <div className="relative min-h-screen bg-deep text-text-primary transition-colors duration-300" style={{ overflowX: 'clip' }}>
        {/* Global DotGrid Background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <DotGrid
            dotSize={4}
            gap={18}
            baseColor="#333333"
            activeColor="#CC0000"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        <div className="relative z-10">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>

        {/* Scroll to Top Button */}
        {showButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full 
                       bg-cyan-500 text-black shadow-[0_0_15px_rgba(255,32,32,0.8)] 
                       hover:shadow-[0_0_25px_rgba(255,32,32,1)] 
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
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </ThemeProvider>
  );
}
