import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Search } from 'lucide-react';
import { getDomainRecords } from '../../services/results';
import StudentCard from './StudentCard';
import ResultsLoader from './ResultsLoader';
import ResultsEmptyState from './ResultsEmptyState';
import DomainArtwork from './DomainArtwork';

const domainLabels = {
  mechanical: 'MECHANICAL',
  electronics: 'ELECTRONICS',
  programming: 'PROGRAMMING',
};

export default function DomainResults() {
  const { domain } = useParams();
  const normalizedDomain = String(domain || '').toLowerCase();
  const label = domainLabels[normalizedDomain];
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!label) {
      return;
    }
    let active = true;

    getDomainRecords(normalizedDomain)
      .then((records) => {
        if (!active) return;
        setStudents(records);
        setStatus('success');
      })
      .catch((fetchError) => {
        if (!active) return;
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load results.');
        setStatus('error');
      });

    return () => { active = false; };
  }, [normalizedDomain, label]);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) =>
      student.name.toLowerCase().includes(query) ||
      student.branch.toLowerCase().includes(query)
    );
  }, [search, students]);

  const reload = () => {
    setStatus('loading');
    setError('');
    getDomainRecords(normalizedDomain)
      .then((records) => {
        setStudents(records);
        setStatus('success');
      })
      .catch((fetchError) => {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load results.');
        setStatus('error');
      });
  };

  if (!label) {
    return (
      <main className="min-h-screen px-4 pb-16 pt-28 text-center">
        <h1 className="text-3xl font-bold text-white">Unknown results domain</h1>
        <Link to="/result26" className="mt-6 inline-flex text-red-400">Back to results</Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-6">
      <div className="pointer-events-none absolute -right-16 top-32 h-72 w-72 opacity-[0.08] sm:right-[8%] sm:top-40 sm:h-[26rem] sm:w-[26rem]" aria-hidden="true">
        <DomainArtwork domain={normalizedDomain} className="h-full w-full" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <Link to="/result26" className="inline-flex min-h-11 items-center gap-2 font-mono text-xs text-text-secondary transition-colors hover:text-red-400">
          <ArrowLeft className="h-4 w-4" /> ALL DOMAINS
        </Link>

        <header className="mt-5">
          <p className="font-mono text-xs tracking-[0.22em] text-red-400">{label} DOMAIN</p>
          <h1 className="mt-2 font-display text-3xl font-black text-white sm:text-5xl">
            Selected Members <span className="text-red-500">2026–27</span>
          </h1>
        </header>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-sm text-text-secondary">
            <span className="text-2xl font-bold text-white">{students.length}</span>{' '}
            selected students
            {search.trim() && status === 'success' && (
              <span className="ml-2 text-red-400">· {filteredStudents.length} shown</span>
            )}
          </p>
          <button
            type="button"
            onClick={reload}
            disabled={status === 'loading'}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-500/40 px-4 font-mono text-xs text-white transition-colors hover:border-red-400 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
            REFRESH
          </button>
        </div>

        {status === 'success' && students.length > 0 && (
          <label className="mt-5 flex min-h-12 items-center gap-3 rounded-lg border border-white/10 bg-black/70 px-4 focus-within:border-red-500/60">
            <Search className="h-5 w-5 shrink-0 text-red-400" />
            <span className="sr-only">Search by name or branch</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name or branch..."
              className="h-11 min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-text-muted"
            />
          </label>
        )}

        <section className="mt-5" aria-live="polite">
          {status === 'loading' && <ResultsLoader />}
          {status === 'error' && (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-red-500/30 bg-black/70 px-6 text-center">
              <h2 className="font-display text-xl font-bold text-white">Unable to reach results</h2>
              <p className="mt-2 max-w-lg break-words text-sm text-text-secondary">{error}</p>
              <button type="button" onClick={reload} className="mt-5 min-h-11 rounded-lg bg-red-600 px-5 font-mono text-xs font-bold text-white hover:bg-red-500">
                RETRY
              </button>
            </div>
          )}
          {status === 'success' && filteredStudents.length === 0 && (
            <ResultsEmptyState searching={search.trim().length > 0} />
          )}
          {status === 'success' && filteredStudents.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student) => (
                <StudentCard key={`${student.serialNumber}-${student.name}`} student={student} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
