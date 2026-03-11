import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/animations';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * SectionHeader — Monospace label + large title + subtitle
 * @param {object} props
 * @param {string} props.label - Monospace uppercase label (e.g. "// 01")
 * @param {string} props.title - Main heading text
 * @param {string} [props.subtitle] - Optional subtitle text
 * @param {'left'|'center'} [props.align] - Text alignment
 * @param {string} [props.className] - Additional classes
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const [ref, isInView] = useScrollAnimation();
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={`mb-12 ${alignClass} ${className}`}
    >
      {label && (
        <span className="text-label text-cyan-400 mb-3 block">{label}</span>
      )}
      <h2 className="text-h2 text-text-primary">{title}</h2>
      {subtitle && (
        <p className="text-body text-text-secondary mt-3 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
