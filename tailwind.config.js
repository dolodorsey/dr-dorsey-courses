/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}','./components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080604',
        surface: '#0f0d0a',
        surface2: '#151310',
        cream: '#F5F0E8',
        gold: '#D4B87A',
        'gold-dim': 'rgba(212,184,122,0.15)',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      }
    }
  },
  plugins: []
}
