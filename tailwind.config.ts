import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e14',
        surface: '#11161d',
        elevated: '#1a2028',
        border: '#2a3340',
        cyber: '#00ff9c',
        muted: '#8b949e'
      }
    }
  },
  plugins: []
};

export default config;
