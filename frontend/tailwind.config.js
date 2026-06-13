/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        surface: '#f8fafc',
        surfaceDark: '#111827',
      },
      boxShadow: {
        soft: '0 30px 60px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(59,130,246,0.24), transparent 24%), radial-gradient(circle at bottom right, rgba(139,92,246,0.20), transparent 20%)',
      },
    },
  },
  plugins: [],
}
