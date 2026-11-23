import DomainCard from './DomainCard';
import DomainArtwork from './DomainArtwork';

export default function ResultsLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-6">
      <div className="pointer-events-none absolute -right-20 top-24 h-72 w-72 opacity-[0.07] sm:right-[8%] sm:top-32 sm:h-96 sm:w-96" aria-hidden="true">
        <DomainArtwork domain="mechanical" className="h-full w-full" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="text-center">
          <p className="font-mono text-xs tracking-[0.25em] text-red-400">CLUB SELECTIONS</p>
          <h1 className="mt-3 font-display text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            RESULTS <span className="text-red-500">2026–27</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
            Meet the newly selected members of The Robo-Tech Forum, GCOEA.
          </p>
        </header>
        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Results domains">
          <DomainCard domain="mechanical" title="MECHANICAL" />
          <DomainCard domain="electronics" title="ELECTRONICS" />
          <DomainCard domain="programming" title="PROGRAMMING" />
        </section>
      </div>
    </main>
  );
}
