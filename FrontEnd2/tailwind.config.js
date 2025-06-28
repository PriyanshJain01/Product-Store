import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "pastel",
      "retro",
      "coffee",
      "forest",
      "synthwave",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "lofi",
      "luxury",
      "dracula",
      "business",
      "night",
      "corporate",
      "dark",
      "light",
      "cupcake",
      "fantasy",
      "emerald",
      "wireframe",
      "black",
    ],
  },
}

