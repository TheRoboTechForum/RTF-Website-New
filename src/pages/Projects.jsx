import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Users, Trophy, Search, AlertTriangle, RefreshCw } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { pageTransition, staggerContainer, slideInRight } from '../lib/animations';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ui/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { getDetailImage } from '../lib/cloudinary';

export default function Projects() {
  const { projects, loading, error, refetch } = useProjects();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  // Derived filter categories from projects
  const uniqueCategories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['ALL', ...Array.from(cats)].filter(c => c !== 'OTHER');
  }, [projects]);

  // Make sure ALL is first, then ROBOTICS, etc.
  const categoriesToRender = ['ALL', 'ROBOTICS', 'ELECTRONICS', 'AI/ML', 'AUTOMATION', 'SOFTWARE'];
  const allCategories = categoriesToRender.filter(c => uniqueCategories.includes(c) || c === 'ALL');

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { ALL: projects.length };
    projects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = activeCategory === 'ALL' || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = q === '' || 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.techStack.some(t => t.toLowerCase().includes(q));
      
      return matchCategory && matchSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const openProject = useCallback((project) => {
    setImageIndex(0);
    setSelectedProject(project);
  }, []);

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24 px-6 min-h-screen"
    >
      <SectionHeader
        label="// OUR PORTFOLIO"
        title="Projects"
        subtitle="From autonomous rovers to competition-winning robots — explore projects built by RTF engineers."
      />

      {/* Error state with fallback indicator */}
      {error && projects.length > 0 && (
        <div className="max-w-7xl mx-auto mb-6 bg-cyan-900/20 border border-cyan-800/50 rounded p-3 flex justify-center text-xs font-mono text-cyan-300">
          Showing offline data · Last updated from local cache
        </div>
      )}

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
          
          {/* Search Bar */}
          <div className="relative w-full max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" size={16} />
            <input 
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D1520] border border-[#1E2D42] text-[#F1F5F9] font-mono text-[13px] py-[10px] pr-4 pl-10 rounded-md focus:outline-none focus:border-[#22D3EE] focus:ring-[3px] focus:ring-[rgba(34,211,238,0.1)] transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {(allCategories.length > 1 ? allCategories : ['ALL']).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-[18px] py-[8px] text-[11px] font-mono tracking-[0.1em] rounded-[4px] border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[rgba(34,211,238,0.1)] text-[#22D3EE] border-[#22D3EE] shadow-[0_0_16px_rgba(34,211,238,0.1)]'
                    : 'bg-transparent text-[#475569] border-[#1E2D42] hover:text-[#94A3B8] hover:border-[rgba(34,211,238,0.3)]'
                }`}
              >
                {cat} ({categoryCounts[cat] || 0})
              </button>
            ))}
          </div>

        </div>

        {/* Results count text */}
        {!loading && projects.length > 0 && (
          <div className="text-[12px] font-mono text-[#475569] mb-4">
            Showing {filtered.length} of {projects.length} projects
          </div>
        )}
      </div>

      {loading ? (
        // Loading State: Skeletons
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0D1520] rounded-xl border border-[#1E2D42] h-[400px] overflow-hidden flex flex-col">
              <div 
                className="h-[200px] w-full relative" 
                style={{
                  background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite linear'
                }}
              />
              <div className="p-5 flex flex-col flex-1 gap-4">
                <div 
                  className="h-[20px] w-[70%] rounded-[4px]"
                  style={{
                    background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite linear'
                  }}
                />
                <div className="flex flex-col gap-2">
                  <div 
                    className="h-[14px] w-[90%] rounded-[2px]"
                    style={{
                      background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite linear'
                    }}
                  />
                  <div 
                    className="h-[14px] w-[60%] rounded-[2px]"
                    style={{
                      background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite linear'
                    }}
                  />
                </div>
                <div className="flex gap-2 mt-auto">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div 
                      key={j}
                      className="h-[20px] w-[50px] rounded-[3px]"
                      style={{
                        background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite linear'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
          `}} />
        </div>
      ) : error && projects.length === 0 ? (
        // Error state (no fallback data)
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-[#0D1520] border border-[#1E2D42] max-w-2xl mx-auto">
          <AlertTriangle className="text-[#FBBF24] mb-4" size={40} />
          <h3 className="font-['Space_Grotesk'] text-2xl text-[#F1F5F9] mb-2">Unable to load projects</h3>
          <p className="font-mono text-[#94A3B8] mb-6">Please try again</p>
          <button 
            onClick={refetch}
            className="flex items-center gap-2 px-6 py-2 bg-[rgba(34,211,238,0.1)] text-[#22D3EE] border border-[#22D3EE] rounded font-mono tracking-wider hover:bg-[rgba(34,211,238,0.2)]"
          >
            <RefreshCw size={16} />
            RETRY
          </button>
        </div>
      ) : (
        // Project Grid
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' 
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <ProjectCard
                    project={project}
                    onOpenDetail={openProject}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No results state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center mt-8">
              <p className="text-xl text-[#F1F5F9] font-['Space_Grotesk'] mb-2">
                No projects found for "{searchQuery}"
              </p>
              <p className="text-[#94A3B8] font-['Inter'] mb-6">
                Try a different search or category
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                }}
                className="px-4 py-2 font-mono text-[13px] bg-transparent text-[#22D3EE] border border-[#22D3EE] rounded hover:bg-[rgba(34,211,238,0.1)] transition-colors"
                >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── Detail Modal (slide-in panel from right) ─── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-[#060B12]/80 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.aside
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 z-50 h-full w-full max-w-xl bg-[#0D1520] border-l border-[#1E2D42] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg bg-[rgba(15,23,42,0.6)] backdrop-blur-md border border-[#1E2D42] flex items-center justify-center text-[#94A3B8] hover:text-[#22D3EE] hover:border-[rgba(34,211,238,0.4)] transition-all"
              >
                <X size={18} />
              </button>

              {/* Image Gallery */}
              <div className="relative h-64 sm:h-80 bg-[#141E2E] overflow-hidden">
                <AnimatePresence mode="wait">
                  {selectedProject.images && selectedProject.images.length > 0 ? (
                    <motion.img
                      key={imageIndex}
                      src={getDetailImage(selectedProject.images[imageIndex])}
                      alt={`${selectedProject.title} image ${imageIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0D1520] to-[#141E2E]" />
                  )}
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setImageIndex((i) =>
                          i === 0 ? selectedProject.images.length - 1 : i - 1
                        )
                      }
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[rgba(6,11,18,0.6)] backdrop-blur-sm border border-[#1E2D42] flex items-center justify-center text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() =>
                        setImageIndex((i) =>
                          i === selectedProject.images.length - 1 ? 0 : i + 1
                        )
                      }
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[rgba(6,11,18,0.6)] backdrop-blur-sm border border-[#1E2D42] flex items-center justify-center text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Dot navigation */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {selectedProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImageIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === imageIndex
                            ? 'bg-[#22D3EE] w-5'
                            : 'bg-[#475569]/60 hover:bg-[#475569]'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Category + Year */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase bg-[rgba(34,211,238,0.15)] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] rounded">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-[#475569]">
                    {selectedProject.year}
                  </span>
                  {selectedProject.status === 'ONGOING' && (
                    <span className="px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase bg-[rgba(245,158,11,0.15)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)] rounded flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                      ONGOING
                    </span>
                  )}
                  {selectedProject.status === 'PROTOTYPE' && (
                    <span className="px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase bg-[rgba(100,116,139,0.15)] text-[#94A3B8] border border-[rgba(100,116,139,0.3)] rounded">
                      PROTOTYPE
                    </span>
                  )}
                </div>

                <h2 className="font-['Space_Grotesk'] text-[28px] font-bold text-[#F1F5F9] mb-4">
                  {selectedProject.title}
                </h2>

                <p className="font-['Inter'] text-[15px] text-[#94A3B8] leading-[1.7] mb-6">
                  {selectedProject.description}
                </p>

                {/* Achievements */}
                {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                  <div className="mb-6 flex flex-col gap-2">
                    {selectedProject.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 bg-[rgba(34,211,238,0.05)] border border-[rgba(34,211,238,0.15)] rounded-lg">
                        <Trophy size={16} className="text-[#22D3EE] mt-0.5 shrink-0" />
                        <p className="text-sm text-[#22D3EE] font-mono">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-[11px] font-mono font-bold tracking-wider text-[#475569] mb-3 uppercase">TECH STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono text-[#94A3B8] bg-[#141E2E] border border-[#1E2D42] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team Size */}
                <div className="flex items-center gap-2 mb-8 text-[#94A3B8]">
                  <Users size={16} />
                  <span className="text-sm font-mono">
                    {selectedProject.teamSize} team members
                  </span>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[#1E2D42]">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-mono font-semibold tracking-wider text-[#F1F5F9] bg-[#141E2E] border border-[#1E2D42] rounded hover:border-[rgba(34,211,238,0.4)] hover:text-[#22D3EE] hover:bg-[rgba(34,211,238,0.05)] transition-all"
                    >
                      <FaGithub size={16} />
                      VIEW SOURCE
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-mono font-semibold tracking-wider text-[#060B12] bg-[#22D3EE] border border-transparent rounded hover:bg-[#06B6D4] shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
                    >
                      <ExternalLink size={16} />
                      LIVE DEMO
                    </a>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
