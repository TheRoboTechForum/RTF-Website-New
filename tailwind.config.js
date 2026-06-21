/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        void: 'var(--bg-void)',
        deep: 'var(--bg-deep)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        border: 'var(--bg-border)',

        // Primary — Red accent ramp
        cyan: {
          300: '#FF6B6B',
          400: '#FF2020',
          500: '#CC0000',
          600: '#B22222',
          glow: 'rgba(255, 68, 68, 0.40)',
        },

        // Secondary — Warm Gold
        amber: {
          400: '#E6B800',
          500: '#D4A017',
          glow: 'rgba(230, 184, 0, 0.35)',
        },

        // Tertiary — Firebrick / Soft Red
        purple: {
          400: '#FF6B6B',
          500: '#B22222',
          glow: 'rgba(178, 34, 34, 0.3)',
        },

        // Text
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-accent': 'var(--text-accent)',

        // Semantic
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
      },

      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      borderRadius: {
        card: '12px',
        button: '8px',
        badge: '4px',
      },

      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px #333333',
        'glow-cyan': '0 0 30px rgba(255, 68, 68, 0.40)',
        'glow-amber': '0 0 30px rgba(230, 184, 0, 0.35)',
        'glow-purple': '0 0 30px rgba(178, 34, 34, 0.3)',
      },

      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'grid-fade': 'grid-fade 4s ease-in-out infinite',
        'blink': 'blink 1s steps(1) infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        'grid-fade': {
          '0%, 100%': { opacity: 0.03 },
          '50%': { opacity: 0.06 },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
