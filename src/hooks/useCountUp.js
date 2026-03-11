import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for animated number counting.
 * Counts from 0 to target value when triggered.
 * @param {number} end - Target number to count to
 * @param {number} duration - Animation duration in ms (default: 2000)
 * @param {boolean} shouldStart - Whether to start counting
 * @returns {number} Current count value
 */
export function useCountUp(end, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = useCallback(
    (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    },
    [end, duration]
  );

  useEffect(() => {
    if (shouldStart) {
      startTimeRef.current = null;
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [shouldStart, animate]);

  return count;
}
