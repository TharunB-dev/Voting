/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dmk-red': '#FF0000',
        'admk-green': '#00AA55',
        'tvk-purple': '#800080',
        'bjp-orange': '#FF9933',
        'ntk-yellow': '#FFCC00',
        'cong-blue': '#0078D7',
        'tn-primary': '#1A3A6C',
        'tn-accent': '#FF9933',
        'tn-light': '#F8F9FA',
      },
      fontFamily: {
        'tamil': ['Noto Sans Tamil', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'hover': '0 10px 30px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'tn-pattern': "url('/public/images/tn-kolam-pattern.png')",
      },
    },
  },
  plugins: [],
} 