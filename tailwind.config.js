/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Fivo LLC brand — blue primary, orange accent.
        brand: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#bcd6ff',
          300: '#8ebcff',
          400: '#5996ff',
          500: '#326dff',
          600: '#1b4ef5',
          700: '#163ce1',
          800: '#1832b6',
          900: '#1a318f',
          950: '#141f57',
        },
        accent: {
          50: '#fff6ed',
          100: '#ffe9d4',
          200: '#fecfa8',
          300: '#fdac70',
          400: '#fb7e37',
          500: '#f95d11',
          600: '#ea4407',
          700: '#c23108',
          800: '#9a2810',
          900: '#7c2410',
          950: '#430f06',
        },
        ink: {
          DEFAULT: '#0b1437',
          soft: '#3a4366',
          muted: '#6b7394',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,20,55,0.04), 0 12px 32px -12px rgba(11,20,55,0.18)',
        lift: '0 24px 60px -24px rgba(27,78,245,0.45)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #163ce1 0%, #326dff 45%, #5996ff 100%)',
        'mesh': 'radial-gradient(60% 80% at 15% 10%, rgba(50,109,255,0.18) 0%, rgba(50,109,255,0) 60%), radial-gradient(50% 60% at 95% 0%, rgba(249,93,17,0.14) 0%, rgba(249,93,17,0) 55%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}
