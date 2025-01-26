/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // Enable print styles
  variants: {
    extend: {
      backgroundColor: ['print'],
      textColor: ['print'],
      borderColor: ['print'],
      borderWidth: ['print'],
      margin: ['print'],
      padding: ['print'],
      display: ['print'],
    },
  },
};