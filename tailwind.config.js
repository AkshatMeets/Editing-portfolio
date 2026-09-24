/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#1C1C1A',
          text: '#F5F1EA',
          card: '#242420',
          surface: '#2A2A26',
          border: 'rgba(184, 174, 160, 0.15)',
          muted: '#8F887E',
          cream: '#EDE7DD',
          accent: '#A58B68',
          light: '#FAF9F6',
        }
      },
    },
  },
  plugins: [],
}
