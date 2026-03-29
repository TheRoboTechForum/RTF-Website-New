import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Users, Trophy } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { pageTransition, fadeUp, staggerContainer, slideInRight } from '../lib/animations';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ui/ProjectCard';
import { projects, categories } from '../data/projects';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const filtered =
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
      className="pt-28 pb-24 px-6"
    >
      <SectionHeader
        label="// OUR PORTFOLIO"
        title="Projects"
        subtitle="From autonomous rovers to competition-winning robots — explore 50+ projects built by RTF engineers."
      />

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-mono font-semibold tracking-wider rounded-button border transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40'
                : 'bg-transparent text-text-muted border-border/50 hover:text-text-secondary hover:border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div
        layout
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                onClick={() => openProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted font-mono mt-12">
          No projects found in this category yet.
        </p>
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
              className="fixed inset-0 z-50 bg-void/80 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.aside
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 z-50 h-full w-full max-w-xl bg-surface border-l border-border overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                <X size={18} />
              </button>

              {/* Image Gallery */}
              <div className="relative h-64 sm:h-80 bg-elevated overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imageIndex}
                    src={selectedProject.images[imageIndex]}
                    alt={`${selectedProject.title} image ${imageIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setImageIndex((i) =>
                          i === 0 ? selectedProject.images.length - 1 : i - 1
                        )
                      }
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-void/60 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-cyan-400 transition-colors"
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-void/60 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-cyan-400 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Dot navigation */}
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {selectedProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImageIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === imageIndex
                            ? 'bg-cyan-400 w-5'
                            : 'bg-text-muted/40 hover:bg-text-muted'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Category + Year */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded-badge">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {selectedProject.year}
                  </span>
                  {selectedProject.status === 'ongoing' && (
                    <span className="px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-badge">
                      ONGOING
                    </span>
                  )}
                </div>

                <h2 className="text-h2 text-text-primary mb-4">
                  {selectedProject.title}
                </h2>

                <p className="text-body text-text-secondary leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Achievements */}
                {selectedProject.achievements && (
                  <div className="flex items-start gap-2 mb-6 p-3 bg-cyan-500/5 border border-cyan-500/15 rounded-button">
                    <Trophy size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-cyan-300 font-mono">
                      {selectedProject.achievements}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="text-label text-text-muted mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono text-text-secondary bg-elevated border border-border rounded-badge"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team Size */}
                <div className="flex items-center gap-2 mb-6 text-text-secondary">
                  <Users size={16} />
                  <span className="text-sm font-mono">
                    {selectedProject.teamSize} team members
                  </span>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold text-text-primary bg-elevated border border-border rounded-button hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
                    >
                      <FaGithub />
                      VIEW SOURCE
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold text-deep bg-cyan-500 rounded-button hover:bg-cyan-400 transition-all"
                    >
                      <ExternalLink size={14} />
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
