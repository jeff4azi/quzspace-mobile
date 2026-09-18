/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: "#242021",
        light: "#f1f1f1",
        muted: "#aeabac",
        gray: "#5d5a5b",
        darker: "#161314",
      },
    },
  },
  plugins: [],
};
