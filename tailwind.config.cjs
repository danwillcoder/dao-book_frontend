/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        italiana: 'italiana, serif',
        sans: ['libre-franklin', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
