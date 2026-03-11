import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * NeoButton — Futuristic button with glow effects
 * @param {object} props
 * @param {'primary'|'secondary'|'danger'} props.variant - Button style variant
 * @param {string} props.children - Button label
 * @param {string} [props.to] - React Router link target (renders as Link)
 * @param {string} [props.href] - External link target (renders as <a>)
 * @param {boolean} [props.arrow] - Show arrow icon
 * @param {string} [props.className] - Additional classes
 * @param {function} [props.onClick] - Click handler
 */
const variants = {
  primary:
    'bg-cyan-500 text-deep hover:bg-cyan-400 shadow-glow-cyan hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]',
  secondary:
    'bg-transparent text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-400/50',
  danger:
    'bg-error/10 text-error border border-error/30 hover:bg-error/20 hover:border-error/50',
};

export default function NeoButton({
  variant = 'primary',
  children,
  to,
  href,
  arrow = false,
  className = '',
  onClick,
  ...rest
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-mono font-semibold tracking-wider rounded-button transition-all duration-250 ease-smooth group ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          className="group-hover:translate-x-0.5 transition-transform duration-200"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses} {...rest}>
      {content}
    </button>
  );
}
