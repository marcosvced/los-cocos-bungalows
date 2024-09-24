module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'black': '#000000',
      'primary': '#0162B3',
      'gray': {
        DEFAULT: '#4A4A4A',
        light: '#D5D5D5',
      },
    },
    fontFamily: {
      display: ['Roboto Slab', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
