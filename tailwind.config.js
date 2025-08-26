import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        violetTech: "#6A00F4",
        violetTechHover: "#5e00d8ff",
        brand: {
          950: "#070b1fff",
          925: "#0b092dff",
          900: "#1c1c44ff", // Indigo (surfaces)
          700: "#535C91",
          600: "#eeeaffff", 
          400: "#755de3ff",
          300: "#5c14d8ff",
          200: "#5423aaff",
          250: "#613aa5ff",
          100: "#e0c3ff",
          50:  "#F5F6FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
