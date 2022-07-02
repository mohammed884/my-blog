module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        custom_blue:"#1363DF",
        light_dark:"#06283D",
        off_white:"#f4f6f6",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}