import { motion } from 'framer-motion';

/**
 * LoadingScreen — Minimal loader with message
 * Shows when user clicks skip or during async operations
 */
export default function LoadingScreen({ show = false, message = 'Setting things up for a smooth experience...' }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9998] bg-deep/95 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      {/* Animated loader dots */}
      <div className="flex gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-cyan-400"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Loading message */}
      <p className="text-center text-text-secondary font-mono text-sm tracking-wide">
        {message}
      </p>

      {/* Subtle progress indicator */}
      <div className="mt-8 w-32 h-0.5 bg-deep/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300"
          animate={{ width: ['0%', '100%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
