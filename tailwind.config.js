module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        violetTech: '#6A00F4',
        violetTechHover: '#5e00d8ff',
        brand: {
          950: "#070b1fff", // Deep navy (dark bg)
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
    },
  },
  plugins: [],
}
