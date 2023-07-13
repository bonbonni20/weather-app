/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
    borderRadius:{
      '5' : '5px',
      'circle': '130px',
      '86': '86px'
    },  
    boxShadow:{
      'drop' : "0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      'card': '0 0 35px 0 rgba(154, 161, 171, 0.15)',     
    },
    backgroundColor: {
      'input': 'rgba(0, 0, 0, 0.32)',
      'minC': 'rgba(0, 0, 0, 0.2)',
      'drop':  'rgba(0, 0, 0, 0.55)',
    },

    fontFamily:{
      "B": ['Barlow', 'sans-serif'],
      "J": ['Jost', 'sans-serif']
    },
    padding:{
      '8.5': "35px"
    }
  },

  plugins: [],
}
} 