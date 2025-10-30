/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ffcc00'
        }
      }
    },
  },
  plugins: [],
}
