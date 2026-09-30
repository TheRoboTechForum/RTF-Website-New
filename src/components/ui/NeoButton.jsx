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
    'bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]',
  secondary:
    'bg-transparent text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-400/50',
  danger:
    'relative overflow-hidden bg-[#e50909] text-white border border-[#ff2020] hover:bg-[#e00000] hover:border-[#e00000] active:scale-95 active:brightness-125 before:pointer-events-none before:absolute before:-top-1/2 before:h-[200%] before:-left-1/2 before:w-1/3 before:bg-white/30 before:animate-[neo-button-shine_2.4s_ease-in-out_infinite]',
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
    <span className="relative z-10 inline-flex items-center justify-center gap-2">
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          className="group-hover:translate-x-0.5 transition-transform duration-200"
        />
      )}
    </span>
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
