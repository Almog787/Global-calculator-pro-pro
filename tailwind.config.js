/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: { 
        "primary": "#004ac6" 
      },
      fontFamily: { 
        "headline": ["Chivo", "sans-serif"], 
        "body": ["Public Sans", "sans-serif"] 
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}