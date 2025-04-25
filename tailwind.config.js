/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        gold: '#D4AF37',
        mystical: {
          50: '#F3F1FB',
          100: '#E7E2F7',
          200: '#D0C5EF',
          300: '#B9A8E6',
          400: '#A28BDE',
          500: '#8B6ED6',
          600: '#7353CC',
          700: '#5C3DB3',
          800: '#4A3B7A',
          900: '#1A1F4A',
        },
      },
      boxShadow: {
        card: '0 10px 25px -5px rgba(74, 59, 122, 0.5)',
        glow: '0 0 15px 5px rgba(139, 92, 246, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px 0px rgba(139, 92, 246, 0.2)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(139, 92, 246, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};