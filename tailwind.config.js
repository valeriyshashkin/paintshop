module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        full: "100%",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require('@tailwindcss/typography')],
};
