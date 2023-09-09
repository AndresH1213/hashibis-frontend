/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    extend: {
      colors: {
        'nav-border': '#EBEAEA',
        'light-white': '#FAFAFB',
        'light-white-100': '#f9f7f3',
        'light-white-200': '#e0dedb',
        'light-white-300': '#c7c6c2',
        'light-white-400': '#aeadaa',
        'light-white-500': '#959492',
        gray: '#5e6162',
        'gray-100': '#C6C7C7',
        'gray-200': '#999B9A',
        'gray-300': '#C6C7C7',
        'gray-400': '#6D7070',
        'gray-800': '#6D7272',
        'black-100': '#252525',
        'black-light': '#5E6162',
        'primary-cognac': '#94756f',
        'secondary-cognac': '#A08181',
        'third-cognac': '#D8AEAE',
        'gray-50': '#cfd0d0',
        'green-50': '#BDF0D6',
        'green-100': '#A5D3C5',
        'green-200': '#8CB5B2',
        'green-300': '#759398',
        'green-500': '#5D707A',
        primary: {
          600: '#5E6162',
        },
      },
      boxShadow: {
        menu: '0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)',
      },
      screens: {
        xs: '400px',
      },
      maxWidth: {
        '10xl': '1680px',
      },
    },
  },
  plugins: [],
};
