/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Copper & Redwood (Overhaul.md)
        'zambia-green': {
          DEFAULT: '#1B5E20',
          light: '#2E7D32',
        },
        golden: '#C8A951',
        'bay-blue': '#3D7B9E',
        fog: '#F0EDE8',
        redwood: '#5D2E0C',
        mist: '#E8E4DD',
        cloud: '#FAFAF7',
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
          DEFAULT: '#B87333',
          light: '#D4956B',
          glow: '#F5E6D3',
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
        heading: ['\"General Sans\"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['\"Satoshi\"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['\"Satoshi\"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};