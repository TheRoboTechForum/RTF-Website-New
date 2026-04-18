import { motion } from 'framer-motion';
import { ExternalLink, Users, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { getCardImage } from '../../lib/cloudinary';

export default function ProjectCard({ project, onOpenDetail, index = 0 }) {
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
    demo,
    achievements,
    featured
  } = project;

  const categoryColors = {
    ROBOTICS:    'bg-[rgba(34,211,238,0.15)] text-[#22D3EE] border-[rgba(34,211,238,0.3)]',
    ELECTRONICS: 'bg-[rgba(139,92,246,0.15)] text-[#8B5CF6] border-[rgba(139,92,246,0.3)]',
    'AI/ML':     'bg-[rgba(251,191,36,0.15)] text-[#FBBF24] border-[rgba(251,191,36,0.3)]',
    AUTOMATION:  'bg-[rgba(34,211,238,0.15)] text-[#06B6D4] border-[rgba(6,182,212,0.3)]',
    SOFTWARE:    'bg-[rgba(139,92,246,0.15)] text-[#A78BFA] border-[rgba(167,139,250,0.3)]',
    DEFAULT:     'bg-[rgba(148,163,184,0.15)] text-[#94A3B8] border-[rgba(148,163,184,0.3)]'
  };

  const statusConfig = {
    COMPLETED: { color: '#22C55E', bgColor: 'bg-green-500' },
    ONGOING:   { color: '#F59E0B', bgColor: 'bg-amber-500', pulse: true },
    PROTOTYPE: { color: '#64748B', bgColor: 'bg-slate-500' }
  };

  const badgeClass = categoryColors[category] || categoryColors.DEFAULT;
  const statusDisplay = statusConfig[status] || statusConfig.COMPLETED;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06
      }}
      onClick={() => onOpenDetail(project)}
      className="group relative bg-[#0D1520] border border-[#1E2D42] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[rgba(34,211,238,0.4)] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_20px_40px_rgba(0,0,0,0.4),0_0_60px_rgba(34,211,238,0.05)] flex flex-col h-full"
    >
      {/* IMAGE SECTION */}
      <div className="relative overflow-hidden h-[200px] shrink-0">
        {images && images.length > 0 ? (
          <img
            src={getCardImage(images[0])}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0D1520] to-[#141E2E] flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-[#1E2D42]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#0D1520] to-transparent pointer-events-none" />
        
        {/* Top-Left Category Badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase font-mono font-semibold tracking-[0.1em] rounded border ${badgeClass}`}>
          {category}
        </span>

        {/* Top-Right Status Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded bg-[rgba(15,23,42,0.6)] backdrop-blur-[2px] border border-[rgba(30,41,59,0.8)]">
          <span 
            className={`w-[6px] h-[6px] rounded-full ${statusDisplay.bgColor} ${statusDisplay.pulse ? 'animate-pulse' : ''}`}
            style={{ opacity: statusDisplay.pulse ? undefined : 0.8 }}
          />
          <span className="text-[9px] uppercase font-mono tracking-[0.08em] text-[#E2E8F0]">
            {status}
          </span>
        </div>

        {/* Top-Center Featured Badge */}
        {featured && (
          <span className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-[rgba(251,191,36,0.2)] text-[#FBBF24] border border-[rgba(251,191,36,0.4)] text-[9px] uppercase font-mono rounded whitespace-nowrap">
            ★ FEATURED
          </span>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#F1F5F9] mb-2 group-hover:text-[#22D3EE] transition-colors duration-200">
          {title}
        </h3>
        
        <p className="font-['Inter'] text-[14px] text-[#94A3B8] leading-[1.6] mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {description}
        </p>

        {/* Tech Stack tags */}
        <div className="flex flex-wrap gap-[6px] mb-4">
          {techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] text-[#475569] bg-[rgba(30,45,66,0.6)] border border-[#1E2D42] px-2 py-[3px] rounded-[3px]"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="font-mono text-[11px] text-[#22D3EE] bg-[rgba(30,45,66,0.6)] border border-[rgba(34,211,238,0.2)] px-2 py-[3px] rounded-[3px]">
              +{techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="flex-1"></div>

        {/* FOOTER ROW */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1E2D42]/50">
          <div className="flex items-center gap-[6px] text-[11px] font-mono text-[#475569]">
            <Users size={12} className="shrink-0" />
            <span>{teamSize} members</span>
            <span className="mx-0.5">·</span>
            <span>{year}</span>
          </div>

          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="GitHub Repo"
                className="text-[#475569] hover:text-[#22D3EE] transition-colors"
              >
                <FaGithub size={16} />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Live Demo"
                className="text-[#475569] hover:text-[#22D3EE] transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
            <div 
              title="View Details"
              className="text-[#475569] group-hover:text-[#22D3EE] transition-colors"
            >
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
