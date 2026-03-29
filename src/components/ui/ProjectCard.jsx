import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { fadeUp } from '../../lib/animations';

/**
 * ProjectCard — Full card with image, category badge, tech tags, hover glow
 * @param {object} props
 * @param {object} props.project - Project data object from projects.js
 * @param {string} props.project.title - Project title
 * @param {string} props.project.category - Category badge text
 * @param {string} props.project.description - Short description
 * @param {string[]} props.project.techStack - Array of tech tags
 * @param {number} props.project.teamSize - Number of team members
 * @param {number} props.project.year - Project year
 * @param {string} props.project.status - 'completed' | 'ongoing'
 * @param {string[]} props.project.images - Array of image URLs
 * @param {string|null} props.project.github - GitHub repo URL
 * @param {string|null} props.project.achievements - Achievement text
 * @param {function} [props.onClick] - Click handler for opening detail modal
 */

const categoryColors = {
  ROBOTICS: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  AUTOMATION: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'AI/ML': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  ELECTRONICS: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  SOFTWARE: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
};

export default function ProjectCard({ project, onClick }) {
  const {
    title,
    category,
    description,
    techStack,
    teamSize,
    year,
    status,
    images,
    github,
    achievements,
  } = project;

  const colorClass = categoryColors[category] || categoryColors.ROBOTICS;

  return (
    <motion.article
      variants={fadeUp}
      onClick={onClick}
      className="group relative bg-surface/60 backdrop-blur-xl border border-border/50 rounded-card shadow-card overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-glow-cyan hover:border-cyan-500/30 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-elevated">
        <img
          src={images[0]}
          alt={`${title} project thumbnail`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase border rounded-badge ${colorClass}`}
        >
          {category}
        </span>

        {/* Status badge */}
        {status === 'ongoing' && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-badge">
            ONGOING
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title + Year */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-h3 text-text-primary leading-tight line-clamp-2 text-base">
            {title}
          </h3>
          <span className="text-xs font-mono text-text-muted shrink-0">{year}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono text-text-muted bg-elevated border border-border rounded-badge"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-text-muted bg-elevated border border-border rounded-badge">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        {/* Achievement */}
        {achievements && (
          <p className="text-xs text-cyan-400/80 font-mono mb-3 line-clamp-1">
            ★ {achievements}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-text-muted">
            <Users size={13} />
            <span className="text-xs font-mono">{teamSize} members</span>
          </div>

          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${title} GitHub repository`}
                className="text-text-muted hover:text-cyan-400 transition-colors"
              >
                <FaGithub />
              </a>
            )}
            <ExternalLink
              size={15}
              className="text-text-muted group-hover:text-cyan-400 transition-colors"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
