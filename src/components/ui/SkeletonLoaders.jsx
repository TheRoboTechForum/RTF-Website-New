/**
 * Skeleton — Generic skeleton placeholder for loading states
 * Used for all data-driven sections to prevent layout shifts
 */
export function SkeletonBox({ width = 'w-full', height = 'h-4', className = '' }) {
  return (
    <div
      className={`${width} ${height} bg-gradient-to-r from-deep via-deep/50 to-deep rounded-md animate-pulse ${className}`}
    />
  );
}

/**
 * ProjectCardSkeleton — Placeholder for project cards
 */
export function ProjectCardSkeleton() {
  return (
    <div className="border border-cyan-500/10 rounded-lg p-6 bg-deep/30">
      <SkeletonBox height="h-48" className="mb-4" />
      <SkeletonBox height="h-6" width="w-2/3" className="mb-3" />
      <SkeletonBox height="h-4" width="w-full" className="mb-2" />
      <SkeletonBox height="h-4" width="w-5/6" />
    </div>
  );
}

/**
 * StatCounterSkeleton — Placeholder for stat counters
 */
export function StatCounterSkeleton() {
  return (
    <div className="text-center space-y-3">
      <SkeletonBox height="h-12" width="w-24 mx-auto" />
      <SkeletonBox height="h-4" width="w-32 mx-auto" />
    </div>
  );
}

/**
 * TeamCardSkeleton — Placeholder for team member cards
 */
export function TeamCardSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonBox height="h-64" className="rounded-lg" />
      <SkeletonBox height="h-5" width="w-2/3" />
      <SkeletonBox height="h-4" width="w-1/2" />
    </div>
  );
}

/**
 * SectionSkeletonGrid — Reusable grid skeleton loader
 */
export function SectionSkeletonGrid({ count = 3, SkeletonComponent = ProjectCardSkeleton }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonComponent key={idx} />
      ))}
    </div>
  );
}
