import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './stores/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        ink: 'var(--ink)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        accentSoft: 'var(--accent-soft)',
        warm: 'var(--warm)',
        panel: 'var(--panel)',
        landing: {
          bg: 'var(--landing-bg)',
          accent: 'var(--landing-accent)',
          teal: 'var(--landing-teal)',
          soft: 'var(--landing-soft)',
          text: 'var(--landing-text)',
          muted: 'var(--landing-muted)',
          glass: 'var(--landing-glass)',
        }
      },
      boxShadow: {
        float: '0 18px 48px rgba(12, 16, 27, 0.12)',
        'glow': 'var(--landing-glow)',
        'glow-teal': 'var(--landing-glow-teal)',
        'glow-sm': 'var(--landing-glow-sm)',
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)']
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};

export default config;
