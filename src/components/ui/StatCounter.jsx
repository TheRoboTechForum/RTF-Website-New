import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCountUp } from '../../hooks/useCountUp';

/**
 * StatCounter — Animated count-up number triggered by Intersection Observer
 * @param {object} props
 * @param {number} props.end - Target number to count to
 * @param {string} props.label - Metric label (e.g. "Members")
 * @param {string} [props.suffix] - Suffix after number (e.g. "+")
 * @param {string} [props.prefix] - Prefix before number (e.g. "₹")
 * @param {number} [props.duration] - Count animation duration in ms
 */
export default function StatCounter({
  end,
  label,
  suffix = '',
  prefix = '',
  duration = 2000,
}) {
  const [ref, isInView] = useScrollAnimation(0.3);
  const count = useCountUp(end, duration, isInView);

  return (
    <div ref={ref} className="text-center">
      <span className="block font-display font-bold text-cyan-400 text-4xl md:text-5xl tabular-nums">
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="block text-label text-text-muted mt-2">{label}</span>
    </div>
  );
}
