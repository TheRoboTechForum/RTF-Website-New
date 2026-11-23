export default function StudentCard({ student }) {
  return (
    <article className="flex min-h-24 items-center gap-4 rounded-lg border border-white/10 bg-black/70 px-4 py-4 backdrop-blur-sm transition-all duration-300 hover:border-red-500/50 hover:bg-red-950/10 sm:px-5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-red-500/50 bg-red-500/10 font-mono text-sm font-bold text-red-400">
        {String(student.serialNumber).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <h3 className="break-words text-base font-bold leading-snug text-white sm:text-lg">{student.name}</h3>
        <p className="mt-1 font-mono text-xs tracking-wide text-red-400">{student.branch}</p>
      </div>
    </article>
  );
}
