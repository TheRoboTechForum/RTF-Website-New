import { Link } from 'react-router-dom';
import { ArrowRight, Megaphone } from 'lucide-react';

export default function ResultsAnnouncement() {
  return (
    <Link
      to="/result26"
      className="group relative flex min-h-[76px] w-full items-center justify-between gap-4 overflow-hidden rounded-xl border border-red-500/70 bg-[linear-gradient(105deg,#050505_0%,#180303_54%,#050505_100%)] px-4 py-3 text-left shadow-[0_0_22px_rgba(255,32,32,0.2)] transition-all duration-300 hover:border-red-400 hover:shadow-[0_0_32px_rgba(255,32,32,0.42)] active:scale-[0.99] sm:min-h-[88px] sm:max-w-[580px] sm:px-5"
      aria-label="View selection results for 2026 to 2027"
    >
      <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-red-300 via-red-600 to-red-950" />
      <span className="absolute -right-7 -top-10 h-32 w-32 rounded-full bg-red-600/10 blur-2xl transition-colors group-hover:bg-red-500/20" />
      <span className="relative flex min-w-0 items-center gap-3 sm:gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-500/40 bg-red-950/60 text-red-300 sm:h-14 sm:w-14">
          <Megaphone className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />
        </span>
        <span className="min-w-0 font-mono text-[10px] font-bold leading-relaxed tracking-[0.08em] text-white sm:text-xs">
          <span className="block text-[9px] tracking-[0.2em] text-red-300 sm:text-[10px]">RTF SELECTION UPDATE</span>
          <span className="block">SELECTION RESULTS <span className="text-red-400">2026–27 ARE OUT!</span></span>
        </span>
      </span>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-500/55 bg-red-600 text-white shadow-[0_0_18px_rgba(255,32,32,0.25)] transition-transform group-hover:translate-x-1 sm:h-11 sm:w-11">
        <ArrowRight className="h-5 w-5" />
      </span>
    </Link>
  );
}
