module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        violetTech: '#6A00F4',
        violetTechHover: '#5e00d8ff',
        brand: {
          950: "#070F2B", // Deep navy (dark bg)
          900: "#1B1A55", // Indigo (surfaces)
          700: "#535C91", // Steel-blue (text/subtle)
          400: "#9290C3", // Lavender-blue (accent)
          50:  "#F5F6FA", // Light surface (added for light mode)
        },

      },
    },
  },
  plugins: [],
}
