/**
 * HoloCard — Glassmorphism card with optional glow color
 * @param {object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {'cyan'|'amber'|'purple'|'none'} [props.glow] - Glow color on hover
 * @param {string} [props.className] - Additional classes
 * @param {function} [props.onClick] - Click handler
 */

const glowMap = {
  cyan: 'hover:shadow-glow-cyan hover:border-cyan-500/40',
  amber: 'hover:shadow-glow-amber hover:border-amber-500/40',
  purple: 'hover:shadow-glow-purple hover:border-purple-500/40',
  none: '',
};

export default function HoloCard({
  children,
  glow = 'cyan',
  className = '',
  onClick,
  ...rest
}) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-surface/60 backdrop-blur-xl border border-border/50 rounded-card shadow-card transition-all duration-300 ease-smooth ${glowMap[glow]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
