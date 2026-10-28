import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function SettingsOverlay({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-deep/95 backdrop-blur-xl overflow-y-auto">
      <div className="min-h-screen px-4 sm:px-6 py-24">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-mono text-cyan-400 mb-2">
                RTF / MEMBER
              </p>

              <h1 className="text-3xl sm:text-4xl font-display font-semibold text-text-primary">
                Settings
              </h1>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-cyan-500/30
                         text-text-secondary hover:text-cyan-400
                         hover:border-cyan-400 transition-all"
              aria-label="Close settings"
            >
              <X size={24} />
            </button>
          </div>

          {/* Settings */}
          <div className="glass rounded-card border border-cyan-500/20 p-6">
            <h2 className="text-xl font-display font-semibold text-cyan-400 mb-6">
              Account Settings
            </h2>

            <p className="text-text-secondary text-sm">
              Member account settings will appear here.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}