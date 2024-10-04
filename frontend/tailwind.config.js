/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  gridTemplateRows: {
      '[auto,auto,1fr]': 'auto auto 1fr',
    },   colors: {
      primary: '#5B3FD9', // purple-700
      secondary: '#F6EB61', // yellow-500
      accent: '#FFFFFF', // white
    },
    
  },
  },
  plugins: [ require('@tailwindcss/aspect-ratio')],
}

