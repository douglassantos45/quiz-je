/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      desktop: '1292px',
      xl: '1380px',
      '2xl': '1600px',
    },
    extend: {
      backgroundImage: {
        'linear-bg':
          'linear-gradient(180deg, rgba(243, 244, 246, 0) 0.33%, #F3F4F6 99.81%, rgba(243, 244, 246, 0.863158) 100%);',
      },
    },
  },
  plugins: [],
};
