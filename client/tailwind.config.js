module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '40px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors:{
        custom_blue:"#1363DF",
        light_dark:"#06283D",
        dark:"#161a1d",
        off_white:"#f7f7f7",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
//#e5e7eb