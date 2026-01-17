import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'paper': '#f9f7f0',
        'paper-dark': '#efebe0',
        'ink': '#2b2b2b',
        'ink-light': '#4a4a4a',
        'l5r-red': '#8E1818',
        'l5r-gold': '#C5A059',
        'tech': '#2563eb',
        'success': '#059669',
      },
      fontFamily: {
        'header': ['Cinzel', 'serif'],
        'body': ['Crimson Text', 'serif'],
        'jp': ['Noto Serif JP', 'serif'],
        'code': ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config

