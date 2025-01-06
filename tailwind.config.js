/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
    
      colors:{
        "text":"#494949",
        "button-color":"#D9D9D9",
        "primary":"#167F71",
        "forgrount":"#ffff",
        "bannercolor":"#E6F8DE",
        "red":"#EE4B2B",
        "orange":"#F48C06",
        "overlay":"#D9D9D9",
        "step":"#49494999"
        
      },
      container:{
        center:true,
        padding:{
          default:'1rem',
          sm:'2rem',
          lg:'4rem',
          xl:'5rem'
        }
      }

    },
  },
  plugins: [],
}
