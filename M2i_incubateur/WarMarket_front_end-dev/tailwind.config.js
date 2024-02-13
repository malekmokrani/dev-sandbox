module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './node_modules/tw-elements/dist/js/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {   screens: {
    'mobile': '200px',


    'sm': '640px',
    // => @media (min-width: 640px) { ... }

    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  }
,
    extend: {  keyframes: {
      wiggle: {
          '0%, 100%': {
              transform: 'rotate(-3deg)'
          },
          '50%': {
              transform: 'rotate(3deg)'
          },
      }
  },
  animation: {
      wiggle: 'wiggle 0.4s ease-in-out infinite',
  
},
      colors:{
        primary:{
          '100': '#b3d9ff',
          '200': '#80bfff',
          '300': '#4da6ff',
          '400': '#1a8cff',
          '500': "#0B84FF",
          '600': '#0073e6',
          '700': '#0066cc',
          '800': '#004d99',
          '900': '#004080',
        },
        secondary:{
          '100': '#fad5b7',
          '200': '#f7ba88',
          '300': '#f39e58',
          '400': '#f08228',
          '500': "#ed7410",
          '600': '#d7690f',
          '700': '#bf5d0d',
          '800': '#a7510c',
          '900': '#8f460a',
        },
        custom:{
          'lightbrown': '#C3A758',
          'orange': '#C28F2C',
          'green': '#AEA70A',
        },
      },
    }
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled"
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin'),
  ],
}
