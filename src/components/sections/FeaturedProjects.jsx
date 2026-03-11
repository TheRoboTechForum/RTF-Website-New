import { motion } from 'framer-motion';
import { staggerContainer } from '../../lib/animations';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import NeoButton from '../ui/NeoButton';
import { getFeaturedProjects } from '../../data/projects';

/**
 * FeaturedProjects — 3 featured ProjectCards from projects.js
 */
export default function FeaturedProjects() {
  const [ref, isInView] = useScrollAnimation();
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <section className="py-24 px-6">
      <SectionHeader
        label="// 01 — PROJECTS"
        title="What We Build"
        subtitle="From ISRO rover challenges to Robocon competition bots — our projects push the boundaries of student engineering."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <NeoButton to="/projects" variant="secondary" arrow>
          VIEW ALL PROJECTS
        </NeoButton>
      </div>
    </section>
  );
}
