/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        celure: {
          teal: '#0D9488',
          'teal-light': '#14B8A6',
          'teal-dark': '#115E59',
          sand: '#FAF5EE',
          cream: '#F8F6F0',
          navy: '#0B132B',
          'navy-soft': '#1C2541',
          coral: '#F97316',
          'coral-hover': '#EA580C',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        handwritten: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
