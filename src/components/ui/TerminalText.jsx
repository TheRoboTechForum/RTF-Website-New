import { useState, useEffect, useRef } from 'react';

/**
 * TerminalText — Typewriter effect with blinking cursor
 * @param {object} props
 * @param {string} props.text - Text to type out
 * @param {number} [props.speed] - Typing speed in ms per character
 * @param {number} [props.delay] - Delay before typing starts in ms
 * @param {boolean} [props.cursor] - Show blinking cursor
 * @param {string} [props.className] - Additional classes
 * @param {function} [props.onComplete] - Callback when typing finishes
 */
export default function TerminalText({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  className = '',
  onComplete,
}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    indexRef.current = 0;
    setDisplayed('');

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className={`font-mono ${className}`}>
      {displayed}
      {cursor && (
        <span className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-0.5 align-middle animate-blink" />
      )}
    </span>
  );
}
