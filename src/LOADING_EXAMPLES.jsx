/**
 * PAGE LOADING IMPLEMENTATION EXAMPLES
 * 
 * These examples show the recommended patterns for loading pages
 * with data and images synchronized through skeleton UI.
 * 
 * Key Pattern:
 * 1. Check isReady state
 * 2. Show skeleton while loading
 * 3. Once ready, render actual content
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePageReady } from '../hooks/usePageReady';
import { preloadImages } from '../utils/imageLoading';
import { SkeletonHero, SkeletonSection, SkeletonGrid } from '../components/ui/Skeletons';

/**
 * ============================================================================
 * EXAMPLE 1: HOME PAGE WITH HERO + PROJECTS
 * ============================================================================
 */
export function HomePageExample() {
  const { isDataLoaded, areImagesLoaded, isReady, completeDataLoad, completeImageLoad } = usePageReady();

  // Simulate fetching data (projects, stats, etc)
  useEffect(() => {
    // In real app: fetch from API
    const timer = setTimeout(() => {
      completeDataLoad();
    }, 800);
    return () => clearTimeout(timer);
  }, [completeDataLoad]);

  // Preload critical images (hero, above-fold)
  useEffect(() => {
    const criticalImages = [
      'https://therobotechforum.in/assets/images/rtf-logo-img.jpg',
      // Add other above-fold images
    ];

    preloadImages(criticalImages, completeImageLoad);
  }, [completeImageLoad]);

  // IMPORTANT: Only render real content when BOTH data AND images are ready
  if (!isReady) {
    return (
      <div className="overflow-hidden">
        <SkeletonHero />
        <SkeletonSection />
      </div>
    );
  }

  // Real content
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-clip"
    >
      <HeroSection />
      <StatsBar />
      <FeaturedProjects />
      <TerminalContact />
    </motion.main>
  );
}

/**
 * ============================================================================
 * EXAMPLE 2: PROJECTS PAGE WITH GRID
 * ============================================================================
 */
export function ProjectsPageExample() {
  const page = new URLSearchParams(window.location.search).get('page') || '1';
  const { isDataLoaded, areImagesLoaded, isReady, completeDataLoad, completeImageLoad, reset } =
    usePageReady();

  // Reset when page changes (important for pagination)
  useEffect(() => {
    reset();
  }, [page, reset]);

  // Load projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await fetch(`/api/projects?page=${page}`);
        // const data = await response.json();
        // setProjects(data);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 600));
        completeDataLoad();
      } catch (error) {
        console.error('Failed to load projects:', error);
        completeDataLoad(); // Still mark as loaded to prevent infinite skeleton
      }
    };

    fetchProjects();
  }, [page, completeDataLoad]);

  // Preload project images (once we have project data)
  useEffect(() => {
    if (!isDataLoaded) return;

    // In real app: extract from fetched projects
    const projectImageUrls = [
      // 'url1',
      // 'url2',
      // etc
    ];

    if (projectImageUrls.length > 0) {
      preloadImages(projectImageUrls, completeImageLoad);
    } else {
      completeImageLoad(); // No images to load
    }
  }, [isDataLoaded, completeImageLoad]);

  // While loading: show skeleton
  if (!isReady) {
    return (
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 space-y-2">
            <div className="h-10 w-40 bg-gray-800/50 rounded animate-pulse" />
          </div>
          <SkeletonGrid count={6} />
        </div>
      </div>
    );
  }

  // Real content
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Our Projects</h1>
        <ProjectGrid />
      </div>
    </motion.section>
  );
}

/**
 * ============================================================================
 * EXAMPLE 3: TEAM PAGE WITH PAGINATION
 * ============================================================================
 */
export function TeamPageExample() {
  const page = new URLSearchParams(window.location.search).get('page') || '1';
  const { isDataLoaded, areImagesLoaded, isReady, completeDataLoad, completeImageLoad, reset } =
    usePageReady();

  useEffect(() => {
    reset();
  }, [page, reset]);

  // Load team members
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Simulate: await fetch(`/api/team?page=${page}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        completeDataLoad();
      } catch (error) {
        console.error('Failed to load team:', error);
        completeDataLoad();
      }
    };

    fetchTeam();
  }, [page, completeDataLoad]);

  // Preload team member photos
  useEffect(() => {
    if (!isDataLoaded) return;

    const memberPhotoUrls = [
      // Extract from fetched data
      // 'photo1.jpg',
      // 'photo2.jpg',
    ];

    if (memberPhotoUrls.length > 0) {
      preloadImages(memberPhotoUrls, completeImageLoad);
    } else {
      completeImageLoad();
    }
  }, [isDataLoaded, completeImageLoad]);

  if (!isReady) {
    return (
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 h-10 w-40 bg-gray-800/50 rounded animate-pulse" />
          <SkeletonGrid count={9} />
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Meet The Team</h1>
        <TeamGrid />
      </div>
    </motion.section>
  );
}

/**
 * ============================================================================
 * COMPONENT STUBS (these would be imported from components)
 * ============================================================================
 */

function HeroSection() {
  return <div className="h-screen bg-gradient-to-b from-deep via-deep to-transparent" />;
}

function StatsBar() {
  return <section className="py-20 px-6 bg-deep/50">Stats here</section>;
}

function FeaturedProjects() {
  return <section className="py-24 px-6">Featured projects here</section>;
}

function TerminalContact() {
  return <section className="py-24 px-6">Contact form here</section>;
}

function ProjectGrid() {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">Projects grid</div>;
}

function TeamGrid() {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">Team grid</div>;
}
