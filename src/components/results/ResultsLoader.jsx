export default function ResultsLoader() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading results">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex min-h-24 items-center gap-4 rounded-lg border border-white/10 bg-black/60 px-4 py-4">
          <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-red-500/20 motion-reduce:animate-none" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-red-500/20 motion-reduce:animate-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
