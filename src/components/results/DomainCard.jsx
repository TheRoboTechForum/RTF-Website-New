import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cog, Cpu } from 'lucide-react';
import DomainArtwork from './DomainArtwork';

const icons = {
  mechanical: Cog,
  electronics: Cpu,
  programming: Code2,
};

export default function DomainCard({ domain, title }) {
  const Icon = icons[domain];
  return (
    <Link
      to={`/result26/${domain}`}
      className="group relative flex min-h-64 flex-col overflow-hidden rounded-xl border border-red-500/40 bg-[#080808]/90 p-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-[0_0_34px_rgba(255,32,32,0.2)] active:scale-[0.98] sm:min-h-72 sm:p-7"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,32,32,0.14),transparent_48%)]" />
      <DomainArtwork
        domain={domain}
        className="absolute -bottom-8 -right-8 z-0 h-56 w-56 opacity-[0.16] transition-all duration-500 group-hover:scale-110 group-hover:opacity-25 sm:h-64 sm:w-64"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-500/45 bg-red-950/40 text-red-300 shadow-[0_0_24px_rgba(255,32,32,0.12)] transition-colors group-hover:bg-red-900/50">
          <Icon className="h-8 w-8" strokeWidth={1.5} />
        </div>
        <div className="mt-auto pt-12">
          <h2 className="font-display text-xl font-black tracking-[0.12em] text-white sm:text-2xl">{title}</h2>
          <span className="mt-4 inline-flex min-h-11 items-center gap-3 rounded-md border border-red-500/60 bg-red-600 px-4 font-mono text-[11px] font-bold tracking-[0.12em] text-white shadow-[0_0_18px_rgba(255,32,32,0.22)] transition-all group-hover:bg-red-500 group-hover:shadow-[0_0_24px_rgba(255,32,32,0.38)]">
            VIEW RESULTS <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
