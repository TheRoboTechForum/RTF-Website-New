import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import ScrollToTop from './components/layout/ScrollToTop'; 
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import VideoIntro from './components/layout/VideoIntro';
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

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Router>
      <ScrollToTop />
      {!introComplete && <VideoIntro onComplete={() => setIntroComplete(true)} />}
      <div className={`relative min-h-screen bg-deep text-text-primary overflow-x-hidden ${!introComplete ? 'invisible' : ''}`}>
        <ScrollProgress />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        {showButton && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full 
               bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.8)] 
               hover:shadow-[0_0_25px_rgba(6,182,212,1)] 
               animate-pulse hover:animate-none transition-all 
               duration-300 flex items-center justify-center 
               border-2 border-cyan-300 cursor-pointer group"
    title="Initiate Scroll to Top"
  >
    <span className="text-xl group-hover:-translate-y-1 transition-transform">
      ▲
    </span >
  </button>
)}
      </div>
    </Router>
  );
  
}
