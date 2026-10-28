import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function MemberProfileOverlay({ onClose }) {
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
                Member Profile
              </h1>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-cyan-500/30
                         text-text-secondary hover:text-cyan-400
                         hover:border-cyan-400 transition-all"
              aria-label="Close profile"
            >
              <X size={24} />
            </button>
          </div>

          {/* Profile Summary */}
          <div className="glass rounded-card border border-cyan-500/20 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full border-2 border-cyan-400
                              flex items-center justify-center
                              bg-cyan-500/10">
                <span className="text-2xl font-display text-cyan-400">
                  GG
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-display font-semibold text-text-primary">
                  Gayatri Giri
                </h2>

                <p className="text-sm font-mono text-text-secondary mt-1">
                  SD2765@RTF
                </p>

                <span className="inline-block mt-3 px-3 py-1 text-xs
                                 font-mono text-cyan-400
                                 border border-cyan-500/30
                                 rounded-full">
                  ACTIVE
                </span>
              </div>

            </div>
          </div>

          {/* Member Information */}
          <div className="glass rounded-card border border-cyan-500/20 p-6 mb-6">

            <h2 className="text-xl font-display font-semibold text-cyan-400 mb-6">
              Member Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <InfoItem
                label="Enrollment No."
                value="EN2027045"
              />

              <InfoItem
                label="Branch"
                value="Computer Science"
              />

              <InfoItem
                label="Year of Passing"
                value="2027"
              />

              <InfoItem
                label="Domain"
                value="Software"
              />

              <InfoItem
                label="College Email"
                value="girigayatri4522@gcoea.ac.in"
              />

            </div>
          </div>

          {/* Personal Information */}
          <div className="glass rounded-card border border-cyan-500/20 p-6">

            <h2 className="text-xl font-display font-semibold text-cyan-400 mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <InfoItem
                label="Personal Email"
                value="girigayatri4522@gmail.com"
              />

              <InfoItem
                label="Phone"
                value="+91 98765 43210"
              />

              <div className="sm:col-span-2">
                <InfoItem
                  label="Interests"
                  value="Web Development, Robotics, AI"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


/* Reusable information field */
function InfoItem({ label, value }) {
  return (
    <div className="p-4 rounded-lg border border-white/10 bg-white/5">
      <p className="text-xs font-mono text-text-secondary mb-2">
        {label}
      </p>

      <p className="text-sm sm:text-base text-text-primary break-words">
        {value}
      </p>
    </div>
  );
}