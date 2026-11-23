import { SearchX } from 'lucide-react';

export default function ResultsEmptyState({ searching = false }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-red-500/20 bg-black/60 px-6 text-center">
      <SearchX className="h-10 w-10 text-red-400" />
      <h2 className="mt-4 font-display text-xl font-bold text-white">
        {searching ? 'No matching members found' : 'Selection Results Coming Soon'}
      </h2>
      <p className="mt-2 max-w-md text-sm text-text-secondary">
        {searching
          ? 'Try a different name or branch.'
          : 'The selected members for this domain will appear here as soon as results are published.'}
      </p>
    </div>
  );
}
