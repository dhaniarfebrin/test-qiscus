/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8F4E1',
        primary: '#543310',
        secondary: '#74512D',
        accent: '#AF8F6F'
      }
    },
    container: {
      center: true
    }
  },
  plugins: []
}
