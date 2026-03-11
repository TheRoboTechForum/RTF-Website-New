import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer.
 * @param {number} threshold - Amount of element visible before triggering (0-1)
 * @returns {[React.RefObject, boolean]} - Ref to attach to element, and visibility state
 */
export function useScrollAnimation(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px', amount: threshold });
  return [ref, isInView];
}
