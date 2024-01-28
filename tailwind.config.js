/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
  theme: {
    extend: {
      backgroundColor: {
        'blue': '#1976d2',
        'teal': '#2FB89D',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}

