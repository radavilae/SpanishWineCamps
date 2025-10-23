/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        'wine-dark': '#000000',
        'wine-light': '#ffffff',
        'wine-gray': '#cccccc',
        'wine-accent': '#22c55e',
        'wine-error': '#ef4444',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        'screen-80': '80vh',
        'screen-90': '90vh',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
