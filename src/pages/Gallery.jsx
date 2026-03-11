import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import SectionHeader from '../components/ui/SectionHeader';
import { galleryItems, galleryCategories } from '../data/gallery';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightbox, setLightbox] = useState(null); // index into filtered array

  const filtered =
    activeCategory === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (lightbox !== null && e.key === 'ArrowRight')
        setLightbox((i) => (i + 1) % filtered.length);
      if (lightbox !== null && e.key === 'ArrowLeft')
        setLightbox((i) => (i === 0 ? filtered.length - 1 : i - 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, filtered.length]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

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
        label="// MEMORIES"
        title="Gallery"
        subtitle="Snapshots from competitions, workshops, lab sessions, and team events."
      />

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setLightbox(null); }}
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

      {/* Masonry Grid */}
      <motion.div
        layout
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-card border border-border/30 hover:border-cyan-500/30 hover:shadow-glow-cyan transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="font-display font-semibold text-text-primary text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-text-muted mt-1">{item.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted font-mono mt-12">
          No photos in this category yet.
        </p>
      )}

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-void/95 backdrop-blur-md flex items-center justify-center px-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i === 0 ? filtered.length - 1 : i - 1));
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-elevated/60 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-cyan-400 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i + 1) % filtered.length);
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-elevated/60 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-cyan-400 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].image}
                alt={filtered[lightbox].title}
                className="w-full h-auto max-h-[75vh] object-contain rounded-card"
              />
              <div className="text-center mt-4">
                <h3 className="font-display font-semibold text-text-primary">
                  {filtered[lightbox].title}
                </h3>
                <p className="text-xs font-mono text-text-muted mt-1">
                  {filtered[lightbox].date} • {lightbox + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
