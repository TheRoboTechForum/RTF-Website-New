/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        void: '#020408',
        deep: '#080D14',
        surface: '#0D1520',
        elevated: '#141E2E',
        border: '#1E2D42',

        // Primary — Cyan
        cyan: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          glow: 'rgba(6, 182, 212, 0.35)',
        },

        // Secondary — Amber
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.35)',
        },

        // Tertiary — Purple
        purple: {
          400: '#8B5CF6',
          500: '#7C3AED',
          glow: 'rgba(124, 58, 237, 0.3)',
        },

        // Text
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'text-muted': '#475569',
        'text-accent': '#22D3EE',

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
        card: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px #1E2D42',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.35)',
        'glow-amber': '0 0 30px rgba(245, 158, 11, 0.35)',
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.3)',
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

