/**
 * Skeleton Components — Professional, subtle placeholders
 * 
 * Design Principles:
 * - Match exact dimensions of real content
 * - Subtle, understated (no flashy animations)
 * - Minimal gradient pulse (not trendy)
 * - Professional appearance
 */

/**
 * SkeletonText — Placeholder for text content
 */
export function SkeletonText({ width = 'w-full', height = 'h-4', count = 1, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${width} ${height} bg-gray-800/50 rounded animate-pulse`}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonCard — Placeholder for card-based content (projects, team, etc)
 * Matches ProjectCard and TeamCard dimensions
 */
export function SkeletonCard({ hasImage = true }) {
  return (
    <div className="bg-deep/40 border border-cyan-500/10 rounded-lg overflow-hidden">
      {/* Image placeholder */}
      {hasImage && (
        <div className="w-full aspect-video bg-gray-800/50 animate-pulse" />
      )}

      {/* Content placeholder */}
      <div className="p-6 space-y-3">
        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-800/50 rounded animate-pulse" />

        {/* Text lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-800/50 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-800/50 rounded animate-pulse" />
        </div>

        {/* Button/CTA area */}
        <div className="pt-2 h-10 w-2/5 bg-gray-800/50 rounded animate-pulse" />
      </div>
    </div>
  );
}

/**
 * SkeletonHero — Placeholder for hero section
 * Matches HeroSection layout with centered content
 */
export function SkeletonHero() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-deep via-deep to-deep/80 flex flex-col items-center justify-center px-6">
      {/* Logo/Avatar */}
      <div className="w-24 h-24 rounded-full bg-gray-800/50 animate-pulse mb-8" />

      {/* Headline */}
      <div className="space-y-3 text-center max-w-2xl mb-8">
        <div className="h-10 bg-gray-800/50 rounded-lg animate-pulse" />
        <div className="h-10 bg-gray-800/50 rounded-lg animate-pulse w-4/5 mx-auto" />
      </div>

      {/* Subheading */}
      <div className="space-y-2 text-center max-w-xl mb-12">
        <div className="h-5 bg-gray-800/50 rounded animate-pulse" />
        <div className="h-5 bg-gray-800/50 rounded animate-pulse w-5/6 mx-auto" />
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4 justify-center">
        <div className="h-12 w-32 bg-gray-800/50 rounded-lg animate-pulse" />
        <div className="h-12 w-32 bg-gray-800/50 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

/**
 * SkeletonGrid — Generic grid of skeleton cards
 * For projects, team, gallery, etc pages
 */
export function SkeletonGrid({ count = 3, variant = 'card' }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cols = isMobile ? 1 : variant === 'wide' ? 2 : 3;
  const displayCount = isMobile ? Math.min(count, 2) : count;

  return (
    <div
      className="grid gap-6 w-full"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: displayCount }).map((_, i) => (
        <SkeletonCard key={i} hasImage={variant !== 'text'} />
      ))}
    </div>
  );
}

/**
 * SkeletonStats — Placeholder for statistics counters
 * For stats bars and number displays
 */
export function SkeletonStats({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="text-center space-y-3">
          {/* Large number */}
          <div className="h-12 w-24 bg-gray-800/50 rounded animate-pulse mx-auto" />
          {/* Label */}
          <div className="h-4 w-20 bg-gray-800/50 rounded animate-pulse mx-auto" />
        </div>
      ))}
    </div>
  );
}

/**
 * SkeletonSection — Full section placeholder with title and content
 */
export function SkeletonSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <div className="mb-12 space-y-3">
          <div className="h-10 w-64 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-5 w-96 bg-gray-800/50 rounded animate-pulse" />
        </div>

        {/* Content grid */}
        <SkeletonGrid count={6} />
      </div>
    </section>
  );
}
