/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f4ea', // light green
          100: '#b7e0c3',
          200: '#7fcf97',
          300: '#4ebd6b', // Zambian flag green
          400: '#2e9947',
          500: '#217a36',
          600: '#17602a',
          700: '#0e471e',
          800: '#073013',
          900: '#021a08',
        },
        copper: {
          50: '#fff6ed',
          100: '#ffe1c3',
          200: '#ffc285',
          300: '#ff9d3b', // copper
          400: '#e67c1e',
          500: '#b85f16',
          600: '#8a440f',
          700: '#5c2a08',
          800: '#2e1403',
          900: '#160a01',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};