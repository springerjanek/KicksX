/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "280px",
      },
      colors: {
        "light-blue": "#0328EE",
      },
    },
  },
  plugins: [],
};
