import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // Use the daisyui plugin directly
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Configure themes for daisyUI
  },
}
