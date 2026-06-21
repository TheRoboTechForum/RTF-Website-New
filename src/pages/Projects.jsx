import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Users, Trophy, Search, AlertTriangle, RefreshCw } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { pageTransition, staggerContainer, slideInRight } from '../lib/animations';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';
import { getDetailImage } from '../lib/cloudinary';

export default function Projects() {
  const loading = false;
  const error = null;
  const refetch = () => {};
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  // Derived filter categories from projects
  const uniqueCategories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['ALL', ...Array.from(cats)].filter(c => c !== 'OTHER');
  }, [projects]);

  // Keep ALL first and preserve the preferred order for known categories,
  // while still rendering any additional categories coming from the CMS.
  const preferredCategoryOrder = ['ALL', 'ROBOTICS', 'ELECTRONICS', 'AI/ML', 'AUTOMATION', 'SOFTWARE'];
  const allCategories = useMemo(() => {
    const orderedKnownCategories = preferredCategoryOrder.filter(c => uniqueCategories.includes(c));
    const additionalCategories = uniqueCategories.filter(c => !preferredCategoryOrder.includes(c));
    return [...orderedKnownCategories, ...additionalCategories];
  }, [uniqueCategories]);

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
        title="Projects"
        subtitle="From autonomous rovers to competition-winning robots — explore projects built by RTF engineers."
      />

      {/* Error state with fallback indicator */}
      {error && projects.length > 0 && (
        <div className="max-w-7xl mx-auto mb-6 bg-cyan-900/20 border border-cyan-800/50 rounded p-3 flex justify-center text-xs font-mono text-cyan-300">
          Showing offline fallback data
        </div>
      )}

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">

          {/* Search Bar */}
          <div className="relative w-full max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-white text-black placeholder:text-black font-mono text-[13px] py-[10px] pr-4 pl-10 rounded-md focus:outline-none focus:border-cyan-400 focus:ring-[3px] focus:ring-cyan-400/10 transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {(allCategories.length > 1 ? allCategories : ['ALL']).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-[18px] py-[8px] text-[11px] font-mono font-semibold tracking-[0.1em] rounded-[4px] border transition-all duration-200 ${activeCategory === cat
                  ? 'bg-white text-black border-white shadow-[0_0_16px_rgba(255,255,255,0.16)]'
                  : 'bg-white text-black border-white hover:bg-zinc-100 hover:border-white'
                  }`}
              >
                {cat} ({categoryCounts[cat] || 0})
              </button>
            ))}
          </div>

        </div>

        {/* Results count text */}
        {!loading && projects.length > 0 && (
          <div className="text-[12px] font-mono text-white mb-4">
            Showing {filtered.length} of {projects.length} projects
          </div>
        )}
      </div>

      {loading ? (
        // Loading State: Skeletons
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl border border-border h-[400px] overflow-hidden flex flex-col">
              <div
                className="h-[200px] w-full relative skeleton-shimmer"
              />
              <div className="p-5 flex flex-col flex-1 gap-4">
                <div
                  className="h-[20px] w-[70%] rounded-[4px] skeleton-shimmer"
                />
                <div className="flex flex-col gap-2">
                  <div
                    className="h-[14px] w-[90%] rounded-[2px] skeleton-shimmer"
                  />
                  <div
                    className="h-[14px] w-[60%] rounded-[2px] skeleton-shimmer"
                  />
                </div>
                <div className="flex gap-2 mt-auto">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-[20px] w-[50px] rounded-[3px] skeleton-shimmer"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error && projects.length === 0 ? (
        // Error state (no fallback data)
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-card border border-border max-w-2xl mx-auto">
          <AlertTriangle className="text-amber-400 mb-4" size={40} />
          <h3 className="font-display text-2xl text-text-heading mb-2">Unable to load projects</h3>
          <p className="font-mono text-text-secondary mb-6">Please try again</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-6 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-400 rounded font-mono tracking-wider hover:bg-cyan-500/20"
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
              <p className="text-xl text-text-heading font-display mb-2">
                No projects found for "{searchQuery}"
              </p>
              <p className="text-text-secondary font-body mb-6">
                Try a different search or category
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                }}
                className="px-4 py-2 font-mono text-[13px] bg-transparent text-cyan-400 border border-cyan-400 rounded hover:bg-cyan-500/10 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── Detail Modal (Centered Premium Dialog) ─── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-overlay backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-surface/90 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl shadow-[0_0_50px_rgba(255,32,32,0.15)] overflow-hidden flex flex-col md:flex-row z-10"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md border border-border flex items-center justify-center text-text-secondary hover:text-cyan-400 hover:border-cyan-400/40 transition-all hover:bg-cyan-500/10 group"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Left Column: Image Gallery */}
              <div className="relative w-full md:w-1/2 h-72 md:h-auto min-h-[300px] bg-dark overflow-hidden shrink-0 group">
                <AnimatePresence mode="wait">
                  {selectedProject.images && selectedProject.images.length > 0 ? (
                    <motion.img
                      key={imageIndex}
                      src={getDetailImage(selectedProject.images[imageIndex])}
                      alt={`${selectedProject.title} image ${imageIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-surface to-elevated flex items-center justify-center">
                      <div className="text-cyan-500/20">
                         <Search size={48} />
                      </div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageIndex((i) =>
                          i === 0 ? selectedProject.images.length - 1 : i - 1
                        );
                      }}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageIndex((i) =>
                          i === selectedProject.images.length - 1 ? 0 : i + 1
                        );
                      }}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Dot navigation */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                    {selectedProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageIndex(i);
                        }}
                        aria-label={`Go to image ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${i === imageIndex
                          ? 'bg-cyan-400 w-6 shadow-[0_0_10px_rgba(255,32,32,0.5)]'
                          : 'bg-white/40 w-2 hover:bg-white/70'
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Content */}
              <div className="p-6 sm:p-8 md:p-10 w-full md:w-1/2 flex flex-col overflow-y-auto custom-scrollbar bg-card">
                {/* Category + Year */}
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span className="px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase bg-red-500/10 text-red-300 border border-red-500/30 rounded-md">
                    {selectedProject.category}
                  </span>
                  <span className="text-[11px] font-mono font-semibold tracking-wider text-white px-3 py-1.5 bg-black border border-white/35 rounded-md">
                    {selectedProject.year}
                  </span>
                  {String(selectedProject.status).toUpperCase() === 'ONGOING' && (
                    <span className="px-3 py-1.5 text-[11px] font-mono font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-sm bg-amber-400 animate-pulse" />
                      ONGOING
                    </span>
                  )}
                  {String(selectedProject.status).toUpperCase() === 'PROTOTYPE' && (
                    <span className="px-3 py-1.5 text-[11px] font-mono font-semibold tracking-widest uppercase bg-slate-500/10 text-slate-300 border border-slate-500/30 rounded-md">
                      PROTOTYPE
                    </span>
                  )}
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-5 leading-tight drop-shadow-sm">
                  {selectedProject.title}
                </h2>

                <section className="mb-6 rounded-lg border border-white/35 bg-black p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-red-300 uppercase">
                    <span className="h-2 w-2 rounded-sm bg-red-400" />
                    Overview
                  </h4>
                  <p className="font-body text-base text-white leading-relaxed">
                    {selectedProject.description}
                  </p>
                </section>

                {/* Achievements */}
                {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                  <section className="mb-7 rounded-lg border border-white/35 bg-black p-4">
                    <h4 className="mb-4 flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-red-300 uppercase">
                      <span className="h-2 w-2 rounded-sm bg-red-400" />
                      Highlights
                    </h4>
                    <div className="grid gap-3">
                    {selectedProject.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-md border border-red-500/35 bg-black p-4">
                        <p className="text-sm text-white font-medium leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    ))}
                    </div>
                  </section>
                )}

                {/* Tech Stack */}
                {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                  <section className="mb-7 rounded-lg border border-white/35 bg-black p-4">
                    <h4 className="text-[11px] font-mono font-bold tracking-widest text-red-300 mb-4 uppercase flex items-center gap-2">
                      <span className="h-2 w-2 rounded-sm bg-red-400" />
                      TECH STACK
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-2 text-[12px] font-mono font-semibold text-white bg-black border border-red-500/35 rounded-md hover:border-red-400/70 hover:text-red-100 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                <section className="mt-auto space-y-4 rounded-lg border border-white/35 bg-black p-4">
                  <h4 className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-red-300 uppercase">
                    <span className="h-2 w-2 rounded-sm bg-red-400" />
                    Team & Links
                  </h4>
                  {/* Team Size */}
                  <div className="flex w-fit items-center gap-3 text-white bg-black px-4 py-2.5 rounded-md border border-red-500/35">
                    <Users size={18} className="text-red-300" />
                    <span className="text-sm font-medium text-white">
                      Built by <span className="text-red-300">{selectedProject.teamSize}</span> team members
                    </span>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[150px] flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-[12px] font-mono font-bold tracking-widest text-white bg-red-500/20 border border-red-500/45 rounded-md hover:bg-red-500/30 hover:border-red-400/70 transition-all transform hover:-translate-y-0.5"
                      >
                        <ExternalLink size={18} />
                        LIVE DEMO
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[150px] flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-[12px] font-mono font-bold tracking-widest text-white bg-black border border-red-500/35 rounded-md hover:border-red-400/70 hover:text-red-100 transition-all transform hover:-translate-y-0.5"
                      >
                        <FaGithub size={18} />
                        SOURCE
                      </a>
                    )}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
