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
        "headline": ["Space Grotesk", "sans-serif"], 
        "body": ["Manrope", "sans-serif"] 
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}