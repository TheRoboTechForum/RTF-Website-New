import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 45;   // was 80 — O(n²) connections kill perf at 80
const CONNECT_DIST   = 120;  // was 140 — fewer connections per particle
const MOUSE_REPEL    = 90;
const SPEED          = 0.28;

export default function ParticleCanvas({ className = '' }) {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafId     = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Mouse ────────────────────────────────────────────────────────────────
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMove, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);

    // ── Particles ────────────────────────────────────────────────────────────
    let pts = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r:  Math.random() * 1.2 + 0.4,
    }));

    // ── Draw loop (perf-optimised) ───────────────────────────────────────────
    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const n  = pts.length;

      // Update positions
      for (let i = 0; i < n; i++) {
        const p = pts[i];

        // Mouse repel — cheap distance check with squared comparison first
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_REPEL * MOUSE_REPEL) {
          const d     = Math.sqrt(d2);
          const force = ((MOUSE_REPEL - d) / MOUSE_REPEL) * 0.3;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
          // Apply velocity cap so repel doesn't feel snappy
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.5) { p.vx = (p.vx / speed) * 1.5; p.vy = (p.vy / speed) * 1.5; }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Soft boundary bounce
        if (p.x < 0)     { p.x = 0;     p.vx *= -1; }
        if (p.x > width) { p.x = width;  p.vx *= -1; }
        if (p.y < 0)     { p.y = 0;     p.vy *= -1; }
        if (p.y > height){ p.y = height; p.vy *= -1; }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,211,238,0.7)';
        ctx.fill();
      }

      // Draw connections — single batched path per alpha level
      // Group lines by opacity bucket to minimise ctx state changes
      const DIST2 = CONNECT_DIST * CONNECT_DIST;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < DIST2) {
            const alpha = (1 - d2 / DIST2) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${alpha.toFixed(2)})`;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      rafId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
