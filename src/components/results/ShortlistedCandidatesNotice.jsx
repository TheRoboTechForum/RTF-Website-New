import { Bot, ClipboardList } from 'lucide-react';

const formUrl = 'https://forms.gle/kBg38CT31u6N7eM69';

export default function ShortlistedCandidatesNotice() {
  return (
    <aside className="mt-8 rounded-xl border border-red-500/40 bg-black/80 p-5 shadow-[0_0_24px_rgba(255,32,32,0.12)] sm:p-7">
      <h2 className="flex items-center gap-3 font-display text-xl font-bold text-white sm:text-2xl">
        <Bot className="h-7 w-7 shrink-0 text-red-400" aria-hidden="true" />
        Congratulations, Selected Candidates!
      </h2>
      <p className="mt-4 leading-relaxed text-text-secondary">
        Candidates shortlisted for THE ROBOTECH FORUM are requested to complete the registration
        form using the link below. Please ensure all required personal and contact details are
        entered correctly.
      </p>
      <p className="mt-3 leading-relaxed text-text-secondary">
        <strong className="text-white">Important:</strong> Being shortlisted does not confirm
        permanent membership. Further tasks and projects may be assigned, and final membership
        will be based on your performance, participation, and evaluation.
      </p>
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-center font-semibold text-black transition-colors hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
      >
        <ClipboardList className="h-5 w-5 shrink-0" aria-hidden="true" />
        Fill Out the Form
      </a>
      <p className="mt-3 text-center text-sm text-text-secondary">
        Only shortlisted candidates are requested to fill out this form.
      </p>
    </aside>
  );
}
