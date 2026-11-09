/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#111C33',
        ink: '#4A5670',          // secondary text, 7:1 on white
        line: '#E3E8F0',
        mist: '#F5F8FB',
        green: { DEFAULT: '#16A56A', deep: '#0B7F4F' }, // deep = text-safe on white
        teal: { DEFAULT: '#0E8F8C', deep: '#0B6F6D' },
        blue: { DEFAULT: '#2D6BE4', deep: '#1F55C2' },
        purple: { DEFAULT: '#6A4DE0', deep: '#5237C4' },
      },
      fontFamily: {
        display: ['"Schibsted Grotesk Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Figtree Variable"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        desk: '0 1px 2px rgba(17,28,51,.06), 0 24px 48px -24px rgba(17,28,51,.22)',
      },
    },
  },
  plugins: [],
}
