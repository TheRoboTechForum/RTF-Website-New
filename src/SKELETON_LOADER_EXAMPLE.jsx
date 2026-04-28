/**
 * Example: Projects Page with Skeleton Loading
 * 
 * This is an example of how to implement skeleton loaders in a data-driven page
 * 
 * Usage Pattern:
 * 1. Track loading state while fetching data
 * 2. Show skeleton grid while loading
 * 3. Transition to real content when data arrives
 * 4. Prevents layout shift by keeping same height/structure
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionSkeletonGrid, ProjectCardSkeleton } from '../components/ui/SkeletonLoaders';
import ProjectCard from '../components/ui/ProjectCard';
import { useProjects } from '../hooks/useProjects';

export default function ProjectsPageExample() {
  const { projects, loading } = useProjects();
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    if (!loading && projects.length > 0) {
      // Add stagger animation when content loads
      setDisplayProjects(projects);
    }
  }, [loading, projects]);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-text-primary">Our Projects</h2>

        {/* Show skeletons while loading */}
        {loading ? (
          <SectionSkeletonGrid count={6} SkeletonComponent={ProjectCardSkeleton} />
        ) : (
          /* Show actual content when ready */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {displayProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/**
 * Example: Team Page with Multiple Skeleton Sections
 */
export function TeamPageExample() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setTeamMembers([
        { id: 1, name: 'John Doe', role: 'Lead' },
        { id: 2, name: 'Jane Smith', role: 'Designer' },
        { id: 3, name: 'Bob Wilson', role: 'Developer' },
      ]);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 px-6">
      {isLoading ? (
        <SectionSkeletonGrid count={3} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {teamMembers.map((member) => (
            <div key={member.id} className="p-6 bg-deep/50 rounded-lg">
              <h3 className="font-bold">{member.name}</h3>
              <p className="text-text-secondary">{member.role}</p>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
