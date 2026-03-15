module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF7',
          100: '#FDF8ED',
          200: '#F5EBDA',
          300: '#E8D9C0',
        },
        brown: {
          400: '#A67C52',
          500: '#8B5E3C',
          600: '#6F4E37',
          700: '#5C4033',
          800: '#3E2723',
        },
        forest: {
          400: '#5D8A66',
          500: '#4A7C59',
          600: '#3D6B4A',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      minHeight: {
        touch: '44px',
        'touch-lg': '56px',
      },
      minWidth: {
        touch: '44px',
        'touch-lg': '56px',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        'coffee-sm': '0 1px 2px rgba(62, 39, 35, 0.05)',
        'coffee-md': '0 4px 6px rgba(62, 39, 35, 0.07), 0 2px 4px rgba(62, 39, 35, 0.05)',
        'coffee-lg': '0 10px 15px rgba(62, 39, 35, 0.1), 0 4px 6px rgba(62, 39, 35, 0.05)',
      },
    },
  },
  plugins: [],
};