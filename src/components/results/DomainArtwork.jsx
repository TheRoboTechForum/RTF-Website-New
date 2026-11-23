import { Code2 } from 'lucide-react';

const artworkSources = {
  mechanical: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Robot_arm_icon.svg',
  electronics: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Printed_circuit_board_PCB_icon_2.svg',
};

export default function DomainArtwork({ domain, className = '' }) {
  const source = artworkSources[domain];

  if (domain === 'programming') {
    return (
      <div className={`pointer-events-none select-none text-red-400 ${className}`} aria-hidden="true">
        <Code2 className="h-full w-full stroke-[0.8]" />
      </div>
    );
  }

  if (!source) return null;

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 65, 65, 0.95), rgba(115, 0, 0, 0.72))',
        maskImage: `url("${source}")`,
        WebkitMaskImage: `url("${source}")`,
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
    />
  );
}
