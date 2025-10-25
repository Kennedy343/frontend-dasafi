// tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = { // 💡 CAMBIO AQUÍ: Usamos module.exports
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#191A23',
        'dark-card': '#27293d',
        'primary-blue': '#17a2b8',
        'secondary-gray': '#4a4d6b',
      },
      spacing: {
        'sidebar-width': '16rem',
      }
    },
  },
  plugins: [],
}